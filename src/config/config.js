var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as _ from 'lodash';
import { Injectable, InjectionToken } from '@angular/core';
var defaultConfig = {
    devMode: false,
    openUrlModal: {
        onmessage: function (e) { }
    },
    imageLoader: {
        spinnerEnabled: true,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        display: 'block',
        width: '100%',
        height: '100%',
        useImg: true,
        cacheDirectoryName: 'image-loader-cache',
        concurrency: 5,
        maxCacheSize: -1,
        maxCacheAge: -1,
        imageReturnType: 'uri',
        fallbackAsPlaceholder: false
    },
    baiduMap: {
        navCtrl: true,
        scaleCtrl: true,
        overviewCtrl: true,
        enableScrollWheelZoom: true,
        zoom: 10,
        city: '武汉',
        mass: {
            enabled: false
        }
    }
};
var ConfigProvider = (function () {
    function ConfigProvider() {
    }
    ConfigProvider.prototype.get = function () {
        return this._config;
    };
    ConfigProvider.prototype.init = function (config) {
        this._config = _.isUndefined(config) ? defaultConfig : __assign({}, defaultConfig, config);
    };
    return ConfigProvider;
}());
export { ConfigProvider };
ConfigProvider.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ConfigProvider.ctorParameters = function () { return []; };
export function setupConfig(userConfig) {
    var conifg = new ConfigProvider();
    conifg.init(userConfig);
    return conifg;
}
export var EXT_IONIC_CONFIG = new InjectionToken('EXT_IONIC_CONFIG');
//# sourceMappingURL=config.js.map