"use strict";
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var util_1 = require('../utils/util');
var JsonStorage = (function () {
    function JsonStorage(platform) {
        this.platform = platform;
        this._storageDirectory = 'json-storage';
        this.map = {};
    }
    Object.defineProperty(JsonStorage.prototype, "storageDirectory", {
        get: function () {
            return this._storageDirectory;
        },
        set: function (path) {
            this._storageDirectory = path;
        },
        enumerable: true,
        configurable: true
    });
    JsonStorage.prototype.save = function (key, json) {
        if (!util_1.isPresent(json)) {
            return Promise.resolve(false);
        }
        if (this.platform.is('cordova')) {
            return this.writeJsonToFile(key, json);
        }
        this.map[key] = json;
        return Promise.resolve(true);
    };
    JsonStorage.prototype.load = function (key) {
        if (this.platform.is('cordova')) {
            return this.readFileToJson(key);
        }
        return Promise.resolve(this.map[key]);
    };
    JsonStorage.prototype.remove = function (key) {
        if (this.platform.is('cordova')) {
            return this.removeFile(key);
        }
        delete this.map[key];
        return Promise.resolve(true);
    };
    JsonStorage.prototype.writeJsonToFile = function (filename, json) {
        var _this = this;
        return new Promise(function (resove) {
            ionic_native_1.File.checkDir(_this.getRootpath(), _this.storageDirectory).then(function (_) {
                resove(true);
            }, function (_) {
                resove(ionic_native_1.File.createDir(_this.getRootpath(), _this.storageDirectory, true));
            });
        }).then(function (_) {
            return ionic_native_1.File.writeFile(_this.getFilepath(), filename, JSON.stringify(json), { replace: true }).then(function (_) {
                return true;
            }, function (e) {
                return false;
            });
        });
    };
    JsonStorage.prototype.readFileToJson = function (key) {
        return ionic_native_1.File.readAsText(this.getFilepath(), key).then(function (jsonStr) {
            return JSON.parse(jsonStr);
        });
    };
    JsonStorage.prototype.removeFile = function (key) {
        return ionic_native_1.File.removeFile(this.getFilepath(), key).then(function (_) { return true; });
    };
    JsonStorage.prototype.getRootpath = function () {
        return cordova.file.dataDirectory;
    };
    JsonStorage.prototype.getFilepath = function () {
        return this.getRootpath() + this.storageDirectory;
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