"use strict";
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var ionic_native_1 = require('ionic-native');
var local_notifications_1 = require('../../native/local-notifications');
var util_1 = require('../../utils/util');
var DownloadManagerController = (function () {
    function DownloadManagerController(platform) {
        this.platform = platform;
        this._event = new core_1.EventEmitter(true);
        this.idIndex = 999;
        if (platform.is('cordova')) {
            var rootPath = this.platform.is('android') ? cordova.file.externalApplicationStorageDirectory : cordova.file.documentsDirectory;
            this.downloadDirectory = rootPath + 'download/';
        }
    }
    Object.defineProperty(DownloadManagerController.prototype, "event", {
        get: function () {
            return this._event;
        },
        enumerable: true,
        configurable: true
    });
    DownloadManagerController.prototype.download = function (option) {
        var _this = this;
        if (!util_1.isPresent(option.filePath)) {
            option.filePath = '';
        }
        var filePath = this.downloadDirectory + option.filePath;
        var notificationId;
        var notification = false;
        var first = true;
        var downloadProgress = 0;
        var transfer = new ionic_native_1.Transfer();
        transfer.onProgress(function (event) {
            if (first) {
                first = false;
                notification = event.total > (1024 * 1024 * 5);
                if (notification) {
                    _this.createNotification(option.fileName).then(function (id) {
                        notificationId = id;
                    });
                }
                return;
            }
            var progress = Math.round((event.loaded / event.total) * 100);
            if (progress > downloadProgress) {
                downloadProgress = progress;
                if (notification && util_1.isPresent(notificationId)) {
                    _this.updateLocalNotification(option.fileName, notificationId, progress);
                }
                _this._event.emit({
                    progress: progress,
                    fileName: option.fileName,
                    filePath: filePath
                });
            }
        });
        return transfer.download(option.url, filePath + option.fileName).then(function (entry) {
            if (notification && util_1.isPresent(notificationId)) {
                local_notifications_1.ExtLocalNotifications.clear(notificationId);
            }
        });
    };
    DownloadManagerController.prototype.createId = function () {
        var _this = this;
        this.idIndex++;
        return local_notifications_1.ExtLocalNotifications.isScheduled(this.idIndex).then(function (isScheduled) {
            if (isScheduled) {
                return _this.createId();
            }
            ;
            return _this.idIndex;
        });
    };
    DownloadManagerController.prototype.createNotification = function (fileName) {
        var _this = this;
        return this.createId().then(function (id) {
            local_notifications_1.ExtLocalNotifications.schedule({
                id: id,
                title: fileName + ' 开始下载...',
                progress: _this.platform.is('android'),
                maxProgress: 100,
                currentProgress: 0
            });
            return id;
        });
    };
    DownloadManagerController.prototype.updateLocalNotification = function (fileName, id, progress) {
        local_notifications_1.ExtLocalNotifications.update({
            id: id,
            title: fileName + '下载中...',
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