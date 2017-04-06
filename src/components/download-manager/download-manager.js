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
const core_1 = require("@angular/core");
const ionic_angular_1 = require("ionic-angular");
const transfer_1 = require("@ionic-native/transfer");
const local_notifications_1 = require("../../native/local-notifications");
const util_1 = require("../../utils/util");
const download_manager_component_1 = require("./download-manager-component");
let DownloadManagerController = class DownloadManagerController {
    constructor(platform, transfer, localNotifications, ngZone) {
        this.platform = platform;
        this.transfer = transfer;
        this.localNotifications = localNotifications;
        this.ngZone = ngZone;
        this._event = new core_1.EventEmitter(true);
        this.id = 999;
        this._rootDirectory = 'download/';
        if (platform.is('cordova')) {
            this._fileSystemRoot = this.platform.is('android') ? cordova.file.externalApplicationStorageDirectory : cordova.file.documentsDirectory;
        }
    }
    get event() {
        return this._event;
    }
    get downloadDirectory() {
        return this._fileSystemRoot + this._rootDirectory;
    }
    show(navCtrl) {
        navCtrl.push(download_manager_component_1.DownloadManagerCmp);
    }
    download(option) {
        if (!util_1.isPresent(option.filePath)) {
            option.filePath = '';
        }
        let filePath = this.downloadDirectory + option.filePath;
        let notificationId;
        let notification = false;
        let first = true;
        let downloadProgress = 0;
        let transfer = this.transfer.create();
        transfer.onProgress(event => {
            if (first) {
                first = false;
                notification = event.total > (1024 * 1024 * 5);
                if (notification) {
                    this.createNotification(option.fileName).then(id => {
                        notificationId = id;
                    });
                }
                return;
            }
            let progress = Math.round((event.loaded / event.total) * 100);
            if (progress > downloadProgress) {
                downloadProgress = progress;
                if (notification && notificationId) {
                    this.updateLocalNotification(option.fileName, notificationId, progress);
                }
                this.ngZone.run(() => {
                    this._event.emit({
                        progress: progress,
                        fileName: option.fileName,
                        filePath: filePath
                    });
                });
            }
        });
        let target = filePath + option.fileName;
        if (this.platform.is('ios')) {
            target = encodeURI(target);
        }
        return transfer.download(encodeURI(option.url), target).then(entry => {
            if (notification && notificationId) {
                this.localNotifications.clear(notificationId);
            }
            return entry;
        });
    }
    createId() {
        this.id++;
        return this.localNotifications.isScheduled(this.id).then(isScheduled => {
            if (isScheduled) {
                return this.createId();
            }
            ;
            return this.id;
        });
    }
    createNotification(fileName) {
        return this.createId().then(id => {
            this.localNotifications.schedule({
                id: id,
                title: fileName + ' 开始下载...',
                progress: this.platform.is('android'),
                maxProgress: 100,
                currentProgress: 0
            });
            return id;
        });
    }
    updateLocalNotification(fileName, id, progress) {
        this.localNotifications.update({
            id: id,
            title: fileName + '下载中...',
            progress: this.platform.is('android'),
            maxProgress: 100,
            currentProgress: progress,
            sound: null
        });
    }
};
DownloadManagerController = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ionic_angular_1.Platform,
        transfer_1.Transfer,
        local_notifications_1.ExtLocalNotifications,
        core_1.NgZone])
], DownloadManagerController);
exports.DownloadManagerController = DownloadManagerController;
//# sourceMappingURL=download-manager.js.map