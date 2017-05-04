import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DownloadManagerCmp } from './download-manager-component';
import { DownloadManagerController } from './download-manager';
export { DownloadManagerController } from './download-manager';
var DownloadManagerModule = (function () {
    function DownloadManagerModule() {
    }
    DownloadManagerModule.forRoot = function () {
        return {
            ngModule: DownloadManagerModule,
            providers: [
                DownloadManagerController
            ]
        };
    };
    return DownloadManagerModule;
}());
export { DownloadManagerModule };
DownloadManagerModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    IonicModule
                ],
                declarations: [
                    DownloadManagerCmp
                ],
                exports: [
                    DownloadManagerCmp
                ],
                entryComponents: [
                    DownloadManagerCmp
                ]
            },] },
];
/** @nocollapse */
DownloadManagerModule.ctorParameters = function () { return []; };
//# sourceMappingURL=download-manager.module.js.map