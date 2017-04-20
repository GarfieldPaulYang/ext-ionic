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
let TextFileStorage = class TextFileStorage {
    constructor(platform, file) {
        this.platform = platform;
        this.file = file;
        this.localStorage = {};
    }
    save(filename, content) {
        if (!util_1.isPresent(content)) {
            return Promise.reject('content is not present');
        }
        if (this.platform.is('cordova')) {
            return this.writeToFile(filename, content);
        }
        this.localStorage[filename] = content;
        return Promise.resolve();
    }
    load(filename) {
        if (this.platform.is('cordova')) {
            return this.readFile(filename);
        }
        let content = this.localStorage[filename];
        if (!content) {
            return Promise.reject('file not found.');
        }
        return Promise.resolve(content);
    }
    remove(filename) {
        if (this.platform.is('cordova')) {
            return this.removeFile(filename);
        }
        delete this.localStorage[filename];
        return Promise.resolve({ success: true });
    }
    serialize(content) {
        return content;
    }
    deserialize(content) {
        return content;
    }
    writeToFile(filename, content) {
        return this.file.writeFile(this.getFilepath(), filename, this.serialize(content), { replace: true }).then(value => {
            return value;
        }).catch(reason => {
            return Promise.reject(reason);
        });
    }
    readFile(filename) {
        return this.file.readAsText(this.getFilepath(), filename).then(value => {
            return this.deserialize(value);
        }).catch(reason => {
            return Promise.reject(reason);
        });
    }
    removeFile(filename) {
        return this.file.removeFile(this.getFilepath(), filename).then(value => {
            return value;
        }).catch(reason => {
            return Promise.reject(reason);
        });
    }
    getFilepath() {
        return this.file.dataDirectory;
    }
};
TextFileStorage = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ionic_angular_1.Platform, file_1.File])
], TextFileStorage);
exports.TextFileStorage = TextFileStorage;
//# sourceMappingURL=file-storage.js.map