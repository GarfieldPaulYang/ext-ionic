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
var core_1 = require('@angular/core');
var MapToIterable = (function () {
    function MapToIterable() {
    }
    MapToIterable.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var result = [];
        if (value.entries) {
            for (var _a = 0, _b = value.entries(); _a < _b.length; _a++) {
                var _c = _b[_a], key = _c[0], value = _c[1];
                result.push({ key: key, value: value });
            }
        }
        else {
            for (var key_1 in value) {
                result.push({ key: key_1, value: value[key_1] });
            }
        }
        return result;
    };
    MapToIterable = __decorate([
        core_1.Pipe({
            name: 'mapToIterable'
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MapToIterable);
    return MapToIterable;
}());
exports.MapToIterable = MapToIterable;
//# sourceMappingURL=map-to-iterable.js.map