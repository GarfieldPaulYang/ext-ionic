import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SuperTab } from './components/super-tab/super-tab';
import { SuperTabs } from './components/super-tabs/super-tabs';
import { SuperTabsController } from './providers/super-tabs-controller';
import { SuperTabsToolbar } from './components/super-tabs-toolbar/super-tabs-toolbar';
import { SuperTabsContainer } from './components/super-tabs-container/super-tabs-container';
var SuperTabsModule = (function () {
    function SuperTabsModule() {
    }
    SuperTabsModule.forRoot = function () {
        return {
            ngModule: SuperTabsModule,
            providers: [
                SuperTabsController
            ]
        };
    };
    return SuperTabsModule;
}());
export { SuperTabsModule };
SuperTabsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    SuperTab,
                    SuperTabs,
                    SuperTabsToolbar,
                    SuperTabsContainer
                ],
                imports: [
                    IonicModule
                ],
                exports: [
                    SuperTab,
                    SuperTabs
                ]
            },] },
];
/** @nocollapse */
SuperTabsModule.ctorParameters = function () { return []; };
//# sourceMappingURL=super-tabs.module.js.map