"use strict";
var core_1 = require('@angular/core');
var _ = require('lodash');
var download_manager_1 = require('./download-manager');
var util_1 = require('../../utils/util');
var DownloadManagerCmp = (function () {
    function DownloadManagerCmp(downloadManagerCtl, changeDetectorRef) {
        this.downloadManagerCtl = downloadManagerCtl;
        this.changeDetectorRef = changeDetectorRef;
        this.segmentValue = 'downloading';
    }
    DownloadManagerCmp.prototype.ngOnInit = function () {
        this.destroy = false;
        this.downloadManager = { downloadingList: [] };
        this.subscribe();
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
            _this.changeDetectorRef.detectChanges();
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
    DownloadManagerCmp.prototype.segmentChange = function () {
    };
    DownloadManagerCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'page-download-file',
                    template: "\n    <ion-header>\n      <ion-navbar>\n        <ion-title>\u6587\u4EF6\u4E0B\u8F7D</ion-title>\n      </ion-navbar>\n      <ion-segment [(ngModel)]=\"segmentValue\" (ionChange)=\"segmentChange()\">\n        <ion-segment-button value=\"'downloading'\">\u6B63\u5728\u4E0B\u8F7D</ion-segment-button>\n        <ion-segment-button value=\"'history'\">\u4E0B\u8F7D\u5386\u53F2</ion-segment-button>\n      </ion-segment>\n    </ion-header>\n    <ion-content>\n      <div [ngSwitch]=\"segmentValue\">\n        <ion-list *ngSwitchCase=\"'downloading'\">\n          <ion-item *ngFor=\"let item of downloadManager.downloadingList\">\n            <div>{{item.fileName}}({{item.progress}}%)</div>\n            <div>\n              <progress value=\"{{item.progress}}\" max=\"100\"></progress>\n            </div>\n          </ion-item>\n        </ion-list>\n        <ion-list *ngSwitchCase=\"'history'\">\n          <ion-item *ngFor=\"let item of downloadManager.downloadingList\">\n            <div>{{item.fileName}}({{item.progress}}%)</div>\n            <div>\n              <progress value=\"{{item.progress}}\" max=\"100\"></progress>\n            </div>\n          </ion-item>\n        </ion-list>\n      </div>\n    </ion-content>\n  "
                },] },
    ];
    DownloadManagerCmp.ctorParameters = [
        { type: download_manager_1.DownloadManagerController, },
        { type: core_1.ChangeDetectorRef, },
    ];
    return DownloadManagerCmp;
}());
exports.DownloadManagerCmp = DownloadManagerCmp;
//# sourceMappingURL=download-manager-component.js.map