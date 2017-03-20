import { URLSearchParams } from '@angular/http';
import * as _ from 'lodash';

import { flattenObject } from '../../utils/util';

export const URLParamsBuilder = {
  build: (params: any): URLSearchParams => {
    if (!_.isObject(params)) {
      return null;
    }

    let paramsObj = flattenObject(params);
    let result: URLSearchParams = new URLSearchParams();
    for (let key in paramsObj) {
      result.set(key, <string>paramsObj[key]);
    }
    return result;
  }
};
