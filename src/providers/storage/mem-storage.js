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
    save(filename, content) {
        if (!util_1.isPresent(content)) {
            return Promise.reject('content is not present');
        }
        this.localStorage[filename] = content;
        return Promise.resolve();
    }
    load(filename) {
        let content = this.localStorage[filename];
        if (!content) {
            return Promise.reject('file not found.');
        }
        return Promise.resolve(content);
    }
    remove(filename) {
        delete this.localStorage[filename];
        return Promise.resolve({ success: true });
    }
};
MemoryStorage = __decorate([
    core_1.Injectable()
], MemoryStorage);
exports.MemoryStorage = MemoryStorage;
//# sourceMappingURL=mem-storage.js.map