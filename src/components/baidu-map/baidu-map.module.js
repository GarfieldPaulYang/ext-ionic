import { NgModule } from '@angular/core';
import { BaiduMapController } from './baidu-map';
import { BaiduMap } from './baidu-map-component';
export { BaiduMapController } from './baidu-map';
var BaiduMapModule = (function () {
    function BaiduMapModule() {
    }
    BaiduMapModule.forRoot = function () {
        return {
            ngModule: BaiduMapModule,
            providers: [
                BaiduMapController
            ]
        };
    };
    return BaiduMapModule;
}());
export { BaiduMapModule };
BaiduMapModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    BaiduMap
                ],
                declarations: [
                    BaiduMap
                ]
            },] },
];
/** @nocollapse */
BaiduMapModule.ctorParameters = function () { return []; };
//# sourceMappingURL=baidu-map.module.js.map