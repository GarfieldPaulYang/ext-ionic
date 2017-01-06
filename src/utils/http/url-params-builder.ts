import { URLSearchParams } from "@angular/http";
import { isString, isObject, isArray } from 'ionic-angular/util/util';

export const URLParamsBuilder = {
  build: (params: any): URLSearchParams => {
    if (isString(params)) {
      return new URLSearchParams(params);
    }

    if (!isObject(params)) {
      return null;
    }

    let result: URLSearchParams = new URLSearchParams();
    for (let key in params) {
      if (isArray(params[key])) {
        params[key].forEach(v => {
          result.append(key, v);
        })
        continue;
      }
      result.set(key, params[key]);
    }
    return result;
  }
};