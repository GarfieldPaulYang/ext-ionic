import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NavButtonBar } from './nav-button-bar';
var NavButtonBarModule = (function () {
    function NavButtonBarModule() {
    }
    NavButtonBarModule.forRoot = function () {
        return {
            ngModule: NavButtonBarModule, providers: []
        };
    };
    return NavButtonBarModule;
}());
export { NavButtonBarModule };
NavButtonBarModule.decorators = [
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
NavButtonBarModule.ctorParameters = function () { return []; };
//# sourceMappingURL=nav-button-bar.module.js.map