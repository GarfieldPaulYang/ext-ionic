"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var _ = require('lodash');
var ConfigManager = (function () {
    function ConfigManager() {
        this._config = {
            color: 'light',
            openUrlModalOptions: {
                color: 'light',
                onmessage: function (e) { }
            },
            imageLoaderOptions: {
                spinnerEnabled: true,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                display: 'block',
                width: '100%',
                height: '100%',
                useImg: true,
                cacheDirectoryName: 'image-loader-cache'
            },
            baiduMapOptions: {
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
    }
    Object.defineProperty(ConfigManager.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigManager.prototype, "openUrlModalOptions", {
        get: function () {
            return this._config.openUrlModalOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigManager.prototype, "imageLoaderOptions", {
        get: function () {
            return this._config.imageLoaderOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigManager.prototype, "baiduMapOptions", {
        get: function () {
            return this._config.baiduMapOptions;
        },
        enumerable: true,
        configurable: true
    });
    ConfigManager.prototype.set = function (config) {
        this._config = _.assign({}, this._config, config);
    };
    ConfigManager = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ConfigManager);
    return ConfigManager;
}());
exports.ConfigManager = ConfigManager;
//# sourceMappingURL=config.js.map