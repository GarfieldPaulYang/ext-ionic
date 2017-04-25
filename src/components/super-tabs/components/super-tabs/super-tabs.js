"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const ionic_angular_1 = require("ionic-angular");
const Observable_1 = require("rxjs/Observable");
const super_tabs_toolbar_1 = require("../super-tabs-toolbar/super-tabs-toolbar");
const super_tabs_container_1 = require("../super-tabs-container/super-tabs-container");
const super_tabs_controller_1 = require("../../providers/super-tabs-controller");
let SuperTabs = SuperTabs_1 = class SuperTabs {
    constructor(parent, viewCtrl, _app, el, rnd, superTabsCtrl, linker, domCtrl) {
        this.viewCtrl = viewCtrl;
        this._app = _app;
        this.el = el;
        this.rnd = rnd;
        this.superTabsCtrl = superTabsCtrl;
        this.linker = linker;
        this.domCtrl = domCtrl;
        /**
         * Color of the slider that moves based on what tab is selected
         */
        this.indicatorColor = 'primary';
        /**
         * Badge color
         */
        this.badgeColor = 'primary';
        /**
         * Configuration
         */
        this.config = {};
        this.tabsPlacement = 'top';
        this.tabSelect = new core_1.EventEmitter();
        /**
         * @private
         */
        this.isToolbarVisible = true;
        /**
         * @private
         */
        this._tabs = [];
        this._scrollTabs = false;
        this._selectedTabIndex = 0;
        this.watches = [];
        this.hasIcons = false;
        this.hasTitles = false;
        this.init = false;
        this.parent = parent;
        if (this.parent) {
            this.parent.registerChildNav(this);
        }
        else if (viewCtrl && viewCtrl.getNav()) {
            this.parent = viewCtrl.getNav();
            this.parent.registerChildNav(this);
        }
        else if (this._app) {
            this._app._setRootNav(this);
        }
        if (viewCtrl) {
            viewCtrl._setContent(this);
            viewCtrl._setContentRef(el);
        }
        // re-adjust the height of the slider when the orientation changes
        this.watches.push(Observable_1.Observable.merge(Observable_1.Observable.fromEvent(window, 'orientationchange'), Observable_1.Observable.fromEvent(window, 'resize')).debounceTime(10).subscribe(() => {
            this.updateTabWidth();
            this.setFixedIndicatorWidth();
            this.tabsContainer.refreshDimensions();
            this.tabsContainer.slideTo(this.selectedTabIndex);
            this.alignIndicatorPosition();
            this.refreshTabWidths();
            this.refreshContainerHeight();
        }));
    }
    /**
     * Height of the tabs
     */
    set height(val) {
        this.rnd.setStyle(this.el.nativeElement, 'height', val + 'px');
    }
    get height() {
        return this.el.nativeElement.offsetHeight;
    }
    /**
     * The initial selected tab index
     * @param val {number} tab index
     */
    set selectedTabIndex(val) {
        this._selectedTabIndex = Number(val);
        this.init && this.alignIndicatorPosition(true);
    }
    get selectedTabIndex() {
        return this._selectedTabIndex;
    }
    set scrollTabs(val) {
        this._scrollTabs = typeof val !== 'boolean' || val === true;
    }
    get scrollTabs() {
        return this._scrollTabs;
    }
    ngOnInit() {
        const defaultConfig = {
            dragThreshold: 10,
            maxDragAngle: 40,
            sideMenuThreshold: 50,
            transitionDuration: 300,
            transitionEase: 'cubic-bezier(0.35, 0, 0.25, 1)',
            shortSwipeDuration: 300
        };
        this.config = Object.assign({}, defaultConfig, this.config);
        this.id = this.id || `ion-super-tabs-${++superTabsIds}`;
        this.superTabsCtrl.registerInstance(this);
        if (this.tabsPlacement === 'bottom') {
            this.rnd.addClass(this.getElementRef().nativeElement, 'tabs-placement-bottom');
        }
    }
    ngAfterContentInit() {
        this.updateTabWidth();
        this.toolbar.tabs = this._tabs;
        this.tabsContainer.tabs = this._tabs;
    }
    ngAfterViewInit() {
        const tabsSegment = this.linker.initNav(this);
        if (tabsSegment && !tabsSegment.component) {
            this.selectedTabIndex = this.linker.getSelectedTabIndex(this, tabsSegment.name, this.selectedTabIndex);
        }
        this.linker.navChange('switch');
        if (!this.hasTitles && !this.hasIcons)
            this.isToolbarVisible = false;
        this.tabsContainer.slideTo(this.selectedTabIndex, false);
        this.setFixedIndicatorWidth();
        // we need this to make sure the "slide" thingy doesn't move outside the screen
        this.maxIndicatorPosition = this.el.nativeElement.offsetWidth - (this.el.nativeElement.offsetWidth / this._tabs.length);
        setTimeout(() => this.alignIndicatorPosition(), 100);
        this.refreshContainerHeight();
        this.init = true;
    }
    ngOnDestroy() {
        this.watches.forEach((watch) => {
            watch.unsubscribe && watch.unsubscribe();
        });
        this.parent.unregisterChildNav(this);
        this.superTabsCtrl.unregisterInstance(this.id);
    }
    setBadge(tabId, value) {
        this.getTabById(tabId).setBadge(value);
    }
    clearBadge(tabId) {
        this.getTabById(tabId).clearBadge();
    }
    increaseBadge(tabId, increaseBy) {
        this.getTabById(tabId).increaseBadge(increaseBy);
    }
    decreaseBadge(tabId, decreaseBy) {
        this.getTabById(tabId).decreaseBadge(decreaseBy);
    }
    enableTabsSwipe(enable) {
        this.tabsContainer.enableTabsSwipe(enable);
    }
    enableTabSwipe(tabId, enable) {
        this.tabsContainer.enableTabSwipe(this.getTabIndexById(tabId), enable);
    }
    showToolbar(show) {
        this.isToolbarVisible = show;
        this.refreshContainerHeight();
    }
    slideTo(indexOrId) {
        if (typeof indexOrId === 'string') {
            indexOrId = this.getTabIndexById(indexOrId);
        }
        this.selectedTabIndex = indexOrId;
        return this.tabsContainer.slideTo(indexOrId);
    }
    getActiveChildNav() {
        return this._tabs[this.selectedTabIndex];
    }
    addTab(tab) {
        tab.rootParams = tab.rootParams || {};
        tab.rootParams.rootNavCtrl = this.parent;
        tab.tabId = tab.tabId || `ion-super-tabs-${this.id}-tab-${this._tabs.length}`;
        this._tabs.push(tab);
        if (tab.icon) {
            this.hasIcons = true;
        }
        if (tab.title) {
            this.hasTitles = true;
        }
        tab.setWidth(this.el.nativeElement.offsetWidth);
    }
    /**
     * We listen to drag events to move the "slide" thingy along with the slides
     * @param ev
     */
    onDrag() {
        if (!this.isToolbarVisible)
            return;
        this.domCtrl.write(() => {
            const singleSlideWidth = this.tabsContainer.tabWidth, slidesWidth = this.tabsContainer.containerWidth;
            let percentage = Math.abs(this.tabsContainer.containerPosition / slidesWidth);
            if (this.scrollTabs) {
                const originalSlideStart = singleSlideWidth * this.selectedTabIndex, originalPosition = this.getRelativeIndicatorPosition(), originalWidth = this.getSegmentButtonWidth();
                let nextPosition, nextWidth, indicatorPosition, indicatorWidth;
                const deltaTabPos = originalSlideStart - Math.abs(this.tabsContainer.containerPosition);
                percentage = Math.abs(deltaTabPos / singleSlideWidth);
                if (deltaTabPos < 0) {
                    // going to next slide
                    nextPosition = this.getRelativeIndicatorPosition(this.selectedTabIndex + 1);
                    nextWidth = this.getSegmentButtonWidth(this.selectedTabIndex + 1);
                    indicatorPosition = originalPosition + percentage * (nextPosition - originalPosition);
                }
                else {
                    // going to previous slide
                    nextPosition = this.getRelativeIndicatorPosition(this.selectedTabIndex - 1);
                    nextWidth = this.getSegmentButtonWidth(this.selectedTabIndex - 1);
                    indicatorPosition = originalPosition - percentage * (originalPosition - nextPosition);
                }
                const deltaWidth = nextWidth - originalWidth;
                indicatorWidth = originalWidth + percentage * deltaWidth;
                if ((originalWidth > nextWidth && indicatorWidth < nextWidth) || (originalWidth < nextWidth && indicatorWidth > nextWidth)) {
                    // this is only useful on desktop, because you are able to drag and swipe through multiple tabs at once
                    // which results in the indicator width to be super small/big since it's changing based on the current/next widths
                    indicatorWidth = nextWidth;
                }
                this.alignTabButtonsContainer();
                this.toolbar.setIndicatorProperties(indicatorWidth, indicatorPosition);
            }
            else {
                this.toolbar.setIndicatorPosition(Math.min(percentage * singleSlideWidth, this.maxIndicatorPosition));
            }
        });
    }
    /**
     * Runs when the user clicks on a segment button
     * @param index
     */
    onTabChange(index) {
        if (index <= this._tabs.length) {
            this._tabs[this.selectedTabIndex].getActive()._didLeave();
            this._tabs[index].getActive()._didEnter();
            this.selectedTabIndex = index;
            this.linker.navChange('switch');
            this.tabSelect.emit({
                index,
                id: this._tabs[index].tabId
            });
        }
    }
    onToolbarTabSelect(index) {
        this.tabsContainer.slideTo(index).then(_ => {
            this.onTabChange(index);
        });
    }
    onContainerTabSelect(ev) {
        if (ev.changed) {
            this.onTabChange(ev.index);
        }
        this.alignIndicatorPosition(true);
    }
    updateTabWidth() {
        this.tabsContainer.tabWidth = this.el.nativeElement.offsetWidth;
    }
    refreshContainerHeight() {
        let heightOffset = 0;
        if (this.isToolbarVisible) {
            heightOffset -= 4;
            this.hasTitles && (heightOffset += 40);
            this.hasIcons && (heightOffset += 40);
        }
        this.rnd.setStyle(this.tabsContainer.getNativeElement(), 'height', `calc(100% - ${heightOffset}px)`);
    }
    refreshTabWidths() {
        const width = this.el.nativeElement.offsetWidth;
        this._tabs.forEach((tab) => {
            tab.setWidth(width);
        });
    }
    alignTabButtonsContainer(animate) {
        const mw = this.el.nativeElement.offsetWidth, // max width
        iw = this.toolbar.indicatorWidth, // indicator width
        ip = this.toolbar.indicatorPosition, // indicatorPosition
        sp = this.toolbar.segmentPosition; // segment position
        let pos;
        if (ip + iw + (mw / 2 - iw / 2) > mw + sp) {
            // we need to move the segment container to the left
            let delta = (ip + iw + (mw / 2 - iw / 2)) - mw - sp;
            pos = sp + delta;
            let max = this.toolbar.segmentWidth - mw;
            pos = pos < max ? pos : max;
        }
        else if (ip - (mw / 2 - iw / 2) < sp) {
            // we need to move the segment container to the right
            pos = ip - (mw / 2 - iw / 2);
            pos = pos >= 0 ? pos : 0;
        }
        else
            return; // no need to move the segment container
        this.toolbar.setSegmentPosition(pos, animate);
    }
    getRelativeIndicatorPosition(index = this.selectedTabIndex) {
        let position = 0;
        for (let i = 0; i < this.toolbar.segmentButtonWidths.length; i++) {
            if (index > Number(i)) {
                position += this.toolbar.segmentButtonWidths[i] + 5;
            }
        }
        position += 5 * (index + 1);
        return position;
    }
    getAbsoluteIndicatorPosition() {
        let position = this.selectedTabIndex * this.tabsContainer.tabWidth / this._tabs.length;
        return position <= this.maxIndicatorPosition ? position : this.maxIndicatorPosition;
    }
    /**
     * Gets the width of a tab button when `scrollTabs` is set to `true`
     */
    getSegmentButtonWidth(index = this.selectedTabIndex) {
        if (!this.isToolbarVisible)
            return;
        return this.toolbar.segmentButtonWidths[index];
    }
    setFixedIndicatorWidth() {
        if (this.scrollTabs || !this.isToolbarVisible)
            return;
        // the width of the "slide", should be equal to the width of a single `ion-segment-button`
        // we'll just calculate it instead of querying for a segment button
        this.toolbar.setIndicatorWidth(this.el.nativeElement.offsetWidth / this._tabs.length, false);
    }
    /**
     * Aligns slide position with selected tab
     */
    alignIndicatorPosition(animate = false) {
        if (!this.isToolbarVisible)
            return;
        if (this.scrollTabs) {
            this.toolbar.alignIndicator(this.getRelativeIndicatorPosition(), this.getSegmentButtonWidth(), animate);
            this.alignTabButtonsContainer(animate);
        }
        else {
            this.toolbar.setIndicatorPosition(this.getAbsoluteIndicatorPosition(), animate);
        }
    }
    getTabIndexById(tabId) {
        return this._tabs.findIndex((tab) => tab.tabId === tabId);
    }
    getTabById(tabId) {
        return this._tabs.find((tab) => tab.tabId === tabId);
    }
    getElementRef() { return this.el; }
    initPane() { return true; }
    paneChanged() { }
    getSelected() { }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SuperTabs.prototype, "toolbarBackground", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SuperTabs.prototype, "toolbarColor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SuperTabs.prototype, "indicatorColor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SuperTabs.prototype, "badgeColor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SuperTabs.prototype, "config", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SuperTabs.prototype, "id", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], SuperTabs.prototype, "height", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], SuperTabs.prototype, "selectedTabIndex", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], SuperTabs.prototype, "scrollTabs", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SuperTabs.prototype, "tabsPlacement", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SuperTabs.prototype, "tabSelect", void 0);
__decorate([
    core_1.ViewChild(super_tabs_toolbar_1.SuperTabsToolbar),
    __metadata("design:type", super_tabs_toolbar_1.SuperTabsToolbar)
], SuperTabs.prototype, "toolbar", void 0);
__decorate([
    core_1.ViewChild(super_tabs_container_1.SuperTabsContainer),
    __metadata("design:type", super_tabs_container_1.SuperTabsContainer)
], SuperTabs.prototype, "tabsContainer", void 0);
SuperTabs = SuperTabs_1 = __decorate([
    core_1.Component({
        selector: 'ion-super-tabs',
        template: `
    <ion-super-tabs-toolbar [tabsPlacement]="tabsPlacement" [hidden]="!isToolbarVisible" [config]="config"
                        [color]="toolbarBackground" [tabsColor]="toolbarColor" [indicatorColor]="indicatorColor"
                        [badgeColor]="badgeColor" [scrollTabs]="scrollTabs" [selectedTab]="selectedTabIndex"
                        (tabSelect)="onToolbarTabSelect($event)"></ion-super-tabs-toolbar>
    <ion-super-tabs-container [config]="config" [tabsCount]="_tabs.length" [selectedTabIndex]="selectedTabIndex"
                          (tabSelect)="onContainerTabSelect($event)" (onDrag)="onDrag($event)">
      <ng-content></ng-content>
    </ion-super-tabs-container>
  `,
        encapsulation: core_1.ViewEncapsulation.None,
        providers: [{ provide: ionic_angular_1.RootNode, useExisting: core_1.forwardRef(() => SuperTabs_1) }]
    }),
    __param(0, core_1.Optional()),
    __param(1, core_1.Optional()),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.ViewController,
        ionic_angular_1.App,
        core_1.ElementRef,
        core_1.Renderer2,
        super_tabs_controller_1.SuperTabsController,
        ionic_angular_1.DeepLinker,
        ionic_angular_1.DomController])
], SuperTabs);
exports.SuperTabs = SuperTabs;
let superTabsIds = -1;
var SuperTabs_1;
//# sourceMappingURL=super-tabs.js.map