import * as _ from 'lodash';

export function isTrueProperty(val: any): boolean {
  if (typeof val === 'string') {
    val = val.toLowerCase().trim();
    return val === 'true' || val === 'on' || val === 'yes';
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
      _.assign(result, flatMap);
    } else {
      result[key] = value;
    }

    return result;
  }, {});
}

export function unFlattenObject(params: any) {
  return _.reduce(params, (result, value, key) => { return _.set(result, key, value); }, {});
}

export function dateFormat(date: Date, format: string = 'yyyy-MM-dd'): string {
  const month = date.getMonth() + 1;
  let time = {
    year: date.getFullYear(),
    tyear: String(date.getFullYear()).substr(2),
    month: month,
    tmonth: month < 10 ? '0' + month : String(month),
    day: date.getDate(),
    tday: date.getDate() < 10 ? '0' + date.getDate() : String(date.getDate()),
    hour24: date.getHours(),
    thour24: date.getHours() < 10 ? '0' + date.getHours() : String(date.getHours()),
    hour: date.getHours() < 13 ? date.getHours() : date.getHours() - 12,
    thour: date.getHours() < 10 ? '0' + date.getHours() : String(date.getHours()),
    minute: date.getMinutes(),
    tminute: date.getMinutes() < 10 ? '0' + date.getMinutes() : String(date.getMinutes()),
    second: date.getSeconds(),
    tsecond: date.getSeconds() < 10 ? '0' + date.getSeconds() : String(date.getSeconds()),
    millisecond: date.getMilliseconds()
  };

  return format.replace(/yyyy/ig, String(time.year))
    .replace(/yyy/ig, String(time.year))
    .replace(/yy/ig, time.tyear)
    .replace(/y/ig, time.tyear)
    .replace(/MM/g, time.tmonth)
    .replace(/M/g, String(time.month))
    .replace(/dd/ig, time.tday)
    .replace(/d/ig, String(time.day))
    .replace(/HH/g, time.thour24)
    .replace(/H/g, String(time.hour24))
    .replace(/hh/g, time.thour)
    .replace(/h/g, String(time.hour))
    .replace(/mm/g, time.tminute)
    .replace(/m/g, String(time.minute))
    .replace(/ss/ig, time.tsecond)
    .replace(/s/ig, String(time.second))
    .replace(/fff/ig, String(time.millisecond));
}
