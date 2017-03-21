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
var core_2 = require('@ionic-native/core');
var Immerse = (function () {
    function Immerse() {
    }
    Immerse.prototype.setDarkMode = function (enable) { };
    __decorate([
        core_2.Cordova({
            sync: true
        }), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Boolean]), 
        __metadata('design:returntype', void 0)
    ], Immerse.prototype, "setDarkMode", null);
    Immerse = __decorate([
        core_2.Plugin({
            pluginName: 'ImmersePlugin',
            plugin: 'cordova-plugin-Immerse',
            pluginRef: 'ImmersePlugin',
            repo: 'https://github.com/squallliu/cordova-plugin-Immerse'
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Immerse);
    return Immerse;
}());
exports.Immerse = Immerse;
//# sourceMappingURL=immerse-plugin.js.map