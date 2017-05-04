import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NavButtonBar } from './nav-button';
var NavButtonModule = (function () {
    function NavButtonModule() {
    }
    NavButtonModule.forRoot = function () {
        return {
            ngModule: NavButtonModule, providers: []
        };
    };
    return NavButtonModule;
}());
export { NavButtonModule };
NavButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    IonicModule
                ],
                exports: [
                    NavButtonBar
                ],
                declarations: [
                    NavButtonBar
                ]
            },] },
];
/** @nocollapse */
NavButtonModule.ctorParameters = function () { return []; };
//# sourceMappingURL=nav-button.module.js.map