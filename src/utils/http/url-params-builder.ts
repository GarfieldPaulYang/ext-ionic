import { HttpParams } from '@angular/common/http';
import * as _ from 'lodash';

import { flattenObject } from '../../utils/util';

export const URLParamsBuilder = {
  build: (params: any): HttpParams => {
    if (!_.isObject(params)) {
      return new HttpParams();
    }
    const paramsObj: any = flattenObject(params);
    return new HttpParams({ fromObject: paramsObj });
  },
};
