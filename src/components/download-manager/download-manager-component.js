"use strict";
var core_1 = require('@angular/core');
var download_manager_1 = require('./download-manager');
var ionic_native_1 = require('ionic-native');
var _ = require('lodash');
var util_1 = require('../../utils/util');
var DownloadManagerCmp = (function () {
    function DownloadManagerCmp(downloadManagerCtl, ngZone) {
        this.downloadManagerCtl = downloadManagerCtl;
        this.ngZone = ngZone;
        this.segmentValue = 'downloading';
    }
    DownloadManagerCmp.prototype.ngOnInit = function () {
        this.destroy = false;
        this.downloadManager = { downloadingList: [], currentDirectory: null, fileList: [] };
        this.subscribe();
        this.loadFileList(this.downloadManagerCtl.downloadDirectory, null);
    };
    DownloadManagerCmp.prototype.ngOnDestroy = function () {
        this.destroy = true;
    };
    DownloadManagerCmp.prototype.subscribe = function () {
        var _this = this;
        this.downloadManagerCtl.event.subscribe(function (event) {
            if (_this.destroy)
                return;
            _this.update(event);
        });
    };
    DownloadManagerCmp.prototype.update = function (event) {
        var file = _.find(this.downloadManager.downloadingList, { fileName: event.fileName, filePath: event.filePath });
        if (util_1.isPresent(file)) {
            if (file.progress === 100) {
                file.progress = 0;
            }
            if (event.progress > file.progress) {
                file.progress = event.progress;
            }
            return;
        }
        this.downloadManager.downloadingList.push(event);
    };
    DownloadManagerCmp.prototype.ngOnChanges = function (changes) {
        console.log(changes);
    };
    DownloadManagerCmp.prototype.loadFileList = function (directoryPath, parent) {
        var _this = this;
        ionic_native_1.File.resolveDirectoryUrl(directoryPath).then(function (directory) {
            _this.downloadManager.currentDirectory = directory;
            _this.downloadManager.parentDirectory = parent;
            var reader = directory.createReader();
            _this.downloadManager.fileList.length = 0;
            reader.readEntries(function (entries) {
                _this.ngZone.run(function () {
                    entries.forEach(function (e) {
                        _this.downloadManager.fileList.push(e);
                    });
                });
            });
        });
    };
    DownloadManagerCmp.prototype.itemCheck = function (entry) {
        if (entry.isDirectory) {
            this.loadFileList(entry.nativeURL, this.downloadManager.currentDirectory);
        }
    };
    DownloadManagerCmp.prototype.backToParent = function (directory) {
        var _this = this;
        var paths = directory.nativeURL.split('/');
        paths.length = paths.length - 1;
        var parentPath = paths.join('/');
        if ((parentPath + '/') === this.downloadManagerCtl.downloadDirectory) {
            this.loadFileList(this.downloadManagerCtl.downloadDirectory, null);
            return;
        }
        ionic_native_1.File.resolveDirectoryUrl(parentPath).then(function (parentDirectory) {
            _this.loadFileList(directory.nativeURL, parentDirectory);
        });
    };
    DownloadManagerCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'page-download-file',
                    template: "\n    <ion-header>\n      <ion-navbar>\n        <ion-title>\u6587\u4EF6\u4E0B\u8F7D</ion-title>\n      </ion-navbar>\n      <ion-segment [(ngModel)]=\"segmentValue\">\n        <ion-segment-button value=\"downloading\">\u6B63\u5728\u4E0B\u8F7D</ion-segment-button>\n        <ion-segment-button value=\"history\">\u4E0B\u8F7D\u5386\u53F2</ion-segment-button>\n      </ion-segment>\n    </ion-header>\n    <ion-content>\n      <div [ngSwitch]=\"segmentValue\">\n        <ion-list *ngSwitchCase=\"'downloading'\" no-lines>\n          <ion-item *ngFor=\"let item of downloadManager.downloadingList\">\n            <div>{{item.fileName}}({{item.progress}}%)</div>\n            <div>\n              <progress value=\"{{item.progress}}\" max=\"100\"></progress>\n            </div>\n          </ion-item>\n        </ion-list>\n        <ion-list *ngSwitchCase=\"'history'\" no-lines>\n          <ion-item *ngIf=\"downloadManager.currentDirectory\">\n            \u5F53\u524D\u76EE\u5F55:{{downloadManager.currentDirectory.name}}\n          </ion-item>\n          <ion-item *ngIf=\"downloadManager.parentDirectory\" (click)=\"backToParent(downloadManager.parentDirectory)\">\n            \u56DE\u5230\u4E0A\u7EA7\u76EE\u5F55\n          </ion-item>\n          <ion-item *ngFor=\"let item of downloadManager.fileList\" (click)=\"itemCheck(item)\">\n            <ion-icon name=\"{{item.isFile ? 'document': 'folder'}}\" item-left></ion-icon>\n            {{item.name}}\n          </ion-item>\n        </ion-list>\n      </div>\n    </ion-content>\n  "
                },] },
    ];
    DownloadManagerCmp.ctorParameters = [
        { type: download_manager_1.DownloadManagerController, },
        { type: core_1.NgZone, },
    ];
    return DownloadManagerCmp;
}());
exports.DownloadManagerCmp = DownloadManagerCmp;
//# sourceMappingURL=download-manager-component.js.map