"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/http");
const _ = require("lodash");
const util_1 = require("../../utils/util");
exports.URLParamsBuilder = {
    build: (params) => {
        if (!_.isObject(params)) {
            return null;
        }
        let paramsObj = util_1.flattenObject(params);
        let result = new http_1.URLSearchParams();
        for (let key in paramsObj) {
            let value = paramsObj[key];
            if (_.isFunction(value)) {
                continue;
            }
            if (_.isArray(value)) {
                value.forEach(v => {
                    result.append(key, v);
                });
                continue;
            }
            result.set(key, value);
        }
        return result;
    }
};
//# sourceMappingURL=url-params-builder.js.map