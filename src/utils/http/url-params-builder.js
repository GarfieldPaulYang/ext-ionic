import { URLSearchParams } from '@angular/http';
import * as _ from 'lodash';
import { flattenObject } from '../../utils/util';
export var URLParamsBuilder = {
    build: function (params) {
        if (!_.isObject(params)) {
            return null;
        }
        var paramsObj = flattenObject(params);
        var result = new URLSearchParams();
        var _loop_1 = function (key) {
            var value = paramsObj[key];
            if (_.isFunction(value)) {
                return "continue";
            }
            if (_.isArray(value)) {
                value.forEach(function (v) {
                    result.append(key, v);
                });
                return "continue";
            }
            result.set(key, value);
        };
        for (var key in paramsObj) {
            _loop_1(key);
        }
        return result;
    }
};
//# sourceMappingURL=url-params-builder.js.map