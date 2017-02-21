"use strict";
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
            return Promise.resolve(false);
        }
        if (this.platform.is('cordova')) {
            return this.writeToFile(filename, content);
        }
        this.localStorage[filename] = content;
        return Promise.resolve(true);
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
        return Promise.resolve(true);
    };
    TextFileStorage.prototype.serialize = function (content) {
        return content;
    };
    TextFileStorage.prototype.deserialize = function (content) {
        return content;
    };
    TextFileStorage.prototype.writeToFile = function (filename, content) {
        return ionic_native_1.File.writeFile(this.getFilepath(), filename, this.serialize(content), { replace: true }).then(function (value) {
            return true;
        }, function (reason) {
            console.log(reason);
            return false;
        });
    };
    TextFileStorage.prototype.readFile = function (filename) {
        var _this = this;
        return ionic_native_1.File.readAsText(this.getFilepath(), filename).then(function (value) {
            return _this.deserialize(value);
        }, function (reason) {
            console.log(reason);
            return reason;
        });
    };
    TextFileStorage.prototype.removeFile = function (filename) {
        return ionic_native_1.File.removeFile(this.getFilepath(), filename).then(function (value) {
            return true;
        }, function (reason) {
            console.log(reason);
            return false;
        });
    };
    TextFileStorage.prototype.getFilepath = function () {
        return cordova.file.dataDirectory;
    };
    TextFileStorage.decorators = [
        { type: core_1.Injectable },
    ];
    TextFileStorage.ctorParameters = [
        { type: ionic_angular_1.Platform, },
    ];
    return TextFileStorage;
}());
exports.TextFileStorage = TextFileStorage;
//# sourceMappingURL=file-storage.js.map