var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@angular/core';
import { Cordova, Plugin, IonicNativePlugin } from '@ionic-native/core';
var AppLauncher = (function (_super) {
    __extends(AppLauncher, _super);
    function AppLauncher() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppLauncher.prototype.canLaunch = function (options) { return; };
    ;
    AppLauncher.prototype.launch = function (options) { return; };
    ;
    return AppLauncher;
}(IonicNativePlugin));
AppLauncher.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AppLauncher.ctorParameters = function () { return []; };
__decorate([
    Cordova()
], AppLauncher.prototype, "canLaunch", null);
__decorate([
    Cordova()
], AppLauncher.prototype, "launch", null);
AppLauncher = __decorate([
    Plugin({
        pluginName: 'AppLauncher',
        plugin: 'com.hutchind.cordova.plugins.launcher',
        pluginRef: 'plugins.launcher',
        repo: 'https://github.com/nchutchind/App-Launcher-Cordova-Plugin',
        platforms: ['Android', 'iOS']
    })
], AppLauncher);
export { AppLauncher };
//# sourceMappingURL=app-launcher.js.map