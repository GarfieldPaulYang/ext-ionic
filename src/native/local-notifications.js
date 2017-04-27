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
import { Cordova, Plugin } from '@ionic-native/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
var ExtLocalNotifications = (function (_super) {
    __extends(ExtLocalNotifications, _super);
    function ExtLocalNotifications() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtLocalNotifications.prototype.schedule = function (options) { };
    ExtLocalNotifications.prototype.update = function (options) { };
    return ExtLocalNotifications;
}(LocalNotifications));
ExtLocalNotifications.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ExtLocalNotifications.ctorParameters = function () { return []; };
__decorate([
    Cordova({
        sync: true
    })
], ExtLocalNotifications.prototype, "schedule", null);
__decorate([
    Cordova({
        sync: true
    })
], ExtLocalNotifications.prototype, "update", null);
ExtLocalNotifications = __decorate([
    Plugin({
        pluginName: 'LocalNotifications',
        plugin: 'de.appplant.cordova.plugin.local-notification',
        pluginRef: 'cordova.plugins.notification.local',
        repo: 'https://github.com/squallliu/cordova-plugin-local-notifications',
        platforms: ['Android', 'iOS', 'Windows']
    })
], ExtLocalNotifications);
export { ExtLocalNotifications };
//# sourceMappingURL=local-notifications.js.map