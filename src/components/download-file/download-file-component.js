"use strict";
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var download_file_1 = require('./download-file');
var _ = require('lodash');
var util_1 = require('../../utils/util');
var DownloadFileCmp = (function () {
    function DownloadFileCmp(events) {
        this.events = events;
        this.download = [];
        this.finish = [];
    }
    DownloadFileCmp.prototype.ngOnInit = function () {
        var me = this;
        this.events.subscribe(download_file_1.download_progress, function (opt) {
            console.log('opt');
            console.log(opt);
            var file = _.find(me.download, { fileName: opt.fileName });
            if (!util_1.isPresent(file)) {
                me.download.push(opt);
                return;
            }
            console.log('file');
            console.log(file);
            file.progress = opt.progress;
        });
    };
    DownloadFileCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'page-download-file',
                    template: "\n    <ion-header>\n      <ion-navbar>\n        <ion-title>\u6587\u4EF6\u4E0B\u8F7D</ion-title>\n      </ion-navbar>\n    </ion-header>\n    <ion-content>\n      <ion-list>\n        <ion-item *ngFor=\"let item of download\">\n          <div>{{item.fileName}}</div>\n          <div><ion-progress-bar [progress]=\"item.progress\"></ion-progress-bar></div>\n        </ion-item>\n      </ion-list>\n    </ion-content>\n  "
                },] },
    ];
    DownloadFileCmp.ctorParameters = [
        { type: ionic_angular_1.Events, },
    ];
    return DownloadFileCmp;
}());
exports.DownloadFileCmp = DownloadFileCmp;
//# sourceMappingURL=download-file-component.js.map