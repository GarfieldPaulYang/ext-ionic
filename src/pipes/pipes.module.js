import { NgModule } from '@angular/core';
import { MapToIterable } from './map-to-iterable';
import { OrderBy } from './order-by';
export { MapToIterable } from './map-to-iterable';
export { OrderBy } from './order-by';
var PipesModule = (function () {
    function PipesModule() {
    }
    PipesModule.forRoot = function () {
        return {
            ngModule: PipesModule,
            providers: [
                MapToIterable,
                OrderBy
            ]
        };
    };
    return PipesModule;
}());
export { PipesModule };
PipesModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    MapToIterable,
                    OrderBy
                ],
                declarations: [
                    MapToIterable,
                    OrderBy
                ]
            },] },
];
/** @nocollapse */
PipesModule.ctorParameters = function () { return []; };
//# sourceMappingURL=pipes.module.js.map