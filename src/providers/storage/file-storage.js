import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { isPresent } from '../../utils/util';
import { MemoryStorage } from './mem-storage';
var TextFileStorage = (function () {
    function TextFileStorage(platform, file, memoryStorage) {
        this.platform = platform;
        this.file = file;
        this.memoryStorage = memoryStorage;
    }
    TextFileStorage.prototype.save = function (options) {
        if (!isPresent(options.content)) {
            return Promise.reject('content is not present');
        }
        if (this.platform.is('cordova')) {
            return this.writeToFile(options);
        }
        return this.memoryStorage.save(options);
    };
    TextFileStorage.prototype.load = function (options) {
        var _this = this;
        if (this.platform.is('cordova')) {
            if (!options.maxAge) {
                return this.readFile(options);
            }
            return this.file.resolveLocalFilesystemUrl(this.getFilepath(options.dirname) + '/' + options.filename).then(function (fileEntry) {
                return _this.getMetadata(fileEntry);
            }).then(function (metadata) {
                if (metadata && (Date.now() - metadata.modificationTime.getTime()) > options.maxAge) {
                    return _this.removeFile(options).catch(function () { });
                }
            }).then(function () {
                return _this.readFile(options);
            }).catch(function (error) {
                return Promise.reject(error);
            });
        }
        return this.memoryStorage.load(options);
    };
    TextFileStorage.prototype.remove = function (options) {
        if (this.platform.is('cordova')) {
            return this.removeFile(options);
        }
        return this.memoryStorage.remove(options);
    };
    TextFileStorage.prototype.serialize = function (content) {
        return content;
    };
    TextFileStorage.prototype.deserialize = function (content) {
        return content;
    };
    TextFileStorage.prototype.writeToFile = function (options) {
        return this.file.writeFile(this.getFilepath(options.dirname), options.filename, this.serialize(options.content), { replace: true }).then(function (value) {
            return value;
        }).catch(function (reason) {
            return Promise.reject(reason);
        });
    };
    TextFileStorage.prototype.readFile = function (options) {
        var _this = this;
        return this.file.readAsText(this.getFilepath(options.dirname), options.filename).then(function (value) {
            return _this.deserialize(value);
        }).catch(function (reason) {
            return Promise.reject(reason);
        });
    };
    TextFileStorage.prototype.removeFile = function (options) {
        return this.file.removeFile(this.getFilepath(options.dirname), options.filename).then(function (value) {
            return value;
        }).catch(function (reason) {
            return Promise.reject(reason);
        });
    };
    TextFileStorage.prototype.getMetadata = function (fileEntry) {
        return new Promise(function (resolve) {
            fileEntry.getMetadata(function (metadata) {
                resolve(metadata);
            }, function (error) { return resolve(); });
        });
    };
    TextFileStorage.prototype.getFilepath = function (dirname) {
        return this.file.dataDirectory + (dirname ? dirname : '');
    };
    return TextFileStorage;
}());
export { TextFileStorage };
TextFileStorage.decorators = [
    { type: Injectable },
];
/** @nocollapse */
TextFileStorage.ctorParameters = function () { return [
    { type: Platform, },
    { type: File, },
    { type: MemoryStorage, },
]; };
//# sourceMappingURL=file-storage.js.map