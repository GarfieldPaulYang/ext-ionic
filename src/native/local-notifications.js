"use strict";
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@ionic-native/core");
var local_notifications_1 = require("@ionic-native/local-notifications");
var ExtLocalNotifications = (function (_super) {
    __extends(ExtLocalNotifications, _super);
    function ExtLocalNotifications() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ExtLocalNotifications.prototype.schedule = function (options) { };
    ExtLocalNotifications.prototype.update = function (options) { };
    return ExtLocalNotifications;
}(local_notifications_1.LocalNotifications));
__decorate([
    core_2.Cordova({
        sync: true
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExtLocalNotifications.prototype, "schedule", null);
__decorate([
    core_2.Cordova({
        sync: true
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ExtLocalNotifications.prototype, "update", null);
ExtLocalNotifications = __decorate([
    core_2.Plugin({
        pluginName: 'LocalNotifications',
        plugin: 'de.appplant.cordova.plugin.local-notification',
        pluginRef: 'cordova.plugins.notification.local',
        repo: 'https://github.com/squallliu/cordova-plugin-local-notifications'
    }),
    core_1.Injectable()
], ExtLocalNotifications);
exports.ExtLocalNotifications = ExtLocalNotifications;
//# sourceMappingURL=local-notifications.js.map