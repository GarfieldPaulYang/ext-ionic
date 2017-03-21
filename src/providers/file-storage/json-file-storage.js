"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var file_storage_1 = require('./file-storage');
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var file_1 = require('@ionic-native/file');
var JsonFileStorage = (function (_super) {
    __extends(JsonFileStorage, _super);
    function JsonFileStorage(platform, file) {
        _super.call(this, platform, file);
        this.platform = platform;
        this.file = file;
    }
    JsonFileStorage.prototype.serialize = function (content) {
        return JSON.stringify(content);
    };
    JsonFileStorage.prototype.deserialize = function (content) {
        return JSON.parse(content);
    };
    JsonFileStorage = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ionic_angular_1.Platform, file_1.File])
    ], JsonFileStorage);
    return JsonFileStorage;
}(file_storage_1.TextFileStorage));
exports.JsonFileStorage = JsonFileStorage;
//# sourceMappingURL=json-file-storage.js.map