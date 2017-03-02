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
        this._managerInfo = { downloadList: [], downloadHistory: [] };
        if (platform.is('cordova')) {
            var rootPath = this.platform.is('android') ? cordova.file.externalApplicationStorageDirectory : cordova.file.documentsDirectory;
            this.downloadDirectory = rootPath + 'download/';
        }
    }
    Object.defineProperty(DownloadManagerController.prototype, "managerInfo", {
        get: function () {
            return this._managerInfo;
        },
        enumerable: true,
        configurable: true
    });
    DownloadManagerController.prototype.download = function (option) {
        if (!util_1.isPresent(option.filePath)) {
            option.filePath = '';
        }
        var filePath = this.downloadDirectory + option.filePath;
        var opt = { notificationId: 0, notification: false, fileName: option.fileName, filePath: filePath };
        var file = _.find(this._managerInfo.downloadList, { fileName: opt.fileName });
        if (util_1.isPresent(file)) {
            file.progress = 0;
        }
        else {
            file = { fileName: opt.fileName, filePath: opt.filePath, progress: 0 };
            this._managerInfo.downloadList.push(file);
        }
        var transfer = this.createTransfer(opt, file);
        return transfer.download(option.url, filePath + option.fileName).then(function (entry) {
            if (opt.notification) {
                local_notifications_1.ExtLocalNotifications.clear(opt.notificationId);
            }
        }).catch(function (e) {
            console.log(e);
        });
    };
    DownloadManagerController.prototype.createTransfer = function (opt, file) {
        var _this = this;
        var transfer = new ionic_native_1.Transfer();
        var first = true;
        transfer.onProgress(function (event) {
            if (first) {
                first = false;
                opt.notification = event.total > (1024 * 1024 * 5);
                if (opt.notification) {
                    opt.notificationId = _this.createNotifications();
                }
            }
            var progress = Math.round((event.loaded / event.total) * 100);
            if (progress > file.progress) {
                console.log(progress);
                file.progress = progress;
                if (util_1.isPresent(_this.pageChangeDetetorRef)) {
                    _this.pageChangeDetetorRef.detectChanges();
                }
                if (!first && opt.notification) {
                    _this.updateLocalNotifications(opt.notificationId, progress);
                }
            }
        });
        return transfer;
    };
    DownloadManagerController.prototype.createNotifications = function () {
        var num = Math.round((Math.random() * 1000));
        local_notifications_1.ExtLocalNotifications.schedule({
            id: num,
            title: '开始下载...',
            progress: this.platform.is('android'),
            maxProgress: 100,
            currentProgress: 0
        });
        return num;
    };
    DownloadManagerController.prototype.updateLocalNotifications = function (id, progress) {
        local_notifications_1.ExtLocalNotifications.update({
            id: id,
            title: '下载中...',
            progress: this.platform.is('android'),
            maxProgress: 100,
            currentProgress: progress,
            sound: null
        });
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