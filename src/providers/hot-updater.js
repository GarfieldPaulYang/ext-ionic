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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var transfer_1 = require("@ionic-native/transfer");
var file_opener_1 = require("@ionic-native/file-opener");
var hot_code_push_1 = require("../native/hot-code-push");
var config_1 = require("../config/config");
var dialog_1 = require("../utils/dialog");
var local_notifications_1 = require("../native/local-notifications");
var HotUpdater = (function () {
    function HotUpdater(platform, dialog, config, hotCodePush, localNotifications, transfer, fileOpener) {
        this.platform = platform;
        this.dialog = dialog;
        this.config = config;
        this.hotCodePush = hotCodePush;
        this.localNotifications = localNotifications;
        this.transfer = transfer;
        this.fileOpener = fileOpener;
    }
    HotUpdater.prototype.start = function () {
        var _this = this;
        this.hotCodePush.isUpdateAvailableForInstallation(function (error, data) {
            if (!error) {
                _this.hotCodePush.installUpdate().then(function (error) {
                    console.log(error);
                });
                return;
            }
            _this.hotCodePush.fetchUpdate(function (error, data) {
                if (!error) {
                    _this.dialog.confirm('更新通知', '新版本更新成功,是否现在重启应用?', function () {
                        _this.hotCodePush.installUpdate().then(function (e) {
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
            });
        });
    };
    HotUpdater.prototype.updateApp = function () {
        var _this = this;
        if (!this.config.get().hotUpdateUrl) {
            return;
        }
        this.dialog.confirm('更新通知', '发现新版本,是否现在更新?', function () {
            if (_this.platform.is('ios')) {
                _this.updateIos();
                return;
            }
            _this.updateAndroid();
        });
    };
    HotUpdater.prototype.updateIos = function () {
        window.location.href = this.config.get().hotUpdateUrl.ios;
    };
    HotUpdater.prototype.updateAndroid = function () {
        var _this = this;
        var targetPath = cordova.file.externalApplicationStorageDirectory + '/app/app.apk';
        this.localNotifications.schedule({
            id: 1000,
            title: '正在更新...',
            progress: true,
            maxProgress: 100,
            currentProgress: 0
        });
        var transfer = this.transfer.create();
        transfer.onProgress(function (event) {
            var progress = ((event.loaded / event.total) * 100).toFixed(2);
            _this.localNotifications.update({
                id: 1000,
                title: '正在更新...',
                progress: true,
                maxProgress: 100,
                currentProgress: Math.round(Number(progress))
            });
        });
        transfer.download(this.config.get().hotUpdateUrl.android, targetPath).then(function () {
            _this.localNotifications.clear(1000);
            _this.dialog.confirm('更新通知', '新版本下载完成是否现在安装?', function () {
                _this.fileOpener.open(targetPath, 'application/vnd.android.package-archive');
            });
        }, function (e) {
            console.log(e);
        });
    };
    return HotUpdater;
}());
HotUpdater = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ionic_angular_1.Platform,
        dialog_1.Dialog,
        config_1.ConfigProvider,
        hot_code_push_1.HotCodePush,
        local_notifications_1.ExtLocalNotifications,
        transfer_1.Transfer,
        file_opener_1.FileOpener])
], HotUpdater);
exports.HotUpdater = HotUpdater;
//# sourceMappingURL=hot-updater.js.map