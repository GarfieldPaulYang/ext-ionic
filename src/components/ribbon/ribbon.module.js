import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Ribbon } from './ribbon';
var RibbonModule = (function () {
    function RibbonModule() {
    }
    RibbonModule.forRoot = function () {
        return {
            ngModule: RibbonModule, providers: []
        };
    };
    return RibbonModule;
}());
export { RibbonModule };
RibbonModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: [
                    Ribbon
                ],
                declarations: [
                    Ribbon
                ]
            },] },
];
/** @nocollapse */
RibbonModule.ctorParameters = function () { return []; };
//# sourceMappingURL=ribbon.module.js.map