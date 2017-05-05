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
            _.assign(result, flatMap);
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