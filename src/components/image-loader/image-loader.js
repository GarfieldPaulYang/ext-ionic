var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, Inject } from '@angular/core';
import { Platform } from 'ionic-angular';
import { File, Transfer } from 'ionic-native';
import { WHCYIT_IONIC_CONFIG } from "../../config/config";
import { StringUtils } from "../../utils/string";
export var ImageLoaderController = (function () {
    function ImageLoaderController(platform, config) {
        var _this = this;
        this.config = config;
        this.isCacheReady = false;
        this.isInit = false;
        if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
            this.isInit = true;
            this.throwWarning('You are running on a browser or using livereload, IonicImageLoader will not function, falling back to browser loading.');
            return;
        }
        platform.ready().then(function () { return _this.initCache(); });
    }
    ImageLoaderController.prototype.getImagePath = function (imageUrl) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.needDownload(imageUrl)) {
                resolve(imageUrl);
                return;
            }
            var getImage = function () {
                _this.getCachedImagePath(imageUrl).then(function (imagePath) {
                    resolve(imagePath);
                }).catch(function () {
                    var localPath = _this.cacheDirectory + '/' + _this.createFileName(imageUrl);
                    _this.downloadImage(imageUrl, localPath).then(function () {
                        resolve(localPath);
                    }).catch(function (e) {
                        reject();
                        _this.throwError(e);
                    });
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
        var _this = this;
        if (!this.isCacheReady) {
            return;
        }
        if (!localPath) {
            return;
        }
        File.removeFile(this.cacheDirectory, localPath.substr(localPath.lastIndexOf('/') + 1)).catch(function (e) {
            _this.throwError(e);
        });
    };
    ImageLoaderController.prototype.clearCache = function () {
        var _this = this;
        if (!this.isCacheReady) {
            return;
        }
        File.removeDir(cordova.file.cacheDirectory, this.config.imageLoader.cacheDirectoryName).catch(function (e) {
            _this.throwError(e);
        });
    };
    ImageLoaderController.prototype.downloadImage = function (imageUrl, localPath) {
        var transfer = new Transfer();
        return transfer.download(imageUrl, localPath);
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
        if (!this.filePluginExists) {
            this.isInit = true;
            return;
        }
        this.cacheDirectoryExists.then(function () {
            _this.isCacheReady = true;
            _this.isInit = true;
        }).catch(function () {
            _this.createCacheDirectory(replace).then(function () {
                _this.isCacheReady = true;
                _this.isInit = true;
            }).catch(function (e) {
                _this.throwError(e);
                _this.isInit = true;
            });
        });
    };
    ImageLoaderController.prototype.getCachedImagePath = function (url) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (!_this.isCacheReady) {
                return reject();
            }
            var fileName = _this.createFileName(url);
            File.resolveLocalFilesystemUrl(_this.cacheDirectory + '/' + fileName).then(function (fileEntry) {
                resolve(fileEntry.nativeURL);
            }).catch(reject);
        });
    };
    ImageLoaderController.prototype.throwError = function (error) {
        console.error('ImageLoader Error', error);
    };
    ImageLoaderController.prototype.throwWarning = function (error) {
        console.warn('ImageLoader Warning', error);
    };
    Object.defineProperty(ImageLoaderController.prototype, "filePluginExists", {
        get: function () {
            if (!cordova || !cordova.file) {
                this.throwWarning('Unable to find the cordova file plugin. ImageLoader will not cache images.');
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoaderController.prototype, "cacheDirectoryExists", {
        get: function () {
            return File.checkDir(cordova.file.cacheDirectory, this.config.imageLoader.cacheDirectoryName);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageLoaderController.prototype, "cacheDirectory", {
        get: function () {
            return cordova.file.cacheDirectory + this.config.imageLoader.cacheDirectoryName;
        },
        enumerable: true,
        configurable: true
    });
    ImageLoaderController.prototype.createCacheDirectory = function (replace) {
        if (replace === void 0) { replace = false; }
        return File.createDir(cordova.file.cacheDirectory, this.config.imageLoader.cacheDirectoryName, replace);
    };
    ImageLoaderController.prototype.createFileName = function (url) {
        return StringUtils.hash(url).toString();
    };
    ImageLoaderController = __decorate([
        Injectable(),
        __param(1, Inject(WHCYIT_IONIC_CONFIG)), 
        __metadata('design:paramtypes', [Platform, Object])
    ], ImageLoaderController);
    return ImageLoaderController;
}());
//# sourceMappingURL=image-loader.js.map