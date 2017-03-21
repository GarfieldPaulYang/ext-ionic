"use strict";
var _ = require('lodash');
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
var ASSERT_ENABLED = true;
function assert(actual, reason) {
    if (!actual && ASSERT_ENABLED === true) {
        var message = 'EXT-IONIC ASSERT: ' + reason;
        console.error(message);
        debugger;
        throw new Error(message);
    }
}
exports.assert = assert;
function flattenObject(obj) {
    return _.transform(obj, function (result, value, key) {
        if (_.isObject(value) && !_.isArray(value)) {
            var flatMap = _.mapKeys(flattenObject(value), function (mvalue, mkey) {
                return key + "." + mkey;
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
    return _.reduce(params, function (result, value, key) { return _.set(result, key, value); }, {});
}
exports.unFlattenObject = unFlattenObject;
//# sourceMappingURL=util.js.map