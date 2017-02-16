"use strict";
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var local_notifications_1 = require('../native/local-notifications');
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
        if (!this.config.get().hotUpdateUrl) {
            return;
        }
        document.addEventListener('chcp_updateInstalled', function (eventData) {
            _this.dialog.toast('程序已更新完成，重启后生效...');
        }, false);
        document.addEventListener('chcp_updateLoadFailed', function (eventData) {
            var error = eventData['detail'].error;
            if (error && error.code === window['chcp'].error.APPLICATION_BUILD_VERSION_TOO_LOW) {
                var isAndroid_1 = _this.platform.is('android');
                if (!isAndroid_1) {
                    return;
                }
                var targetPath = cordova.file.externalApplicationStorageDirectory + '/app/app.apk';
                _this.dialog.confirm('更新通知', '发现新版本,是否现在更新?', function () {
                    local_notifications_1.ExtLocalNotifications.schedule({
                        id: 1000,
                        title: '正在更新...',
                        text: isAndroid_1 ? '' : '已经完成 0%',
                        progress: isAndroid_1,
                        maxProgress: 100,
                        currentProgress: 0
                    });
                    var transfer = new ionic_native_1.Transfer();
                    transfer.onProgress(function (event) {
                        var progress = ((event.loaded / event.total) * 100).toFixed(2);
                        local_notifications_1.ExtLocalNotifications.update({
                            id: 1000,
                            title: '正在更新...',
                            text: isAndroid_1 ? '' : "\u5DF2\u7ECF\u5B8C\u6210 " + progress + "%",
                            progress: isAndroid_1,
                            maxProgress: 100,
                            currentProgress: Number(progress)
                        });
                    });
                    transfer.download(_this.config.get().hotUpdateUrl, targetPath).then(function () {
                        local_notifications_1.ExtLocalNotifications.clear(1000);
                        ionic_native_1.FileOpener.open(targetPath, 'application/vnd.android.package-archive');
                    });
                });
            }
        }, false);
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