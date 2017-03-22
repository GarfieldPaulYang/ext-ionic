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
var ionic_angular_1 = require('ionic-angular');
var alpha_scroll_1 = require('./alpha-scroll');
var AlphaScrollModule = (function () {
    function AlphaScrollModule() {
    }
    AlphaScrollModule.forRoot = function () {
        return {
            ngModule: AlphaScrollModule, providers: []
        };
    };
    AlphaScrollModule = __decorate([
        core_1.NgModule({
            imports: [
                ionic_angular_1.IonicModule
            ],
            exports: [
                alpha_scroll_1.AlphaScroll
            ],
            declarations: [
                alpha_scroll_1.AlphaScroll
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AlphaScrollModule);
    return AlphaScrollModule;
}());
exports.AlphaScrollModule = AlphaScrollModule;
//# sourceMappingURL=alpha-scroll.module.js.map