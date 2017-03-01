"use strict";
var core_1 = require('@angular/core');
var download_manager_1 = require('./download-manager');
var DownloadManagerCmp = (function () {
    function DownloadManagerCmp(downloadManagerCtl) {
        this.downloadManagerCtl = downloadManagerCtl;
        this.lownloadList = this.downloadManagerCtl.lownloadList;
    }
    DownloadManagerCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'page-download-file',
                    template: "\n    <ion-header>\n      <ion-navbar>\n        <ion-title>\u6587\u4EF6\u4E0B\u8F7D</ion-title>\n      </ion-navbar>\n    </ion-header>\n    <ion-content>\n      <ion-list>\n        <ion-item *ngFor=\"let item of lownloadList\">\n          <div>{{item.fileName}}</div>\n          <div><ion-progress-bar [progress]=\"item.progress\"></ion-progress-bar></div>\n        </ion-item>\n      </ion-list>\n    </ion-content>\n  "
                },] },
    ];
    DownloadManagerCmp.ctorParameters = [
        { type: download_manager_1.DownloadManagerController, },
    ];
    return DownloadManagerCmp;
}());
exports.DownloadManagerCmp = DownloadManagerCmp;
//# sourceMappingURL=download-manager-component.js.map