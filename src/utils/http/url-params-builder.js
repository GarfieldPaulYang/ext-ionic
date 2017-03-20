"use strict";
var http_1 = require('@angular/http');
var _ = require('lodash');
exports.URLParamsBuilder = {
    build: function (params) {
        var setObject = function (key, value, searchParams) {
            if (_.isArray(value)) {
                value.forEach(function (v) {
                    searchParams.append(key, v);
                });
                return;
            }
            if (_.isObject(value)) {
                for (var subKey in value) {
                    setObject(key + '.' + subKey, value[subKey], searchParams);
                }
                return;
            }
            searchParams.set(key, value);
        };
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
            if (_.isObject(params[key])) {
                setObject(key, params[key], result);
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