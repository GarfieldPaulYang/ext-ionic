import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Transfer } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { HotCodePush } from '../native/hot-code-push';
import { ConfigProvider } from '../config/config';
import { Dialog } from '../utils/dialog';
import { ExtLocalNotifications } from '../native/local-notifications';
var HotUpdater = (function () {
    function HotUpdater(platform, dialog, config, hotCodePush, localNotifications, transfer, file, fileOpener) {
        this.platform = platform;
        this.dialog = dialog;
        this.config = config;
        this.hotCodePush = hotCodePush;
        this.localNotifications = localNotifications;
        this.transfer = transfer;
        this.file = file;
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
                if (error.code === HotCodePush.error.APPLICATION_BUILD_VERSION_TOO_LOW) {
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
        var targetPath = this.file.externalApplicationStorageDirectory + '/app/app.apk';
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
export { HotUpdater };
HotUpdater.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HotUpdater.ctorParameters = function () { return [
    { type: Platform, },
    { type: Dialog, },
    { type: ConfigProvider, },
    { type: HotCodePush, },
    { type: ExtLocalNotifications, },
    { type: Transfer, },
    { type: File, },
    { type: FileOpener, },
]; };
//# sourceMappingURL=hot-updater.js.map