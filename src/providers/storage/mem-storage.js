import { Injectable } from '@angular/core';
import { isPresent } from '../../utils/util';
var MemoryStorage = (function () {
    function MemoryStorage() {
        this.localStorage = {};
    }
    MemoryStorage.prototype.save = function (options) {
        if (!isPresent(options.content)) {
            return Promise.reject('content is not present');
        }
        this.localStorage[this.getKey(options.filename, options.dirname)] = options.content;
        return Promise.resolve();
    };
    MemoryStorage.prototype.load = function (options) {
        var content = this.localStorage[this.getKey(options.filename, options.dirname)];
        if (!content) {
            return Promise.reject('file not found.');
        }
        return Promise.resolve(content);
    };
    MemoryStorage.prototype.remove = function (options) {
        delete this.localStorage[this.getKey(options.filename, options.dirname)];
        return Promise.resolve({ success: true });
    };
    MemoryStorage.prototype.getKey = function (filename, dirname) {
        return (dirname ? dirname : '') + '_' + filename;
    };
    return MemoryStorage;
}());
export { MemoryStorage };
MemoryStorage.decorators = [
    { type: Injectable },
];
/** @nocollapse */
MemoryStorage.ctorParameters = function () { return []; };
//# sourceMappingURL=mem-storage.js.map