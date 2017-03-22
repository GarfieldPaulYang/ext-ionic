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
var star_rating_1 = require('./star-rating');
var StarRatingModule = (function () {
    function StarRatingModule() {
    }
    StarRatingModule.forRoot = function () {
        return {
            ngModule: StarRatingModule, providers: []
        };
    };
    StarRatingModule = __decorate([
        core_1.NgModule({
            imports: [
                ionic_angular_1.IonicModule
            ],
            exports: [
                star_rating_1.StarRatingCmp
            ],
            declarations: [
                star_rating_1.StarRatingCmp
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], StarRatingModule);
    return StarRatingModule;
}());
exports.StarRatingModule = StarRatingModule;
//# sourceMappingURL=star-rating.module.js.map