import { Injectable, EventEmitter, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Transfer } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { ExtLocalNotifications } from '../../native/local-notifications';
import { isPresent } from '../../utils/util';
import { DownloadManagerCmp } from './download-manager-component';
var DownloadManagerController = (function () {
    function DownloadManagerController(platform, transfer, file, localNotifications, ngZone) {
        this.platform = platform;
        this.transfer = transfer;
        this.file = file;
        this.localNotifications = localNotifications;
        this.ngZone = ngZone;
        this._event = new EventEmitter(true);
        this.id = 999;
        this._rootDirectory = 'download/';
        if (platform.is('cordova')) {
            this._fileSystemRoot = this.platform.is('android') ? this.file.externalApplicationStorageDirectory : this.file.documentsDirectory;
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
        navCtrl.push(DownloadManagerCmp);
    };
    DownloadManagerController.prototype.download = function (option) {
        var _this = this;
        if (!isPresent(option.filePath)) {
            option.filePath = '';
        }
        var filePath = this.downloadDirectory + option.filePath;
        var notificationId;
        var notification = false;
        var first = true;
        var downloadProgress = 0;
        var transfer = this.transfer.create();
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
        var target = filePath + option.fileName;
        if (this.platform.is('ios')) {
            target = encodeURI(target);
        }
        return transfer.download(encodeURI(option.url), target).then(function (entry) {
            if (notification && notificationId) {
                _this.localNotifications.clear(notificationId);
            }
            return entry;
        });
    };
    DownloadManagerController.prototype.createId = function () {
        var _this = this;
        this.id++;
        return this.localNotifications.isScheduled(this.id).then(function (isScheduled) {
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
            _this.localNotifications.schedule({
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
        this.localNotifications.update({
            id: id,
            title: fileName + '下载中...',
            progress: this.platform.is('android'),
            maxProgress: 100,
            currentProgress: progress,
            sound: null
        });
    };
    return DownloadManagerController;
}());
export { DownloadManagerController };
DownloadManagerController.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DownloadManagerController.ctorParameters = function () { return [
    { type: Platform, },
    { type: Transfer, },
    { type: File, },
    { type: ExtLocalNotifications, },
    { type: NgZone, },
]; };
//# sourceMappingURL=download-manager.js.map