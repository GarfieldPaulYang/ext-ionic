import { URLSearchParams } from '@angular/http';
import { HttpParams } from '@angular/common/http';
import * as _ from 'lodash';

import { flattenObject } from '../../utils/util';

const buildParams = (params: any, result: any): any => {
  if (!_.isObject(params)) {
    return null;
  }

  const paramsObj = flattenObject(params);
  for (let key in paramsObj) {
    let value = paramsObj[key];

    if (_.isFunction(value)) {
      continue;
    }

    if (_.isArray(value)) {
      (<string[]>value).forEach(v => {
        result.append(key, v);
      });
      continue;
    }

    result.set(key, <string>value);
  }
  return result;
};

export const HttpParamsBuilder = {
  build: (params: any): HttpParams => {
    return buildParams(params, new HttpParams());
  },
};

export const URLParamsBuilder = {
  build: (params: any): URLSearchParams => {
    return buildParams(params, new URLSearchParams());
  },
};
