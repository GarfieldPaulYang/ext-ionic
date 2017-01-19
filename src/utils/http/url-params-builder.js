import { URLSearchParams } from "@angular/http";
import { isArray, isObject } from 'lodash';
export var URLParamsBuilder = {
    build: function (params) {
        if (!isObject(params)) {
            return null;
        }
        var result = new URLSearchParams();
        var _loop_1 = function(key) {
            if (isArray(params[key])) {
                params[key].forEach(function (v) {
                    result.append(key, v);
                });
                return "continue";
            }
            result.set(key, params[key]);
        };
        for (var key in params) {
            _loop_1(key);
        }
        return result;
    }
};
//# sourceMappingURL=url-params-builder.js.map