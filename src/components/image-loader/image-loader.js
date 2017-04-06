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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const ionic_angular_1 = require("ionic-angular");
const transfer_1 = require("@ionic-native/transfer");
const file_1 = require("@ionic-native/file");
const config_1 = require("../../config/config");
const string_1 = require("../../utils/string");
let ImageLoaderController = class ImageLoaderController {
    constructor(platform, transfer, file, config) {
        this.platform = platform;
        this.transfer = transfer;
        this.file = file;
        this.config = config;
        this.isCacheReady = false;
        this.isInit = false;
        if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
            this.isInit = true;
            this.throwWarning('You are running on a browser or using livereload, IonicImageLoader will not function, falling back to browser loading.');
            return;
        }
        platform.ready().then(() => this.initCache());
    }
    getImagePath(imageUrl) {
        return new Promise((resolve, reject) => {
            if (!this.needDownload(imageUrl)) {
                resolve(imageUrl);
                return;
            }
            let getImage = () => {
                this.getCachedImagePath(imageUrl).then(imagePath => {
                    resolve(imagePath);
                }).catch(() => {
                    let localPath = this.cacheDirectory + '/' + this.createFileName(imageUrl);
                    this.downloadImage(imageUrl, localPath).then(() => {
                        resolve(localPath);
                    }).catch(e => {
                        reject();
                        this.throwError(e);
                    });
                });
            };
            let check = () => {
                if (this.isInit) {
                    if (this.isCacheReady) {
                        getImage();
                        return;
                    }
                    this.throwWarning('The cache system is not running. Images will be loaded by your browser instead.');
                    resolve(imageUrl);
                    return;
                }
                setTimeout(() => check(), 250);
            };
            check();
        });
    }
    removeCacheFile(localPath) {
        if (!this.isCacheReady) {
            return;
        }
        if (!localPath) {
            return;
        }
        this.file.removeFile(this.cacheDirectory, localPath.substr(localPath.lastIndexOf('/') + 1)).catch(e => {
            this.throwError(e);
        });
    }
    clearCache() {
        if (!this.isCacheReady) {
            return;
        }
        this.file.removeDir(cordova.file.cacheDirectory, this.config.get().imageLoader.cacheDirectoryName).catch(e => {
            this.throwError(e);
        });
    }
    downloadImage(imageUrl, localPath) {
        let transfer = this.transfer.create();
        return transfer.download(imageUrl, localPath);
    }
    needDownload(imageUrl) {
        return string_1.StringUtils.startsWith(imageUrl, [
            'http://',
            'https://',
            'ftp://'
        ]);
    }
    initCache(replace) {
        if (!this.filePluginExists) {
            this.isInit = true;
            return;
        }
        this.cacheDirectoryExists.then(() => {
            this.isCacheReady = true;
            this.isInit = true;
        }).catch(() => {
            this.createCacheDirectory(replace).then(() => {
                this.isCacheReady = true;
                this.isInit = true;
            }).catch(e => {
                this.throwError(e);
                this.isInit = true;
            });
        });
    }
    getCachedImagePath(url) {
        return new Promise((resolve, reject) => {
            if (!this.isCacheReady) {
                return reject();
            }
            let fileName = this.createFileName(url);
            this.file.resolveLocalFilesystemUrl(this.cacheDirectory + '/' + fileName).then((fileEntry) => {
                resolve(fileEntry.nativeURL);
            }).catch(reject);
        });
    }
    throwError(error) {
        console.error('ImageLoader Error', error);
    }
    throwWarning(error) {
        console.warn('ImageLoader Warning', error);
    }
    get filePluginExists() {
        if (!cordova || !cordova.file) {
            this.throwWarning('Unable to find the cordova file plugin. ImageLoader will not cache images.');
            return false;
        }
        return true;
    }
    get cacheDirectoryExists() {
        return this.file.checkDir(cordova.file.cacheDirectory, this.config.get().imageLoader.cacheDirectoryName);
    }
    get cacheDirectory() {
        return cordova.file.cacheDirectory + this.config.get().imageLoader.cacheDirectoryName;
    }
    createCacheDirectory(replace = false) {
        return this.file.createDir(cordova.file.cacheDirectory, this.config.get().imageLoader.cacheDirectoryName, replace);
    }
    createFileName(url) {
        return string_1.StringUtils.hash(url).toString();
    }
};
ImageLoaderController = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ionic_angular_1.Platform,
        transfer_1.Transfer,
        file_1.File,
        config_1.ConfigProvider])
], ImageLoaderController);
exports.ImageLoaderController = ImageLoaderController;
//# sourceMappingURL=image-loader.js.map