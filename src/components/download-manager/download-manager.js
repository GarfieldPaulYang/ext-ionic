"use strict";
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var _ = require('lodash');
var local_notifications_1 = require('../../native/local-notifications');
var util_1 = require('../../utils/util');
var DownloadManagerController = (function () {
    function DownloadManagerController(platform) {
        this.platform = platform;
        this.lownloadList = [];
        if (platform.is('cordova')) {
            var rootPath = this.platform.is('android') ? cordova.file.externalApplicationStorageDirectory : cordova.file.documentsDirectory;
            this.downloadDirectory = rootPath + 'download/';
        }
    }
    DownloadManagerController.prototype.download = function (option) {
        if (!util_1.isPresent(option.filePath)) {
            option.filePath = '';
        }
        var filePath = this.downloadDirectory + option.filePath;
        var opt = { hasNtFcns: false, fileName: option.fileName, filePath: filePath };
        var transfer = this.createTransfer(opt);
        return transfer.download(option.url, filePath + option.fileName).then(function (entry) {
            if (opt.hasNtFcns) {
                local_notifications_1.ExtLocalNotifications.clear(1000);
            }
        });
    };
    DownloadManagerController.prototype.createTransfer = function (opt) {
        var _this = this;
        var transfer = new ionic_native_1.Transfer();
        var hasFirst = true;
        transfer.onProgress(function (event) {
            if (hasFirst) {
                opt.hasNtFcns = event.total > (1024 * 1024 * 5);
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
            if (!hasFirst && opt.hasNtFcns) {
                local_notifications_1.ExtLocalNotifications.update({
                    id: 1000,
                    title: '下载中...',
                    progress: _this.platform.is('android'),
                    maxProgress: 100,
                    currentProgress: progress,
                    sound: null
                });
            }
            var file = _.find(_this.lownloadList, { fileName: opt.fileName });
            if (!util_1.isPresent(file)) {
                _this.lownloadList.push({ fileName: opt.fileName, filePath: opt.filePath, progress: progress });
                return;
            }
            file.progress = progress;
        });
        return transfer;
    };
    DownloadManagerController.decorators = [
        { type: core_1.Injectable },
    ];
    DownloadManagerController.ctorParameters = [
        { type: ionic_angular_1.Platform, },
    ];
    return DownloadManagerController;
}());
exports.DownloadManagerController = DownloadManagerController;
//# sourceMappingURL=download-manager.js.map