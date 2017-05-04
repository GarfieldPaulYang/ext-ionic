import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { OpenUrlModalCmp } from './open-url-modal-component';
import { OpenUrlModalController } from './open-url-modal';
export { OpenUrlModalController } from './open-url-modal';
var OpenUrlModalModule = (function () {
    function OpenUrlModalModule() {
    }
    OpenUrlModalModule.forRoot = function () {
        return {
            ngModule: OpenUrlModalModule,
            providers: [
                OpenUrlModalController
            ]
        };
    };
    return OpenUrlModalModule;
}());
export { OpenUrlModalModule };
OpenUrlModalModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    IonicModule
                ],
                declarations: [
                    OpenUrlModalCmp
                ],
                exports: [
                    OpenUrlModalCmp
                ],
                entryComponents: [
                    OpenUrlModalCmp
                ]
            },] },
];
/** @nocollapse */
OpenUrlModalModule.ctorParameters = function () { return []; };
//# sourceMappingURL=open-url-modal.module.js.map