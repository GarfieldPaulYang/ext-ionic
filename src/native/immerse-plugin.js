var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Cordova, Plugin } from '@ionic-native/core';
var Immerse = (function () {
    function Immerse() {
    }
    Immerse.prototype.setDarkMode = function (enable) { };
    return Immerse;
}());
Immerse.decorators = [
    { type: Injectable },
];
/** @nocollapse */
Immerse.ctorParameters = function () { return []; };
__decorate([
    Cordova({
        sync: true
    })
], Immerse.prototype, "setDarkMode", null);
Immerse = __decorate([
    Plugin({
        pluginName: 'ImmersePlugin',
        plugin: 'cordova-plugin-Immerse',
        pluginRef: 'ImmersePlugin',
        repo: 'https://github.com/squallliu/cordova-plugin-Immerse',
        platforms: ['Android']
    })
], Immerse);
export { Immerse };
//# sourceMappingURL=immerse-plugin.js.map