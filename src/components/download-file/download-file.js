"use strict";
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var local_notifications_1 = require('../../native/local-notifications');
exports.download_start = 'download_start';
exports.download_progress = 'download_progress';
exports.download_end = 'download_end';
var DownloadFileController = (function () {
    function DownloadFileController(platform, events) {
        this.platform = platform;
        this.events = events;
        if (platform.is('cordova')) {
            var rootPath = this.platform.is('android') ? cordova.file.externalApplicationStorageDirectory : cordova.file.documentsDirectory;
            this.downloadDirectory = rootPath + 'download';
        }
    }
    DownloadFileController.prototype.download = function (option) {
        var _this = this;
        var hasNtFcns = false;
        var transfer = this.createTransfer(hasNtFcns, option.fileName);
        var filePath = this.downloadDirectory + option.filePath + '/' + option.fileName;
        return transfer.download(option.url, filePath).then(function (entry) {
            if (hasNtFcns) {
                local_notifications_1.ExtLocalNotifications.clear(1000);
            }
            _this.events.publish(exports.download_end, option);
        });
    };
    DownloadFileController.prototype.createTransfer = function (hasNtFcns, fileName) {
        var _this = this;
        var transfer = new ionic_native_1.Transfer();
        var hasFirst = true;
        transfer.onProgress(function (event) {
            if (hasFirst) {
                _this.events.publish(exports.download_start, fileName);
                hasNtFcns = event.total > (1024 * 1024 * 5);
                local_notifications_1.ExtLocalNotifications.schedule({
                    id: 1000,
                    title: '开始下载...',
                    progress: _this.platform.is('android'),
                    maxProgress: 100,
                    currentProgress: 0
                });
            }
            hasFirst = false;
            var progress = Math.round((event.loaded / event.total) * 100);
            if (!hasFirst && hasNtFcns) {
                local_notifications_1.ExtLocalNotifications.update({
                    id: 1000,
                    title: '下载中...',
                    progress: _this.platform.is('android'),
                    maxProgress: 100,
                    currentProgress: progress,
                    sound: null
                });
            }
            var param = { fileName: fileName, progress: progress };
            _this.events.publish(exports.download_progress, param);
        });
        return transfer;
    };
    DownloadFileController.decorators = [
        { type: core_1.Injectable },
    ];
    DownloadFileController.ctorParameters = [
        { type: ionic_angular_1.Platform, },
        { type: ionic_angular_1.Events, },
    ];
    return DownloadFileController;
}());
exports.DownloadFileController = DownloadFileController;
//# sourceMappingURL=download-file.js.map