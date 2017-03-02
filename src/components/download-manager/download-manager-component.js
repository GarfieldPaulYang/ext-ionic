"use strict";
var core_1 = require('@angular/core');
var download_manager_1 = require('./download-manager');
var DownloadManagerCmp = (function () {
    function DownloadManagerCmp(downloadManagerCtl, changeDetectorRef) {
        this.downloadManagerCtl = downloadManagerCtl;
        this.changeDetectorRef = changeDetectorRef;
        this.downloadManagerCtl.pageChangeDetetorRef = changeDetectorRef;
        this.downloadManagerInfo = this.downloadManagerCtl.managerInfo;
    }
    DownloadManagerCmp.prototype.ngOnDestroy = function () {
        this.downloadManagerCtl.pageChangeDetetorRef = null;
    };
    DownloadManagerCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'page-download-file',
                    template: "\n    <ion-header>\n      <ion-navbar>\n        <ion-title>\u6587\u4EF6\u4E0B\u8F7D</ion-title>\n      </ion-navbar>\n    </ion-header>\n    <ion-content>\n      <ion-list>\n        <ion-item *ngFor=\"let item of downloadManagerInfo.downloadList\">\n          <div>{{item.fileName}}</div>\n          <div>\n            <progress value=\"{{item.progress}}\" max=\"100\"></progress>\n          </div>\n        </ion-item>\n      </ion-list>\n    </ion-content>\n  "
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