import { URLSearchParams } from "@angular/http";
import { isArray, isObject } from 'lodash';

export const URLParamsBuilder = {
  build: (params: any): URLSearchParams => {
    if (!isObject(params)) {
      return null;
    }

    let result: URLSearchParams = new URLSearchParams();
    for (let key in params) {
      if (isArray(params[key])) {
        params[key].forEach((v: any) => {
          result.append(key, v);
        })
        continue;
      }
      result.set(key, params[key]);
    }
    return result;
  }
};