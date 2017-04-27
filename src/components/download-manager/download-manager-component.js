import { Component, NgZone } from '@angular/core';
import { DownloadManagerController } from './download-manager';
import { File } from '@ionic-native/file';
import * as _ from 'lodash';
import { isPresent } from '../../utils/util';
var DownloadManagerCmp = (function () {
    function DownloadManagerCmp(downloadManagerCtl, file, ngZone) {
        this.downloadManagerCtl = downloadManagerCtl;
        this.file = file;
        this.ngZone = ngZone;
        this.segmentValue = 'downloading';
    }
    DownloadManagerCmp.prototype.ngOnInit = function () {
        this.destroy = false;
        this.downloadManager = { downloadingList: [], fileList: [] };
        this.subscribe();
        this.breadcrumbs = [];
        this.loadFileList(this.downloadManagerCtl.downloadDirectory, true);
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
        if (isPresent(file)) {
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
    DownloadManagerCmp.prototype.loadFileList = function (directoryPath, push) {
        var _this = this;
        this.file.resolveDirectoryUrl(directoryPath).then(function (directory) {
            if (push) {
                _this.breadcrumbs.push(directory);
            }
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
            this.loadFileList(entry.nativeURL, true);
        }
    };
    DownloadManagerCmp.prototype.breadcrubCheck = function (entry) {
        var index = _.findIndex(this.breadcrumbs, { fullPath: entry.fullPath });
        if (this.breadcrumbs.length - 1 !== index) {
            this.breadcrumbs.length = index + 1;
        }
        this.loadFileList(entry.nativeURL, false);
    };
    return DownloadManagerCmp;
}());
export { DownloadManagerCmp };
DownloadManagerCmp.decorators = [
    { type: Component, args: [{
                selector: 'page-download-file',
                styles: ["\n    .breadcrumb{\n      display: flex;\n      flex-direction: row;\n      list-style:none;\n      padding-left: 10px;\n    }\n    .breadcrumb ion-icon{\n      padding-left: 5px;\n      padding-right: 5px;\n      font-size: 1em;\n    }\n  "],
                template: "\n    <ion-header>\n      <ion-navbar>\n        <ion-title>\u6587\u4EF6\u4E0B\u8F7D</ion-title>\n      </ion-navbar>\n      <ion-segment [(ngModel)]=\"segmentValue\">\n        <ion-segment-button value=\"downloading\">\u6B63\u5728\u4E0B\u8F7D</ion-segment-button>\n        <ion-segment-button value=\"history\">\u4E0B\u8F7D\u5386\u53F2</ion-segment-button>\n      </ion-segment>\n    </ion-header>\n    <ion-content>\n      <div [ngSwitch]=\"segmentValue\">\n        <ion-list *ngSwitchCase=\"'downloading'\">\n          <ion-item *ngFor=\"let item of downloadManager.downloadingList\">\n            <div>{{item.fileName}}({{item.progress}}%)</div>\n            <div>\n              <progress value=\"{{item.progress}}\" max=\"100\"></progress>\n            </div>\n          </ion-item>\n        </ion-list>\n        <ion-list *ngSwitchCase=\"'history'\">\n          <ul class=\"breadcrumb\">\n            <li *ngFor=\"let item of breadcrumbs; let last = last\" (click)=\"breadcrubCheck(item)\">\n              <a>{{item.name}}</a><ion-icon *ngIf=\"!last\" name=\"ios-arrow-forward-outline\"></ion-icon>\n            </li>\n          </ul>\n          <ion-item-divider *ngFor=\"let item of downloadManager.fileList\" (click)=\"itemCheck(item)\">\n            <ion-icon name=\"{{item.isFile ? 'document': 'folder'}}\" item-left></ion-icon>\n            {{item.name}}\n            <ion-icon *ngIf=\"!last\" name=\"ios-arrow-forward-outline\" item-right></ion-icon>\n          </ion-item-divider>\n        </ion-list>\n      </div>\n    </ion-content>\n  "
            },] },
];
/** @nocollapse */
DownloadManagerCmp.ctorParameters = function () { return [
    { type: DownloadManagerController, },
    { type: File, },
    { type: NgZone, },
]; };
//# sourceMappingURL=download-manager-component.js.map