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
var local_notifications_1 = require('../../native/local-notifications');
var util_1 = require('../../utils/util');
var download_manager_component_1 = require('./download-manager-component');
var DownloadManagerController = (function () {
    function DownloadManagerController(platform, ngZone) {
        this.platform = platform;
        this.ngZone = ngZone;
        this._event = new core_1.EventEmitter(true);
        this.id = 999;
        this._rootDirectory = 'download/';
        if (platform.is('cordova')) {
            this._fileSystemRoot = this.platform.is('android') ? cordova.file.externalApplicationStorageDirectory : cordova.file.documentsDirectory;
        }
    }
    Object.defineProperty(DownloadManagerController.prototype, "event", {
        get: function () {
            return this._event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DownloadManagerController.prototype, "downloadDirectory", {
        get: function () {
            return this._fileSystemRoot + this._rootDirectory;
        },
        enumerable: true,
        configurable: true
    });
    DownloadManagerController.prototype.show = function (navCtrl) {
        navCtrl.push(download_manager_component_1.DownloadManagerCmp);
    };
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
                if (notification && notificationId) {
                    _this.updateLocalNotification(option.fileName, notificationId, progress);
                }
                _this.ngZone.run(function () {
                    _this._event.emit({
                        progress: progress,
                        fileName: option.fileName,
                        filePath: filePath
                    });
                });
            }
        });
        return transfer.download(option.url, filePath + option.fileName).then(function (entry) {
            if (notification && notificationId) {
                local_notifications_1.ExtLocalNotifications.clear(notificationId);
            }
            return entry;
        });
    };
    DownloadManagerController.prototype.createId = function () {
        var _this = this;
        this.id++;
        return local_notifications_1.ExtLocalNotifications.isScheduled(this.id).then(function (isScheduled) {
            if (isScheduled) {
                return _this.createId();
            }
            ;
            return _this.id;
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
    DownloadManagerController = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ionic_angular_1.Platform, core_1.NgZone])
    ], DownloadManagerController);
    return DownloadManagerController;
}());
exports.DownloadManagerController = DownloadManagerController;
//# sourceMappingURL=download-manager.js.map