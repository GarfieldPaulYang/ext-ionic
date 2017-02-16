"use strict";
var _ = require('lodash');
var core_1 = require('@angular/core');
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
        cacheDirectoryName: 'image-loader-cache'
    },
    baiduMap: {
        navCtrl: true,
        scaleCtrl: true,
        overviewCtrl: true,
        enableScrollWheelZoom: false,
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
        this._config = _.isUndefined(config) ? defaultConfig : _.assign({}, defaultConfig, config);
    };
    ConfigProvider.decorators = [
        { type: core_1.Injectable },
    ];
    ConfigProvider.ctorParameters = [];
    return ConfigProvider;
}());
exports.ConfigProvider = ConfigProvider;
function setupConfig(userConfig) {
    var conifg = new ConfigProvider();
    conifg.init(userConfig);
    return conifg;
}
exports.setupConfig = setupConfig;
exports.EXT_IONIC_CONFIG = new core_1.OpaqueToken('EXT_IONIC_CONFIG');
//# sourceMappingURL=config.js.map