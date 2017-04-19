"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const ionic_angular_1 = require("ionic-angular");
const super_tab_1 = require("./components/super-tab/super-tab");
const super_tabs_1 = require("./components/super-tabs/super-tabs");
const super_tabs_controller_1 = require("./providers/super-tabs-controller");
const super_tabs_toolbar_1 = require("./components/super-tabs-toolbar/super-tabs-toolbar");
const super_tabs_container_1 = require("./components/super-tabs-container/super-tabs-container");
let SuperTabsModule = SuperTabsModule_1 = class SuperTabsModule {
    static forRoot() {
        return {
            ngModule: SuperTabsModule_1,
            providers: [
                super_tabs_controller_1.SuperTabsController
            ]
        };
    }
};
SuperTabsModule = SuperTabsModule_1 = __decorate([
    core_1.NgModule({
        declarations: [
            super_tab_1.SuperTab,
            super_tabs_1.SuperTabs,
            super_tabs_toolbar_1.SuperTabsToolbar,
            super_tabs_container_1.SuperTabsContainer
        ],
        imports: [
            ionic_angular_1.IonicModule
        ],
        exports: [
            super_tab_1.SuperTab,
            super_tabs_1.SuperTabs
        ]
    })
], SuperTabsModule);
exports.SuperTabsModule = SuperTabsModule;
var SuperTabsModule_1;
//# sourceMappingURL=super-tabs.module.js.map