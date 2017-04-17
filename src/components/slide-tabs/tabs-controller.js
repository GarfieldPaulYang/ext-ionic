"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let SlideTabsController = class SlideTabsController {
    setBadge(tabId, value) {
    }
    clearBadge(tabId) {
    }
    increaseBadge(tabId, increaseBy = 1) {
    }
    decreaseBadge(tabId, decreaseBy = 1) {
    }
    enableSwipe(tabsId, enable) {
    }
    enableSwipePerTab(tabsId, tabId, enable) {
    }
    /**
     * Enable or disable a tab. This will add/remove the tab from DOM.
     * @param tabsId
     * @param tabId
     * @param enable
     */
    enableTab(tabsId, tabId, enable) {
    }
};
SlideTabsController = __decorate([
    core_1.Injectable()
], SlideTabsController);
exports.SlideTabsController = SlideTabsController;
//# sourceMappingURL=tabs-controller.js.map