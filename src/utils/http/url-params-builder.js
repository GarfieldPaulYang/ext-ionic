"use strict";
var http_1 = require('@angular/http');
var _ = require('lodash');
var util_1 = require('../../utils/util');
exports.URLParamsBuilder = {
    build: function (params) {
        if (!_.isObject(params)) {
            return null;
        }
        var paramsObj = util_1.flattenObject(params);
        var result = new http_1.URLSearchParams();
        for (var key in paramsObj) {
            result.set(key, paramsObj[key]);
        }
        return result;
    }
};
//# sourceMappingURL=url-params-builder.js.map