"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ionic_native_1 = require('ionic-native');
var ExtLocalNotifications = (function (_super) {
    __extends(ExtLocalNotifications, _super);
    function ExtLocalNotifications() {
        _super.apply(this, arguments);
    }
    ExtLocalNotifications.schedule = function (options) { };
    ExtLocalNotifications.updateProgress = function (options) { };
    __decorate([
        ionic_native_1.Cordova({
            sync: true
        }), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], ExtLocalNotifications, "schedule", null);
    __decorate([
        ionic_native_1.Cordova({
            sync: true
        }), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], ExtLocalNotifications, "updateProgress", null);
    ExtLocalNotifications = __decorate([
        ionic_native_1.Plugin({
            pluginName: 'LocalNotifications',
            plugin: 'de.appplant.cordova.plugin.local-notification',
            pluginRef: 'cordova.plugins.notification.local',
            repo: 'https://github.com/squallliu/cordova-plugin-local-notifications'
        }), 
        __metadata('design:paramtypes', [])
    ], ExtLocalNotifications);
    return ExtLocalNotifications;
}(ionic_native_1.LocalNotifications));
exports.ExtLocalNotifications = ExtLocalNotifications;
//# sourceMappingURL=local-notifications.js.map