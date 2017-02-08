"use strict";
var http_1 = require('@angular/http');
var _ = require('lodash');
exports.URLParamsBuilder = {
    build: function (params) {
        if (!_.isObject(params)) {
            return null;
        }
        var result = new http_1.URLSearchParams();
        var _loop_1 = function(key) {
            if (_.isArray(params[key])) {
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