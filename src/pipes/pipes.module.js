"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const map_to_iterable_1 = require("./map-to-iterable");
const order_by_1 = require("./order-by");
let PipesModule = PipesModule_1 = class PipesModule {
    static forRoot() {
        return {
            ngModule: PipesModule_1,
            providers: [
                map_to_iterable_1.MapToIterable,
                order_by_1.OrderBy
            ]
        };
    }
};
PipesModule = PipesModule_1 = __decorate([
    core_1.NgModule({
        exports: [
            map_to_iterable_1.MapToIterable,
            order_by_1.OrderBy
        ],
        declarations: [
            map_to_iterable_1.MapToIterable,
            order_by_1.OrderBy
        ]
    })
], PipesModule);
exports.PipesModule = PipesModule;
var PipesModule_1;
//# sourceMappingURL=pipes.module.js.map