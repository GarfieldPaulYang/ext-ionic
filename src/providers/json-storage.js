"use strict";
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var util_1 = require('../utils/util');
var JsonStorage = (function () {
    function JsonStorage(platform) {
        this.platform = platform;
        this._rootPath = 'json-storage';
        this.map = {};
    }
    Object.defineProperty(JsonStorage.prototype, "rootPath", {
        set: function (rootPath) {
            this._rootPath = rootPath;
        },
        enumerable: true,
        configurable: true
    });
    JsonStorage.prototype.save = function (key, json) {
        if (!util_1.isPresent(json)) {
            return Promise.resolve(false);
        }
        if (this.platform.is('cordova')) {
            return this.witeJsonToFile(key, json);
        }
        this.map[key] = json;
        return Promise.resolve(true);
    };
    JsonStorage.prototype.witeJsonToFile = function (filename, json) {
        var _this = this;
        var sysRootPath = cordova.file.dataDirectory;
        return new Promise(function (resove) {
            ionic_native_1.File.checkDir(sysRootPath, _this._rootPath).then(function (_) {
                resove(true);
            }, function (_) {
                resove(ionic_native_1.File.createDir(sysRootPath, _this._rootPath, true));
            });
        }).then(function (_) {
            var path = sysRootPath + _this._rootPath;
            return ionic_native_1.File.writeFile(path, filename, JSON.stringify(json), { replace: true }).then(function (_) {
                return true;
            }, function (e) {
                console.log(e);
                return false;
            });
        });
    };
    JsonStorage.prototype.load = function (key) {
        if (this.platform.is('cordova')) {
            return this.readFileToJson(key);
        }
        return this.map[key];
    };
    JsonStorage.prototype.readFileToJson = function (key) {
        var path = cordova.file.dataDirectory + this._rootPath;
        return ionic_native_1.File.readAsText(path, key).then(function (jsonStr) {
            return JSON.parse(jsonStr);
        }, function (e) {
            console.log(e);
        });
    };
    JsonStorage.prototype.remove = function (key) {
        if (this.platform.is('cordova')) {
            return this.removeFile(key);
        }
        delete this.map[key];
        return Promise.resolve(true);
    };
    JsonStorage.prototype.removeFile = function (key) {
        var path = cordova.file.dataDirectory + this._rootPath;
        return ionic_native_1.File.removeFile(path, key).then(function (_) { return true; });
    };
    JsonStorage.decorators = [
        { type: core_1.Injectable },
    ];
    JsonStorage.ctorParameters = [
        { type: ionic_angular_1.Platform, },
    ];
    return JsonStorage;
}());
exports.JsonStorage = JsonStorage;
//# sourceMappingURL=json-storage.js.map