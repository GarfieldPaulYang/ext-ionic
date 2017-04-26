"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const util_1 = require("../../utils/util");
let MemoryStorage = class MemoryStorage {
    constructor() {
        this.localStorage = {};
    }
    save(options) {
        if (!util_1.isPresent(options.content)) {
            return Promise.reject('content is not present');
        }
        this.localStorage[this.getKey(options.filename, options.dirname)] = options.content;
        return Promise.resolve();
    }
    load(options) {
        let content = this.localStorage[this.getKey(options.filename, options.dirname)];
        if (!content) {
            return Promise.reject('file not found.');
        }
        return Promise.resolve(content);
    }
    remove(options) {
        delete this.localStorage[this.getKey(options.filename, options.dirname)];
        return Promise.resolve({ success: true });
    }
    getKey(filename, dirname) {
        return (dirname ? dirname : '') + '_' + filename;
    }
};
MemoryStorage = __decorate([
    core_1.Injectable()
], MemoryStorage);
exports.MemoryStorage = MemoryStorage;
//# sourceMappingURL=mem-storage.js.map