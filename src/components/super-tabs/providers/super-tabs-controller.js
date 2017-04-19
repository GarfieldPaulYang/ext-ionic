"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let SuperTabsController = class SuperTabsController {
    constructor() {
        this.instances = [];
    }
    setBadge(tabId, value, tabsId) {
        const instance = this.getInstance(tabsId);
        instance && instance.setBadge(tabId, value);
    }
    clearBadge(tabId, tabsId) {
        const instance = this.getInstance(tabsId);
        instance && instance.clearBadge(tabId);
    }
    increaseBadge(tabId, increaseBy = 1, tabsId) {
        const instance = this.getInstance(tabsId);
        instance && instance.increaseBadge(tabId, increaseBy);
    }
    decreaseBadge(tabId, decreaseBy = 1, tabsId) {
        const instance = this.getInstance(tabsId);
        instance && instance.decreaseBadge(tabId, decreaseBy);
    }
    /**
     * Enables/disables swiping on a specific tabs instance
     * @param enable
     * @param [tabsId]
     */
    enableTabsSwipe(enable, tabsId) {
        const instance = this.getInstance(tabsId);
        instance && instance.enableTabsSwipe(enable);
    }
    /**
     * Enables/disables swiping when this tab is active
     * @param tabId
     * @param enable
     * @param [tabsId]
     */
    enableTabSwipe(tabId, enable, tabsId) {
        const instance = this.getInstance(tabsId);
        instance && instance.enableTabSwipe(tabId, enable);
    }
    showToolbar(show, tabsId) {
        const instance = this.getInstance(tabsId);
        instance && instance.showToolbar(show);
    }
    slideTo(tabIndexOrId, tabsId) {
        const instance = this.getInstance(tabsId);
        instance && instance.slideTo(tabIndexOrId);
    }
    /**
     * @private
     */
    registerInstance(instance) {
        this.instances.push(instance);
    }
    /**
     * @private
     */
    unregisterInstance(id) {
        const instanceIndex = this.getInstanceIndex(id);
        if (instanceIndex > -1)
            this.instances.splice(instanceIndex, 1);
    }
    getInstanceIndex(id) {
        return this.instances.findIndex((instance) => instance.id === id);
    }
    getInstance(id) {
        return (!!id && this.instances[this.getInstanceIndex(id)]) || this.instances[0];
    }
};
SuperTabsController = __decorate([
    core_1.Injectable()
], SuperTabsController);
exports.SuperTabsController = SuperTabsController;
//# sourceMappingURL=super-tabs-controller.js.map