var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as _ from 'lodash';
export function isTrueProperty(val) {
    if (typeof val === 'string') {
        val = val.toLowerCase().trim();
        return (val === 'true' || val === 'on' || val === '');
    }
    return !!val;
}
;
export function isPresent(val) {
    return val !== undefined && val !== null;
}
export function flattenObject(obj) {
    return _.transform(obj, function (result, value, key) {
        if (_.isObject(value) && !_.isArray(value)) {
            var flatMap = _.mapKeys(flattenObject(value), function (mvalue, mkey) {
                return key + "." + mkey;
            });
            result = __assign({}, result, flatMap);
        }
        else {
            result[key] = value;
        }
        return result;
    }, {});
}
export function unFlattenObject(params) {
    return _.reduce(params, function (result, value, key) { return _.set(result, key, value); }, {});
}
//# sourceMappingURL=util.js.map