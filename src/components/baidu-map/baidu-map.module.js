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
var baidu_map_1 = require('./baidu-map');
var baidu_map_component_1 = require('./baidu-map-component');
var BaiduMapModule = (function () {
    function BaiduMapModule() {
    }
    BaiduMapModule.forRoot = function () {
        return {
            ngModule: BaiduMapModule,
            providers: [
                baidu_map_1.BaiduMapController
            ]
        };
    };
    BaiduMapModule = __decorate([
        core_1.NgModule({
            exports: [
                baidu_map_component_1.BaiduMap
            ],
            declarations: [
                baidu_map_component_1.BaiduMap
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], BaiduMapModule);
    return BaiduMapModule;
}());
exports.BaiduMapModule = BaiduMapModule;
//# sourceMappingURL=baidu-map.module.js.map