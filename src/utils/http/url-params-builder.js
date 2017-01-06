"use strict";
var http_1 = require("@angular/http");
var util_1 = require('ionic-angular/util/util');
exports.URLParamsBuilder = {
    build: function (params) {
        if (util_1.isString(params)) {
            return new http_1.URLSearchParams(params);
        }
        if (!util_1.isObject(params)) {
            return null;
        }
        var result = new http_1.URLSearchParams();
        var _loop_1 = function(key) {
            if (util_1.isArray(params[key])) {
                params[key].forEach(function (v) {
                    result.append(key, v);
                });
                return "continue";
            }
            result.set(key, params[key]);
        };
        for (var key in params) {
            _loop_1(key);
        }
        return result;
    }
};
//# sourceMappingURL=url-params-builder.js.map