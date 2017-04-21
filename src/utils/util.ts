import * as _ from 'lodash';

export function isTrueProperty(val: any): boolean {
  if (typeof val === 'string') {
    val = val.toLowerCase().trim();
    return (val === 'true' || val === 'on' || val === '');
  }
  return !!val;
};

export function isPresent(val: any): boolean {
  return val !== undefined && val !== null;
}

export function flattenObject(obj: any) {
  return _.transform(obj, function (result, value, key) {
    if (_.isObject(value) && !_.isArray(value)) {
      let flatMap = _.mapKeys(flattenObject(value), function (mvalue, mkey) {
        return `${key}.${mkey}`;
      });
      result = { ...result, ...flatMap };
    } else {
      result[key] = value;
    }

    return result;
  }, {});
}

export function unFlattenObject(params: any) {
  return _.reduce(params, (result, value, key) => { return _.set(result, key, value); }, {});
}