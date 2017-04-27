import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { StarRatingCmp } from './star-rating';
var StarRatingModule = (function () {
    function StarRatingModule() {
    }
    StarRatingModule.forRoot = function () {
        return {
            ngModule: StarRatingModule, providers: []
        };
    };
    return StarRatingModule;
}());
export { StarRatingModule };
StarRatingModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    IonicModule
                ],
                exports: [
                    StarRatingCmp
                ],
                declarations: [
                    StarRatingCmp
                ]
            },] },
];
/** @nocollapse */
StarRatingModule.ctorParameters = function () { return []; };
//# sourceMappingURL=star-rating.module.js.map