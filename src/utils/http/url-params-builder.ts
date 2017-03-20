import { URLSearchParams } from '@angular/http';
import * as _ from 'lodash';

export const URLParamsBuilder = {
  build: (params: any): URLSearchParams => {
    let setObject = (key: string, value: any, searchParams: URLSearchParams) => {
      if (_.isArray(value)) {
        value.forEach((v: any) => {
          searchParams.append(key, v);
        });
        return;
      }
      if (_.isObject(value)) {
        for (let subKey in value) {
          setObject(key + '.' + subKey, value[subKey], searchParams);
        }
        return;
      }
      searchParams.set(key, value);
    };

    if (!_.isObject(params)) {
      return null;
    }

    let result: URLSearchParams = new URLSearchParams();
    for (let key in params) {
      if (_.isArray(params[key])) {
        params[key].forEach((v: any) => {
          result.append(key, v);
        });
        continue;
      }
      if (_.isObject(params[key])) {
        setObject(key, params[key], result);
        continue;
      }
      result.set(key, params[key]);
    }
    return result;
  }
};
