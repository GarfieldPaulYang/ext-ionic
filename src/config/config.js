"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const core_1 = require("@angular/core");
const defaultConfig = {
    devMode: false,
    openUrlModal: {
        onmessage: (e) => { }
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
        maxCacheAge: -1
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
    },
    interceptors: []
};
let ConfigProvider = class ConfigProvider {
    get() {
        return this._config;
    }
    init(config) {
        this._config = _.isUndefined(config) ? defaultConfig : Object.assign({}, defaultConfig, config);
    }
};
ConfigProvider = __decorate([
    core_1.Injectable()
], ConfigProvider);
exports.ConfigProvider = ConfigProvider;
function setupConfig(userConfig) {
    const conifg = new ConfigProvider();
    conifg.init(userConfig);
    return conifg;
}
exports.setupConfig = setupConfig;
exports.EXT_IONIC_CONFIG = new core_1.OpaqueToken('EXT_IONIC_CONFIG');
//# sourceMappingURL=config.js.map