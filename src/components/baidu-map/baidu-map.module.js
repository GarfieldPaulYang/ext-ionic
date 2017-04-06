"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var baidu_map_1 = require("./baidu-map");
var baidu_map_component_1 = require("./baidu-map-component");
var BaiduMapModule = BaiduMapModule_1 = (function () {
    function BaiduMapModule() {
    }
    BaiduMapModule.forRoot = function () {
        return {
            ngModule: BaiduMapModule_1,
            providers: [
                baidu_map_1.BaiduMapController
            ]
        };
    };
    return BaiduMapModule;
}());
BaiduMapModule = BaiduMapModule_1 = __decorate([
    core_1.NgModule({
        exports: [
            baidu_map_component_1.BaiduMap
        ],
        declarations: [
            baidu_map_component_1.BaiduMap
        ]
    })
], BaiduMapModule);
exports.BaiduMapModule = BaiduMapModule;
var BaiduMapModule_1;
//# sourceMappingURL=baidu-map.module.js.map