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

const ASSERT_ENABLED = true;

export function assert(actual: any, reason?: string) {
  if (!actual && ASSERT_ENABLED === true) {
    let message = 'EXT-IONIC ASSERT: ' + reason;
    console.error(message);
    debugger; // tslint:disable-line
    throw new Error(message);
  }
}

export function flattenObject(obj) {
  return _.transform(obj, function (result, value, key) {
    if (_.isObject(value) && !_.isArray(value)) {
      let flatMap = _.mapKeys(flattenObject(value), function (mvalue, mkey) {
        return `${key}.${mkey}`;
      });
      _.assign(result, flatMap);
    } else {
      result[key] = value;
    }

    return result;
  }, {});
}

export function unFlattenObject(params) {
  return _.reduce(params, (result, value, key) => { return _.set(result, key, value); }, {});
}