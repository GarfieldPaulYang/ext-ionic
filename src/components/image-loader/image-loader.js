"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var ionic_native_1 = require('ionic-native');
var image_loader_config_1 = require("./image-loader-config");
var ImageLoaderController = (function () {
    function ImageLoaderController(config) {
        var _this = this;
        this.config = config;
        this.isCacheReady = false;
        this.isInit = false;
        if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
            this.isInit = true;
            this.throwWarning('You are running on a browser or using livereload, IonicImageLoader will not function, falling back to browser loading.');
        }
        else {
            document.addEventListener('deviceready', function () {
                _this.initCache();
            }, false);
        }
    }
    ImageLoaderController.prototype.getImagePath = function (imageUrl) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var getImage = function () {
                _this.getCachedImagePath(imageUrl)
                    .then(function (imagePath) {
                    resolve(imagePath);
                })
                    .catch(function () {
                    var localPath = cordova.file.cacheDirectory + _this.config.cacheDirectoryName + '/' + _this.createFileName(imageUrl);
                    _this.downloadImage(imageUrl, localPath)
                        .then(function () {
                        resolve(localPath);
                    })
                        .catch(function (e) {
                        reject();
                        _this.throwError(e);
                    });
                });
            };
            var check = function () {
                if (_this.isInit) {
                    if (_this.isCacheReady) {
                        getImage();
                    }
                    else {
                        _this.throwWarning('The cache system is not running. Images will be loaded by your browser instead.');
                        resolve(imageUrl);
                    }
                }
                else {
                    setTimeout(function () { return check(); }, 250);
                }
            };
            check();
        });
    };
    ImageLoaderController.prototype.downloadImage = function (imageUrl, localPath) {
        var transfer = new ionic_native_1.Transfer();
        return transfer.download(imageUrl, localPath);
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
            var dirPath = cordova.file.cacheDirectory + _this.config.cacheDirectoryName;
            ionic_native_1.File.resolveLocalFilesystemUrl(dirPath + '/' + fileName).then(function (fileEntry) {
                resolve(fileEntry.nativeURL);
            }).catch(reject);
        });
    };
    ImageLoaderController.prototype.throwError = function (error) {
        if (this.config.debugMode) {
            console.error('ImageLoader Error', error);
        }
    };
    ImageLoaderController.prototype.throwWarning = function (error) {
        if (this.config.debugMode) {
            console.warn('ImageLoader Warning', error);
        }
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
            return ionic_native_1.File.checkDir(cordova.file.cacheDirectory, this.config.cacheDirectoryName);
        },
        enumerable: true,
        configurable: true
    });
    ImageLoaderController.prototype.createCacheDirectory = function (replace) {
        if (replace === void 0) { replace = false; }
        return ionic_native_1.File.createDir(cordova.file.cacheDirectory, this.config.cacheDirectoryName, replace);
    };
    ImageLoaderController.prototype.createFileName = function (url) {
        return this.hashString(url).toString();
    };
    ImageLoaderController.prototype.hashString = function (string) {
        var hash = 0;
        var char;
        if (string.length === 0)
            return hash;
        for (var i = 0; i < string.length; i++) {
            char = string.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    };
    ImageLoaderController = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [image_loader_config_1.ImageLoaderConfig])
    ], ImageLoaderController);
    return ImageLoaderController;
}());
exports.ImageLoaderController = ImageLoaderController;
//# sourceMappingURL=image-loader.js.map