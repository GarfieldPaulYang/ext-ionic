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
const _ = require("lodash");
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
        this.processing = 0;
        this.indexed = false;
        this.currentCacheSize = 0;
        this.queue = [];
        this.cacheIndex = [];
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
            const getImage = () => {
                this.getCachedImagePath(imageUrl).then(resolve).catch(() => {
                    this.addItemToQueue(imageUrl, resolve, reject);
                });
            };
            const check = () => {
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
    preload(imageUrl) {
        return this.getImagePath(imageUrl);
    }
    removeCacheFile(localPath) {
        if (!this.platform.is('cordova')) {
            return;
        }
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
        if (!this.platform.is('cordova')) {
            return;
        }
        const clear = () => {
            if (!this.isInit) {
                setTimeout(clear.bind(this), 500);
                return;
            }
            this.isInit = false;
            this.file.removeRecursively(this.cacheRootDirectory, this.config.get().imageLoader.cacheDirectoryName).then(() => {
                this.initCache(true);
            }).catch(this.throwError.bind(this));
        };
        clear();
    }
    downloadImage(imageUrl, localPath) {
        const transfer = this.transfer.create();
        return transfer.download(imageUrl, localPath, true);
    }
    needDownload(imageUrl) {
        return string_1.StringUtils.startsWith(imageUrl, [
            'http://',
            'https://',
            'ftp://'
        ]);
    }
    initCache(replace) {
        this.cacheDirectoryExists.catch(() => {
            return this.createCacheDirectory(replace).catch(e => {
                this.throwError(e);
                this.isInit = true;
            });
        }).then(() => this.indexCache()).then(() => {
            this.isCacheReady = true;
            this.isInit = true;
        });
    }
    addFileToIndex(file) {
        return new Promise((resolve, reject) => file.getMetadata(resolve, reject)).then(metadata => {
            if (this.config.get().imageLoader.maxCacheAge > -1
                && (Date.now() - metadata.modificationTime.getTime()) > this.config.get().imageLoader.maxCacheAge) {
                return this.file.removeFile(this.cacheDirectory, file.name);
            }
            else {
                this.currentCacheSize += metadata.size;
                this.cacheIndex.push({
                    name: file.name,
                    modificationTime: metadata.modificationTime,
                    size: metadata.size
                });
                return Promise.resolve();
            }
        });
    }
    indexCache() {
        if (!this.shouldIndex)
            return Promise.resolve();
        this.cacheIndex = [];
        return this.file.listDir(this.cacheRootDirectory, this.config.get().imageLoader.cacheDirectoryName).then(files => Promise.all(files.map(this.addFileToIndex.bind(this)))).then(() => {
            this.cacheIndex = _.sortBy(this.cacheIndex, 'modificationTime');
            this.indexed = true;
            return Promise.resolve();
        }).catch(e => {
            this.throwError(e);
            return Promise.resolve();
        });
    }
    maintainCacheSize() {
        if (this.config.get().imageLoader.maxCacheSize > -1 && this.indexed) {
            const maintain = () => {
                if (this.currentCacheSize > this.config.get().imageLoader.maxCacheSize) {
                    const next = () => {
                        this.currentCacheSize -= file.size;
                        maintain();
                    };
                    const file = this.cacheIndex.splice(0, 1)[0];
                    if (typeof file === 'undefined')
                        return maintain();
                    this.file.removeFile(this.cacheDirectory, file.name).then(() => next()).catch(() => next());
                }
            };
            maintain();
        }
    }
    addItemToQueue(imageUrl, resolve, reject) {
        this.queue.push({
            imageUrl,
            resolve,
            reject
        });
        this.processQueue();
    }
    get canProcess() {
        return this.queue.length > 0 && this.processing < this.config.get().imageLoader.concurrency;
    }
    processQueue() {
        if (!this.canProcess)
            return;
        this.processing++;
        const currentItem = this.queue.splice(0, 1)[0];
        if (this.canProcess)
            this.processQueue();
        const done = () => {
            this.processing--;
            this.processQueue();
        };
        const localPath = this.cacheDirectory + '/' + this.createFileName(currentItem.imageUrl);
        this.downloadImage(currentItem.imageUrl, localPath).then((file) => {
            if (this.shouldIndex) {
                this.addFileToIndex(file).then(this.maintainCacheSize.bind(this));
            }
            this.getCachedImagePath(currentItem.imageUrl).then((localUrl) => {
                currentItem.resolve(localUrl);
                done();
            });
        }).catch((e) => {
            currentItem.reject();
            this.throwError(e);
            done();
        });
    }
    getCachedImagePath(url) {
        return new Promise((resolve, reject) => {
            if (!this.isCacheReady) {
                return reject();
            }
            const fileName = this.createFileName(url);
            this.file.resolveLocalFilesystemUrl(this.cacheDirectory + '/' + fileName).then((fileEntry) => {
                resolve(fileEntry.nativeURL);
            }).catch(reject);
        });
    }
    throwError(...args) {
        args.unshift('ImageLoader Error: ');
        console.error.apply(console, args);
    }
    throwWarning(...args) {
        args.unshift('ImageLoader Warning: ');
        console.warn.apply(console, args);
    }
    get cacheDirectoryExists() {
        return this.file.checkDir(this.cacheRootDirectory, this.config.get().imageLoader.cacheDirectoryName);
    }
    get cacheRootDirectory() {
        return this.platform.is('ios') ? this.file.tempDirectory : this.cacheRootDirectory;
    }
    get cacheDirectory() {
        return this.cacheRootDirectory + this.config.get().imageLoader.cacheDirectoryName;
    }
    get shouldIndex() {
        return (this.config.get().imageLoader.maxCacheAge > -1) || (this.config.get().imageLoader.maxCacheSize > -1);
    }
    createCacheDirectory(replace = false) {
        return this.file.createDir(this.cacheRootDirectory, this.config.get().imageLoader.cacheDirectoryName, replace);
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