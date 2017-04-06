"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let MapToIterable = class MapToIterable {
    transform(value, ...args) {
        let result = [];
        if (value.entries) {
            for (var [key, value] of value.entries()) {
                result.push({ key, value });
            }
        }
        else {
            for (let key in value) {
                result.push({ key, value: value[key] });
            }
        }
        return result;
    }
};
MapToIterable = __decorate([
    core_1.Pipe({
        name: 'mapToIterable'
    }),
    core_1.Injectable()
], MapToIterable);
exports.MapToIterable = MapToIterable;
//# sourceMappingURL=map-to-iterable.js.map