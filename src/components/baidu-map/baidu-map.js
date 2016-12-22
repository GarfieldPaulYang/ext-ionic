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
var baidu_map_loader_1 = require('./baidu-map-loader');
var BaiduMapController = (function () {
    function BaiduMapController() {
    }
    BaiduMapController.prototype.init = function (opts, ele) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            baidu_map_loader_1.baiduMapLoader().then(function () {
                _this._map = new BMap.Map(ele);
                setTimeout(function () {
                    _this._map.centerAndZoom(new BMap.Point(opts.center.lng, opts.center.lat), opts.zoom);
                    if (opts.navCtrl) {
                        _this._map.addControl(new BMap.NavigationControl());
                    }
                    if (opts.scaleCtrl) {
                        _this._map.addControl(new BMap.ScaleControl());
                    }
                    if (opts.overviewCtrl) {
                        _this._map.addControl(new BMap.OverviewMapControl());
                    }
                    if (opts.enableScrollWheelZoom) {
                        _this._map.enableScrollWheelZoom();
                    }
                    _this._map.setCurrentCity(opts.city);
                    resolve();
                });
            }, function () {
                reject();
            });
        });
    };
    BaiduMapController.prototype.translateGps = function () {
    };
    BaiduMapController = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BaiduMapController);
    return BaiduMapController;
}());
exports.BaiduMapController = BaiduMapController;
//# sourceMappingURL=baidu-map.js.map