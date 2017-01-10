import { URLSearchParams } from "@angular/http";
import * as _ from 'lodash';

export const URLParamsBuilder = {
  build: (params: Object): URLSearchParams => {
    if (!_.isObject(params)) {
      return null;
    }

    let result: URLSearchParams = new URLSearchParams();
    for (let key in params) {
      if (_.isArray(params[key])) {
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