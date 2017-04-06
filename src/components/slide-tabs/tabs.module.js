"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ionic_angular_1 = require("ionic-angular");
const core_1 = require("@angular/core");
const tab_1 = require("./tab");
const tabs_1 = require("./tabs");
let TabsModule = TabsModule_1 = class TabsModule {
    static forRoot() {
        return {
            ngModule: TabsModule_1, providers: []
        };
    }
};
TabsModule = TabsModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            ionic_angular_1.IonicModule
        ],
        exports: [
            tab_1.TabCmp,
            tabs_1.TabsCmp
        ],
        declarations: [
            tab_1.TabCmp,
            tabs_1.TabsCmp
        ]
    })
], TabsModule);
exports.TabsModule = TabsModule;
var TabsModule_1;
//# sourceMappingURL=tabs.module.js.map