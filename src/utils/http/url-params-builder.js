"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/http");
var _ = require("lodash");
var util_1 = require("../../utils/util");
exports.URLParamsBuilder = {
    build: function (params) {
        if (!_.isObject(params)) {
            return null;
        }
        var paramsObj = util_1.flattenObject(params);
        var result = new http_1.URLSearchParams();
        var _loop_1 = function (key) {
            var value = paramsObj[key];
            if (_.isArray(value)) {
                value.forEach(function (v) {
                    result.append(key, v);
                });
                return "continue";
            }
            result.set(key, value);
        };
        for (var key in paramsObj) {
            _loop_1(key);
        }
        return result;
    }
};
//# sourceMappingURL=url-params-builder.js.map