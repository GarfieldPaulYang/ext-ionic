"use strict";
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
    MapToIterable.decorators = [
        { type: core_1.Pipe, args: [{
                    name: 'mapToIterable'
                },] },
        { type: core_1.Injectable },
    ];
    MapToIterable.ctorParameters = [];
    return MapToIterable;
}());
exports.MapToIterable = MapToIterable;
//# sourceMappingURL=map-to-iterable.js.map