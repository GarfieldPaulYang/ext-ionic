"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_storage_1 = require("./file-storage");
const core_1 = require("@angular/core");
const ionic_angular_1 = require("ionic-angular");
const file_1 = require("@ionic-native/file");
const mem_storage_1 = require("./mem-storage");
let JsonFileStorage = class JsonFileStorage extends file_storage_1.TextFileStorage {
    constructor(platform, file, memoryStorage) {
        super(platform, file, memoryStorage);
        this.platform = platform;
        this.file = file;
        this.memoryStorage = memoryStorage;
    }
    serialize(content) {
        return JSON.stringify(content);
    }
    deserialize(content) {
        return JSON.parse(content);
    }
};
JsonFileStorage = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ionic_angular_1.Platform, file_1.File, mem_storage_1.MemoryStorage])
], JsonFileStorage);
exports.JsonFileStorage = JsonFileStorage;
//# sourceMappingURL=json-file-storage.js.map