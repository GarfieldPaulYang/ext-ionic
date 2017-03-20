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
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var util_1 = require('../../utils/util');
var TextFileStorage = (function () {
    function TextFileStorage(platform) {
        this.platform = platform;
        this.localStorage = {};
    }
    TextFileStorage.prototype.save = function (filename, content) {
        if (!util_1.isPresent(content)) {
            return Promise.reject('content is not present');
        }
        if (this.platform.is('cordova')) {
            return this.writeToFile(filename, content);
        }
        this.localStorage[filename] = content;
        return Promise.resolve();
    };
    TextFileStorage.prototype.load = function (filename) {
        if (this.platform.is('cordova')) {
            return this.readFile(filename);
        }
        return Promise.resolve(this.localStorage[filename]);
    };
    TextFileStorage.prototype.remove = function (filename) {
        if (this.platform.is('cordova')) {
            return this.removeFile(filename);
        }
        delete this.localStorage[filename];
        return Promise.resolve({ success: true });
    };
    TextFileStorage.prototype.serialize = function (content) {
        return content;
    };
    TextFileStorage.prototype.deserialize = function (content) {
        return content;
    };
    TextFileStorage.prototype.writeToFile = function (filename, content) {
        return ionic_native_1.File.writeFile(this.getFilepath(), filename, this.serialize(content), { replace: true }).then(function (value) {
            return value;
        }).catch(function (reason) {
            console.log(reason);
            return Promise.reject(reason);
        });
    };
    TextFileStorage.prototype.readFile = function (filename) {
        var _this = this;
        return ionic_native_1.File.readAsText(this.getFilepath(), filename).then(function (value) {
            return _this.deserialize(value);
        }).catch(function (reason) {
            console.log(reason);
            return Promise.reject(reason);
        });
    };
    TextFileStorage.prototype.removeFile = function (filename) {
        return ionic_native_1.File.removeFile(this.getFilepath(), filename).then(function (value) {
            return value;
        }).catch(function (reason) {
            console.log(reason);
            return Promise.reject(reason);
        });
    };
    TextFileStorage.prototype.getFilepath = function () {
        return cordova.file.dataDirectory;
    };
    TextFileStorage = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ionic_angular_1.Platform])
    ], TextFileStorage);
    return TextFileStorage;
}());
exports.TextFileStorage = TextFileStorage;
//# sourceMappingURL=file-storage.js.map