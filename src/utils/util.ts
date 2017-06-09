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

export function dateFormat(date: Date | number, format: string = 'yyyy-MM-dd'): string {
  const d = _.isNumber(date) ? new Date(date) : date;
  const month = d.getMonth() + 1;
  let time = {
    year: d.getFullYear(),
    tyear: String(d.getFullYear()).substr(2),
    month: month,
    tmonth: month < 10 ? '0' + month : String(month),
    day: d.getDate(),
    tday: d.getDate() < 10 ? '0' + d.getDate() : String(d.getDate()),
    hour24: d.getHours(),
    thour24: d.getHours() < 10 ? '0' + d.getHours() : String(d.getHours()),
    hour: d.getHours() < 13 ? d.getHours() : d.getHours() - 12,
    thour: d.getHours() < 10 ? '0' + d.getHours() : String(d.getHours()),
    minute: d.getMinutes(),
    tminute: d.getMinutes() < 10 ? '0' + d.getMinutes() : String(d.getMinutes()),
    second: d.getSeconds(),
    tsecond: d.getSeconds() < 10 ? '0' + d.getSeconds() : String(d.getSeconds()),
    millisecond: d.getMilliseconds()
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
