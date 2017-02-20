"use strict";
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var util_1 = require('../utils/util');
var JsonStorage = (function () {
    function JsonStorage(platform) {
        this.platform = platform;
        this.map = {};
    }
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
        return ionic_native_1.File.writeFile(this.getFilepath(), filename, JSON.stringify(json), { replace: true }).then(function (value) {
            return true;
        }, function (reason) {
            console.log(reason);
            return false;
        });
    };
    JsonStorage.prototype.readFileToJson = function (key) {
        return ionic_native_1.File.readAsText(this.getFilepath(), key).then(function (value) {
            return JSON.parse(value);
        }, function (reason) {
            console.log(reason);
            return reason;
        });
    };
    JsonStorage.prototype.removeFile = function (key) {
        return ionic_native_1.File.removeFile(this.getFilepath(), key).then(function (value) {
            return true;
        }, function (reason) {
            console.log(reason);
            return false;
        });
    };
    JsonStorage.prototype.getFilepath = function () {
        return cordova.file.dataDirectory;
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