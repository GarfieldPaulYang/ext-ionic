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
const ASSERT_ENABLED = true;
function assert(actual, reason) {
    if (!actual && ASSERT_ENABLED === true) {
        let message = 'EXT-IONIC ASSERT: ' + reason;
        console.error(message);
        debugger; // tslint:disable-line
        throw new Error(message);
    }
}
exports.assert = assert;
function flattenObject(obj) {
    return _.transform(obj, function (result, value, key) {
        if (_.isObject(value) && !_.isArray(value)) {
            let flatMap = _.mapKeys(flattenObject(value), function (mvalue, mkey) {
                return `${key}.${mkey}`;
            });
            _.assign(result, flatMap);
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