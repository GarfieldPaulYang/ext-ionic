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
const file_1 = require("@ionic-native/file");
const util_1 = require("../../utils/util");
const mem_storage_1 = require("./mem-storage");
let TextFileStorage = class TextFileStorage {
    constructor(platform, file, memoryStorage) {
        this.platform = platform;
        this.file = file;
        this.memoryStorage = memoryStorage;
    }
    save(options) {
        if (!util_1.isPresent(options.content)) {
            return Promise.reject('content is not present');
        }
        if (this.platform.is('cordova')) {
            return this.writeToFile(options);
        }
        return this.memoryStorage.save(options);
    }
    load(options) {
        if (this.platform.is('cordova')) {
            if (!options.maxAge) {
                return this.readFile(options);
            }
            return this.file.resolveLocalFilesystemUrl(this.getFilepath(options.dirname) + '/' + options.filename).then(fileEntry => {
                return this.getMetadata(fileEntry);
            }).then((metadata) => {
                if (metadata && (Date.now() - metadata.modificationTime.getTime()) > options.maxAge) {
                    return this.removeFile(options).catch(() => { });
                }
            }).then(() => {
                return this.readFile(options);
            }).catch(error => {
                return Promise.reject(error);
            });
        }
        return this.memoryStorage.load(options);
    }
    remove(options) {
        if (this.platform.is('cordova')) {
            return this.removeFile(options);
        }
        return this.memoryStorage.remove(options);
    }
    serialize(content) {
        return content;
    }
    deserialize(content) {
        return content;
    }
    writeToFile(options) {
        return this.file.writeFile(this.getFilepath(options.dirname), options.filename, this.serialize(options.content), { replace: true }).then(value => {
            return value;
        }).catch(reason => {
            return Promise.reject(reason);
        });
    }
    readFile(options) {
        return this.file.readAsText(this.getFilepath(options.dirname), options.filename).then(value => {
            return this.deserialize(value);
        }).catch(reason => {
            return Promise.reject(reason);
        });
    }
    removeFile(options) {
        return this.file.removeFile(this.getFilepath(options.dirname), options.filename).then(value => {
            return value;
        }).catch(reason => {
            return Promise.reject(reason);
        });
    }
    getMetadata(fileEntry) {
        return new Promise((resolve) => {
            fileEntry.getMetadata(metadata => {
                resolve(metadata);
            }, (error) => resolve());
        });
    }
    getFilepath(dirname) {
        return this.file.dataDirectory + (dirname ? dirname : '');
    }
};
TextFileStorage = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ionic_angular_1.Platform, file_1.File, mem_storage_1.MemoryStorage])
], TextFileStorage);
exports.TextFileStorage = TextFileStorage;
//# sourceMappingURL=file-storage.js.map