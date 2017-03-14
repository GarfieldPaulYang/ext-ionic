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
var ionic_native_1 = require('ionic-native');
var hot_code_push_1 = require('../native/hot-code-push');
var config_1 = require('../config/config');
var dialog_1 = require('../utils/dialog');
var local_notifications_1 = require('../native/local-notifications');
var open_url_modal_1 = require('../components/open-url-modal/open-url-modal');
var HotUpdater = (function () {
    function HotUpdater(platform, dialog, config, openUrlCtrl) {
        this.platform = platform;
        this.dialog = dialog;
        this.config = config;
        this.openUrlCtrl = openUrlCtrl;
    }
    HotUpdater.prototype.start = function () {
        var _this = this;
        hot_code_push_1.HotCodePush.isUpdateAvailableForInstallation(function (error, data) {
            if (!error) {
                hot_code_push_1.HotCodePush.installUpdate().then(function (error) {
                    console.log(error);
                });
                return;
            }
            hot_code_push_1.HotCodePush.fetchUpdate(function (error, data) {
                if (!error) {
                    _this.dialog.confirm('更新通知', '新版本更新成功,是否现在重启应用?', function () {
                        hot_code_push_1.HotCodePush.installUpdate().then(function (e) {
                            console.log(e);
                        });
                    });
                    return;
                }
                if (error.code === hot_code_push_1.HotCodePush.error.APPLICATION_BUILD_VERSION_TOO_LOW) {
                    _this.updateApp();
                    return;
                }
                console.log(error);
            }, {});
        });
    };
    HotUpdater.prototype.updateApp = function () {
        if (!this.config.get().hotUpdateUrl) {
            return;
        }
        var isios = this.platform.is('ios');
        if (isios) {
            this.updateIos();
            return;
        }
        var isAndroid = this.platform.is('android');
        if (isAndroid) {
            this.updateAndroid();
        }
    };
    HotUpdater.prototype.updateIos = function () {
        var _this = this;
        this.dialog.confirm('更新通知', '发现新版本,是否现在更新?', function () {
            _this.openUrlCtrl.open({
                title: '应用更新',
                url: _this.config.get().hotUpdateUrl.ios
            });
        });
    };
    HotUpdater.prototype.updateAndroid = function () {
        var _this = this;
        var targetPath = cordova.file.externalApplicationStorageDirectory + '/app/app.apk';
        this.dialog.confirm('更新通知', '发现新版本,是否现在更新?', function () {
            local_notifications_1.ExtLocalNotifications.schedule({
                id: 1000,
                title: '正在更新...',
                progress: true,
                maxProgress: 100,
                currentProgress: 0
            });
            var transfer = new ionic_native_1.Transfer();
            transfer.onProgress(function (event) {
                var progress = ((event.loaded / event.total) * 100).toFixed(2);
                local_notifications_1.ExtLocalNotifications.update({
                    id: 1000,
                    title: '正在更新...',
                    progress: true,
                    maxProgress: 100,
                    currentProgress: Math.round(Number(progress))
                });
            });
            transfer.download(_this.config.get().hotUpdateUrl.android, targetPath).then(function () {
                local_notifications_1.ExtLocalNotifications.clear(1000);
                _this.dialog.confirm('更新通知', '新版本下载完成是否现在安装?', function () {
                    ionic_native_1.FileOpener.open(targetPath, 'application/vnd.android.package-archive');
                });
            }, function (e) {
                console.log(e);
            });
        });
    };
    HotUpdater = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ionic_angular_1.Platform, dialog_1.Dialog, config_1.ConfigProvider, open_url_modal_1.OpenUrlModalController])
    ], HotUpdater);
    return HotUpdater;
}());
exports.HotUpdater = HotUpdater;
//# sourceMappingURL=hot-updater.js.map