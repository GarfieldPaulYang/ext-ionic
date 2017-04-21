"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function isTrueProperty(val) {
    if (typeof val === 'string') {
        val = val.toLowerCase().trim();
        return (val === 'true' || val === 'on' || val === '');
    }
    return !!val;
}
exports.isTrueProperty = isTrueProperty;
;
function isPresent(val) {
    return val !== undefined && val !== null;
}
exports.isPresent = isPresent;
function flattenObject(obj) {
    return _.transform(obj, function (result, value, key) {
        if (_.isObject(value) && !_.isArray(value)) {
            let flatMap = _.mapKeys(flattenObject(value), function (mvalue, mkey) {
                return `${key}.${mkey}`;
            });
            result = Object.assign({}, result, flatMap);
        }
        else {
            result[key] = value;
        }
        return result;
    }, {});
}
exports.flattenObject = flattenObject;
function unFlattenObject(params) {
    return _.reduce(params, (result, value, key) => { return _.set(result, key, value); }, {});
}
exports.unFlattenObject = unFlattenObject;
//# sourceMappingURL=util.js.map