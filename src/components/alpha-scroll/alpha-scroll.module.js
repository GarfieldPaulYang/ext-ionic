import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from '../../pipes/pipes.module';
import { AlphaScroll } from './alpha-scroll';
var AlphaScrollModule = (function () {
    function AlphaScrollModule() {
    }
    AlphaScrollModule.forRoot = function () {
        return {
            ngModule: AlphaScrollModule, providers: []
        };
    };
    return AlphaScrollModule;
}());
export { AlphaScrollModule };
AlphaScrollModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    IonicModule,
                    PipesModule
                ],
                exports: [
                    AlphaScroll
                ],
                declarations: [
                    AlphaScroll
                ]
            },] },
];
/** @nocollapse */
AlphaScrollModule.ctorParameters = function () { return []; };
//# sourceMappingURL=alpha-scroll.module.js.map