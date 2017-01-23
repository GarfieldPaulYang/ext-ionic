"use strict";
var core_1 = require('@angular/core');
exports.defaultConfig = {
    color: 'light',
    openUrlModal: {
        color: 'light',
        onmessage: function (e) { }
    },
    login: {
        devMode: false
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
exports.EXT_IONIC_CONFIG = new core_1.OpaqueToken('EXT_IONIC_CONFIG');
//# sourceMappingURL=config.js.map