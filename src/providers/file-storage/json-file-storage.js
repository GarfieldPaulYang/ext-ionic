"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var file_storage_1 = require('./file-storage');
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var JsonFileStorage = (function (_super) {
    __extends(JsonFileStorage, _super);
    function JsonFileStorage(platform) {
        _super.call(this, platform);
        this.platform = platform;
    }
    JsonFileStorage.prototype.serialize = function (content) {
        return JSON.stringify(content);
    };
    JsonFileStorage.prototype.deserialize = function (content) {
        return JSON.parse(content);
    };
    JsonFileStorage.decorators = [
        { type: core_1.Injectable },
    ];
    JsonFileStorage.ctorParameters = [
        { type: ionic_angular_1.Platform, },
    ];
    return JsonFileStorage;
}(file_storage_1.TextFileStorage));
exports.JsonFileStorage = JsonFileStorage;
//# sourceMappingURL=json-file-storage.js.map