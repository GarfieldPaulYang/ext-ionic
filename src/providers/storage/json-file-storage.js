var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { TextFileStorage } from './file-storage';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { MemoryStorage } from './mem-storage';
var JsonFileStorage = (function (_super) {
    __extends(JsonFileStorage, _super);
    function JsonFileStorage(platform, file, memoryStorage) {
        var _this = _super.call(this, platform, file, memoryStorage) || this;
        _this.platform = platform;
        _this.file = file;
        _this.memoryStorage = memoryStorage;
        return _this;
    }
    JsonFileStorage.prototype.serialize = function (content) {
        return JSON.stringify(content);
    };
    JsonFileStorage.prototype.deserialize = function (content) {
        return JSON.parse(content);
    };
    return JsonFileStorage;
}(TextFileStorage));
export { JsonFileStorage };
JsonFileStorage.decorators = [
    { type: Injectable },
];
/** @nocollapse */
JsonFileStorage.ctorParameters = function () { return [
    { type: Platform, },
    { type: File, },
    { type: MemoryStorage, },
]; };
//# sourceMappingURL=json-file-storage.js.map