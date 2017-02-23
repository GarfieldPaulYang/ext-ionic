"use strict";
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var local_notifications_1 = require('../native/local-notifications');
var hot_code_push_1 = require('../native/hot-code-push');
var config_1 = require('../config/config');
var dialog_1 = require('../utils/dialog');
var HotUpdater = (function () {
    function HotUpdater(platform, dialog, config) {
        this.platform = platform;
        this.dialog = dialog;
        this.config = config;
    }
    HotUpdater.prototype.start = function () {
        var _this = this;
        hot_code_push_1.HotCodePush.onUpdateInstalled(function (event) {
            _this.dialog.toast('程序已更新完成，重启后生效...');
        });
        hot_code_push_1.HotCodePush.onAppNeedUpdate().then(function () {
            var isAndroid = _this.platform.is('android');
            if (!isAndroid) {
                return;
            }
            if (!_this.config.get().hotUpdateUrl) {
                return;
            }
            var targetPath = cordova.file.externalApplicationStorageDirectory + '/app/app.apk';
            _this.dialog.confirm('更新通知', '发现新版本,是否现在更新?', function () {
                local_notifications_1.ExtLocalNotifications.schedule({
                    id: 1000,
                    title: '正在更新...',
                    text: isAndroid ? '' : '已经完成 0%',
                    progress: isAndroid,
                    maxProgress: 100,
                    currentProgress: 0
                });
                var transfer = new ionic_native_1.Transfer();
                transfer.onProgress(function (event) {
                    var progress = ((event.loaded / event.total) * 100).toFixed(2);
                    local_notifications_1.ExtLocalNotifications.update({
                        id: 1000,
                        title: '正在更新...',
                        text: isAndroid ? '' : "\u5DF2\u7ECF\u5B8C\u6210 " + progress + "%",
                        progress: isAndroid,
                        maxProgress: 100,
                        currentProgress: Number(progress)
                    });
                });
                transfer.download(_this.config.get().hotUpdateUrl, targetPath).then(function () {
                    local_notifications_1.ExtLocalNotifications.clear(1000);
                    ionic_native_1.FileOpener.open(targetPath, 'application/vnd.android.package-archive');
                });
            });
        });
    };
    HotUpdater.decorators = [
        { type: core_1.Injectable },
    ];
    HotUpdater.ctorParameters = [
        { type: ionic_angular_1.Platform, },
        { type: dialog_1.Dialog, },
        { type: config_1.ConfigProvider, },
    ];
    return HotUpdater;
}());
exports.HotUpdater = HotUpdater;
//# sourceMappingURL=hot-updater.js.map