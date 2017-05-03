import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Transfer } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import * as _ from 'lodash';
import { ConfigProvider } from '../../config/config';
import { StringUtils } from '../../utils/string';
var ImageLoaderController = (function () {
    function ImageLoaderController(platform, transfer, file, config) {
        var _this = this;
        this.platform = platform;
        this.transfer = transfer;
        this.file = file;
        this.config = config;
        this.isCacheReady = false;
        this.isInit = false;
        this.processing = 0;
        this.indexed = false;
        this.currentCacheSize = 0;
        this.queue = [];
        this.cacheIndex = [];
        platform.ready().then(function () {
            if (File.installed()) {
                _this.initCache();
            }
            else {
                _this.isInit = true;
                _this.throwWarning('You are running on a browser or using livereload, IonicImageLoader will not function, falling back to browser loading.');
            }
        });
    }
    ImageLoaderController.prototype.preload = function (imageUrl) {
        return this.getImagePath(imageUrl);
    };
    ImageLoaderController.prototype.clearCache = function () {
        var _this = this;
        if (!this.platform.is('cordova')) {
            return;
        }
        var clear = function () {
            if (!_this.isInit) {
                setTimeout(clear.bind(_this), 500);
                return;
            }
            _this.isInit = false;
            _this.file.removeRecursively(_this.cacheRootDirectory, _this.cacheDirectoryName).then(function () {
                if (_this.isWKWebView) {
                    _this.file.removeRecursively(_this.cacheTempRootDirectory, _this.cacheDirectoryName).catch(function (error) {
                        // Noop catch. Removing the tempDirectory might fail,
                        // as it is not persistent.
                    }).then(function () {
                        _this.initCache(true);
                    });
                    return;
                }
                _this.initCache(true);
            }).catch(_this.throwError.bind(_this));
        };
        clear();
    };
    ImageLoaderController.prototype.getImagePath = function (imageUrl) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.needDownload(imageUrl)) {
                resolve(imageUrl);
                return;
            }
            var getImage = function () {
                _this.getCachedImagePath(imageUrl).then(resolve).catch(function () {
                    _this.addItemToQueue(imageUrl, resolve, reject);
                });
            };
            var check = function () {
                if (_this.isInit) {
                    if (_this.isCacheReady) {
                        getImage();
                        return;
                    }
                    _this.throwWarning('The cache system is not running. Images will be loaded by your browser instead.');
                    resolve(imageUrl);
                    return;
                }
                setTimeout(function () { return check(); }, 250);
            };
            check();
        });
    };
    ImageLoaderController.prototype.removeCacheFile = function (localPath) {
        if (!this.platform.is('cordova')) {
            return;
        }
        if (!this.isCacheReady) {
            return;
        }
        if (!localPath) {
            return;
        }
        this.removeFile(localPath.substr(localPath.lastIndexOf('/') + 1));
    };
    ImageLoaderController.prototype.removeFile = function (file) {
        var _this = this;
        return this.file.removeFile(this.cacheDirectory, file).then(function () {
            if (_this.isWKWebView) {
                return _this.file.removeFile(_this.cacheTempDirectory, file).catch(function () {
                    // Noop catch. Removing the files from tempDirectory might fail, as it is not persistent.
                });
            }
        });
    };
    ImageLoaderController.prototype.downloadImage = function (imageUrl, localPath) {
        var transfer = this.transfer.create();
        return transfer.download(imageUrl, localPath, true);
    };
    ImageLoaderController.prototype.needDownload = function (imageUrl) {
        return StringUtils.startsWith(imageUrl, [
            'http://',
            'https://',
            'ftp://'
        ]);
    };
    ImageLoaderController.prototype.initCache = function (replace) {
        var _this = this;
        this.createCacheDirectory(replace).catch(function (e) {
            _this.throwError(e);
            _this.isInit = true;
        }).then(function () { return _this.indexCache(); }).then(function () {
            _this.isCacheReady = true;
            _this.isInit = true;
        });
    };
    ImageLoaderController.prototype.addFileToIndex = function (file) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            file.getMetadata(function (metadata) {
                if (_this.config.get().imageLoader.maxCacheAge > -1
                    && (Date.now() - metadata.modificationTime.getTime()) > _this.config.get().imageLoader.maxCacheAge) {
                    return _this.removeFile(file.name);
                }
                _this.currentCacheSize += metadata.size;
                _this.cacheIndex.push({
                    name: file.name,
                    modificationTime: metadata.modificationTime,
                    size: metadata.size
                });
                resolve();
            }, function (error) { return reject(error); });
        });
    };
    ImageLoaderController.prototype.indexCache = function () {
        var _this = this;
        if (!this.shouldIndex)
            return Promise.resolve();
        this.cacheIndex = [];
        return this.file.listDir(this.cacheRootDirectory, this.cacheDirectoryName).then(function (files) { return Promise.all(files.map(_this.addFileToIndex.bind(_this))); }).then(function () {
            _this.cacheIndex = _.sortBy(_this.cacheIndex, 'modificationTime');
            _this.indexed = true;
            return Promise.resolve();
        }).catch(function (e) {
            _this.throwError(e);
            return Promise.resolve();
        });
    };
    ImageLoaderController.prototype.maintainCacheSize = function () {
        var _this = this;
        if (this.config.get().imageLoader.maxCacheSize > -1 && this.indexed) {
            var maintain_1 = function () {
                if (_this.currentCacheSize > _this.config.get().imageLoader.maxCacheSize) {
                    var next_1 = function () {
                        _this.currentCacheSize -= file_1.size;
                        maintain_1();
                    };
                    var file_1 = _this.cacheIndex.splice(0, 1)[0];
                    if (typeof file_1 === 'undefined')
                        return maintain_1();
                    _this.removeFile(file_1.name).then(function () { return next_1(); }).catch(function () { return next_1(); });
                }
            };
            maintain_1();
        }
    };
    ImageLoaderController.prototype.addItemToQueue = function (imageUrl, resolve, reject) {
        this.queue.push({
            imageUrl: imageUrl,
            resolve: resolve,
            reject: reject
        });
        this.processQueue();
    };
    Object.defineProperty(ImageLoaderController.prototype, "canProcess", {
        get: function () {
            return this.queue.length > 0 && this.processing < this.config.get().imageLoader.concurrency;
        },
        enumerable: true,
        configurable: true
    });
    ImageLoaderController.prototype.processQueue = function () {
        var _this = this;
        if (!this.canProcess)
            return;
        this.processing++;
        var currentItem = this.queue.splice(0, 1)[0];
        if (this.canProcess)
            this.processQueue();
        var done = function () {
            _this.processing--;
            _this.processQueue();
        };
        var localPath = this.cacheDirectory + '/' + this.createFileName(currentItem.imageUrl);
        this.downloadImage(currentItem.imageUrl, localPath).then(function (file) {
            if (_this.shouldIndex) {
                _this.addFileToIndex(file).then(_this.maintainCacheSize.bind(_this));
            }
            _this.getCachedImagePath(currentItem.imageUrl).then(function (localUrl) {
                currentItem.resolve(localUrl);
                done();
            });
        }).catch(function (e) {
            currentItem.reject();
            _this.throwError(e);
            done();
        });
    };
    ImageLoaderController.prototype.getCachedImagePath = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.isCacheReady) {
                return reject();
            }
            var fileName = _this.createFileName(url);
            _this.file.resolveLocalFilesystemUrl(_this.cacheDirectory + '/' + fileName).then(function (fileEntry) {
                if (_this.config.get().imageLoader.imageReturnType === 'base64') {
                    // read the file as data url and return the base64 string.
                    // should always be successful as the existence of the file
                    // is alreay ensured
                    _this.file.readAsDataURL(_this.cacheDirectory, fileName).then(function (base64) {
                        resolve(base64);
                    }).catch(reject);
                    return;
                }
                // now check if iOS device & using WKWebView Engine.
                // in this case only the tempDirectory is accessible,
                // therefore the file needs to be copied into that directory first!
                if (_this.isWKWebView) {
                    // check if file already exists in temp directory
                    _this.file.resolveLocalFilesystemUrl(_this.cacheTempDirectory + '/' + fileName).then(function (tempFileEntry) {
                        // file exists in temp directory
                        // return native path
                        resolve(tempFileEntry.nativeURL);
                    }).catch(function () {
                        // file does not yet exist in the temp directory.
                        // copy it!
                        _this.file.copyFile(_this.cacheDirectory, fileName, _this.cacheTempDirectory, fileName).then(function (tempFileEntry) {
                            // now the file exists in the temp directory
                            // return native path
                            resolve(tempFileEntry.nativeURL);
                        }).catch(reject);
                    });
                }
                else {
                    // return native path
                    resolve(fileEntry.nativeURL);
                }
            }).catch(reject);
        });
    };
    ImageLoaderController.prototype.throwError = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.unshift('ImageLoader Error: ');
        console.error.apply(console, args);
    };
    ImageLoaderController.prototype.throwWarning = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.unshift('ImageLoader Warning: ');
        console.warn.apply(console, args);
    };
    Object.defineProperty(ImageLoaderController.prototype, "isWKWebView", {
        get: function () {
            return this.platform.is('ios') && window.webkit;
        },
        enumerable: true,
        configurable: true
    });
    ImageLoaderController.prototype.cacheDirectoryExists = function (directory) {
        return this.file.checkDir(directory, this.cacheDirectoryName);
    };
    Object.defineProperty(ImageLoaderController.prototype, "cacheRootDirectory", {
        get: function () {
            return this.file.cacheDirectory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoaderController.prototype, "cacheTempRootDirectory", {
        get: function () {
            return this.file.tempDirectory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoaderController.prototype, "cacheDirectoryName", {
        get: function () {
            return this.config.get().imageLoader.cacheDirectoryName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoaderController.prototype, "cacheDirectory", {
        get: function () {
            return this.cacheRootDirectory + this.cacheDirectoryName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoaderController.prototype, "cacheTempDirectory", {
        get: function () {
            return this.cacheTempRootDirectory + this.cacheDirectoryName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoaderController.prototype, "shouldIndex", {
        get: function () {
            return (this.config.get().imageLoader.maxCacheAge > -1) || (this.config.get().imageLoader.maxCacheSize > -1);
        },
        enumerable: true,
        configurable: true
    });
    ImageLoaderController.prototype.createCacheDirectory = function (replace) {
        var _this = this;
        if (replace === void 0) { replace = false; }
        var cacheDirectoryPromise, tempDirectoryPromise;
        if (replace) {
            // create or replace the cache directory
            cacheDirectoryPromise = this.file.createDir(this.cacheRootDirectory, this.cacheDirectoryName, replace);
        }
        else {
            // check if the cache directory exists.
            // if it does not exist create it!
            cacheDirectoryPromise = this.cacheDirectoryExists(this.cacheRootDirectory).catch(function () { return _this.file.createDir(_this.cacheRootDirectory, _this.cacheDirectoryName, false); });
        }
        if (this.isWKWebView) {
            if (replace) {
                // create or replace the temp directory
                tempDirectoryPromise = this.file.createDir(this.cacheTempRootDirectory, this.cacheDirectoryName, replace);
            }
            else {
                // check if the temp directory exists.
                // if it does not exist create it!
                tempDirectoryPromise = this.cacheDirectoryExists(this.cacheTempRootDirectory).catch(function () { return _this.file.createDir(_this.cacheTempRootDirectory, _this.cacheDirectoryName, false); });
            }
        }
        else {
            tempDirectoryPromise = Promise.resolve();
        }
        return Promise.all([cacheDirectoryPromise, tempDirectoryPromise]);
    };
    ImageLoaderController.prototype.createFileName = function (url) {
        return StringUtils.hash(url).toString();
    };
    return ImageLoaderController;
}());
export { ImageLoaderController };
ImageLoaderController.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ImageLoaderController.ctorParameters = function () { return [
    { type: Platform, },
    { type: Transfer, },
    { type: File, },
    { type: ConfigProvider, },
]; };
//# sourceMappingURL=image-loader.js.map