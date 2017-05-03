var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Component, ElementRef, Input, Renderer2, ViewChild, Output, EventEmitter, ViewEncapsulation, forwardRef, Optional } from '@angular/core';
import { NavController, RootNode, ViewController, App, DeepLinker, DomController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { SuperTabsToolbar } from '../super-tabs-toolbar/super-tabs-toolbar';
import { SuperTabsContainer } from '../super-tabs-container/super-tabs-container';
import { SuperTabsController } from '../../providers/super-tabs-controller';
var SuperTabs = (function () {
    function SuperTabs(parent, viewCtrl, _app, el, rnd, superTabsCtrl, linker, domCtrl) {
        var _this = this;
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
        this.tabSelect = new EventEmitter();
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
        var obsToMerge = [
            Observable.fromEvent(window, 'orientationchange'),
            Observable.fromEvent(window, 'resize')
        ];
        if (viewCtrl) {
            viewCtrl._setContent(this);
            viewCtrl._setContentRef(el);
            obsToMerge.push(viewCtrl.didEnter);
        }
        // re-adjust the height of the slider when the orientation changes
        this.watches.push(Observable.merge.apply(this, obsToMerge).debounceTime(10).subscribe(function () {
            _this.updateTabWidth();
            _this.setFixedIndicatorWidth();
            _this.tabsContainer.refreshDimensions();
            _this.tabsContainer.slideTo(_this.selectedTabIndex);
            _this.alignIndicatorPosition();
            _this.refreshTabWidths();
            _this.refreshContainerHeight();
        }));
    }
    Object.defineProperty(SuperTabs.prototype, "height", {
        get: function () {
            return this.el.nativeElement.offsetHeight;
        },
        /**
         * Height of the tabs
         */
        set: function (val) {
            this.rnd.setStyle(this.el.nativeElement, 'height', val + 'px');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuperTabs.prototype, "selectedTabIndex", {
        get: function () {
            return this._selectedTabIndex;
        },
        /**
         * The initial selected tab index
         * @param val {number} tab index
         */
        set: function (val) {
            this._selectedTabIndex = Number(val);
            this.init && this.alignIndicatorPosition(true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuperTabs.prototype, "scrollTabs", {
        get: function () {
            return this._scrollTabs;
        },
        set: function (val) {
            this._scrollTabs = typeof val !== 'boolean' || val === true;
        },
        enumerable: true,
        configurable: true
    });
    SuperTabs.prototype.ngOnInit = function () {
        var defaultConfig = {
            dragThreshold: 10,
            maxDragAngle: 40,
            sideMenuThreshold: 50,
            transitionDuration: 300,
            transitionEase: 'cubic-bezier(0.35, 0, 0.25, 1)',
            shortSwipeDuration: 300
        };
        this.config = __assign({}, defaultConfig, this.config);
        this.id = this.id || "ion-super-tabs-" + ++superTabsIds;
        this.superTabsCtrl.registerInstance(this);
        if (this.tabsPlacement === 'bottom') {
            this.rnd.addClass(this.getElementRef().nativeElement, 'tabs-placement-bottom');
        }
    };
    SuperTabs.prototype.ngAfterContentInit = function () {
        this.updateTabWidth();
        this.toolbar.tabs = this._tabs;
        this.tabsContainer.tabs = this._tabs;
    };
    SuperTabs.prototype.ngAfterViewInit = function () {
        var _this = this;
        var tabsSegment = this.linker.initNav(this);
        if (tabsSegment && !tabsSegment.component) {
            this.selectedTabIndex = this.linker.getSelectedTabIndex(this, tabsSegment.name, this.selectedTabIndex);
        }
        this.linker.navChange('switch');
        if (!this.hasTitles && !this.hasIcons)
            this.isToolbarVisible = false;
        this.tabsContainer.slideTo(this.selectedTabIndex, false).then(function () { return _this.refreshTabStates(); });
        this.setFixedIndicatorWidth();
        // we need this to make sure the "slide" thingy doesn't move outside the screen
        this.maxIndicatorPosition = this.el.nativeElement.offsetWidth - (this.el.nativeElement.offsetWidth / this._tabs.length);
        setTimeout(function () { return _this.alignIndicatorPosition(); }, 100);
        this.refreshContainerHeight();
        this.init = true;
    };
    SuperTabs.prototype.ngOnDestroy = function () {
        this.watches.forEach(function (watch) {
            watch.unsubscribe && watch.unsubscribe();
        });
        this.parent.unregisterChildNav(this);
        this.superTabsCtrl.unregisterInstance(this.id);
    };
    SuperTabs.prototype.setBadge = function (tabId, value) {
        this.getTabById(tabId).setBadge(value);
    };
    SuperTabs.prototype.clearBadge = function (tabId) {
        this.getTabById(tabId).clearBadge();
    };
    SuperTabs.prototype.increaseBadge = function (tabId, increaseBy) {
        this.getTabById(tabId).increaseBadge(increaseBy);
    };
    SuperTabs.prototype.decreaseBadge = function (tabId, decreaseBy) {
        this.getTabById(tabId).decreaseBadge(decreaseBy);
    };
    SuperTabs.prototype.enableTabsSwipe = function (enable) {
        this.tabsContainer.enableTabsSwipe(enable);
    };
    SuperTabs.prototype.enableTabSwipe = function (tabId, enable) {
        this.tabsContainer.enableTabSwipe(this.getTabIndexById(tabId), enable);
    };
    SuperTabs.prototype.showToolbar = function (show) {
        this.isToolbarVisible = show;
        this.refreshContainerHeight();
    };
    SuperTabs.prototype.slideTo = function (indexOrId) {
        if (typeof indexOrId === 'string') {
            indexOrId = this.getTabIndexById(indexOrId);
        }
        this.selectedTabIndex = indexOrId;
        return this.tabsContainer.slideTo(indexOrId);
    };
    SuperTabs.prototype.getActiveChildNav = function () {
        return this._tabs[this.selectedTabIndex];
    };
    SuperTabs.prototype.addTab = function (tab) {
        tab.rootParams = tab.rootParams || {};
        tab.rootParams.rootNavCtrl = this.parent;
        tab.tabId = tab.tabId || "ion-super-tabs-" + this.id + "-tab-" + this._tabs.length;
        this._tabs.push(tab);
        if (tab.icon) {
            this.hasIcons = true;
        }
        if (tab.title) {
            this.hasTitles = true;
        }
        tab.setWidth(this.el.nativeElement.offsetWidth);
    };
    /**
     * We listen to drag events to move the "slide" thingy along with the slides
     * @param ev
     */
    SuperTabs.prototype.onDrag = function () {
        var _this = this;
        if (!this.isToolbarVisible)
            return;
        this.domCtrl.write(function () {
            var singleSlideWidth = _this.tabsContainer.tabWidth, slidesWidth = _this.tabsContainer.containerWidth;
            var percentage = Math.abs(_this.tabsContainer.containerPosition / slidesWidth);
            if (_this.scrollTabs) {
                var originalSlideStart = singleSlideWidth * _this.selectedTabIndex, originalPosition = _this.getRelativeIndicatorPosition(), originalWidth = _this.getSegmentButtonWidth();
                var nextPosition = void 0, nextWidth = void 0, indicatorPosition = void 0, indicatorWidth = void 0;
                var deltaTabPos = originalSlideStart - Math.abs(_this.tabsContainer.containerPosition);
                percentage = Math.abs(deltaTabPos / singleSlideWidth);
                if (deltaTabPos < 0) {
                    // going to next slide
                    nextPosition = _this.getRelativeIndicatorPosition(_this.selectedTabIndex + 1);
                    nextWidth = _this.getSegmentButtonWidth(_this.selectedTabIndex + 1);
                    indicatorPosition = originalPosition + percentage * (nextPosition - originalPosition);
                }
                else {
                    // going to previous slide
                    nextPosition = _this.getRelativeIndicatorPosition(_this.selectedTabIndex - 1);
                    nextWidth = _this.getSegmentButtonWidth(_this.selectedTabIndex - 1);
                    indicatorPosition = originalPosition - percentage * (originalPosition - nextPosition);
                }
                var deltaWidth = nextWidth - originalWidth;
                indicatorWidth = originalWidth + percentage * deltaWidth;
                if ((originalWidth > nextWidth && indicatorWidth < nextWidth) || (originalWidth < nextWidth && indicatorWidth > nextWidth)) {
                    // this is only useful on desktop, because you are able to drag and swipe through multiple tabs at once
                    // which results in the indicator width to be super small/big since it's changing based on the current/next widths
                    indicatorWidth = nextWidth;
                }
                _this.alignTabButtonsContainer();
                _this.toolbar.setIndicatorProperties(indicatorWidth, indicatorPosition);
            }
            else {
                _this.toolbar.setIndicatorPosition(Math.min(percentage * singleSlideWidth, _this.maxIndicatorPosition));
            }
        });
    };
    /**
     * Runs when the user clicks on a segment button
     * @param index
     */
    SuperTabs.prototype.onTabChange = function (index) {
        if (index <= this._tabs.length) {
            var activeView = this.getActiveTab().getActive();
            activeView._willLeave(false);
            activeView._didLeave();
            this.selectedTabIndex = index;
            this.linker.navChange('switch');
            this.refreshTabStates();
            activeView = this.getActiveTab().getActive();
            if (activeView) {
                activeView._willEnter();
                activeView._didEnter();
            }
            this.tabSelect.emit({
                index: index,
                id: this._tabs[index].tabId
            });
        }
    };
    SuperTabs.prototype.onToolbarTabSelect = function (index) {
        var _this = this;
        this.tabsContainer.slideTo(index).then(function () {
            _this.onTabChange(index);
        });
    };
    SuperTabs.prototype.onContainerTabSelect = function (ev) {
        if (ev.changed) {
            this.onTabChange(ev.index);
        }
        this.alignIndicatorPosition(true);
    };
    SuperTabs.prototype.refreshTabStates = function () {
        var _this = this;
        this._tabs.forEach(function (tab, i) { return tab.setActive(i === _this.selectedTabIndex); });
    };
    SuperTabs.prototype.updateTabWidth = function () {
        this.tabsContainer.tabWidth = this.el.nativeElement.offsetWidth;
    };
    SuperTabs.prototype.refreshContainerHeight = function () {
        var heightOffset = 0;
        if (this.isToolbarVisible) {
            heightOffset -= 4;
            this.hasTitles && (heightOffset += 40);
            this.hasIcons && (heightOffset += 40);
        }
        this.rnd.setStyle(this.tabsContainer.getNativeElement(), 'height', "calc(100% - " + heightOffset + "px)");
    };
    SuperTabs.prototype.refreshTabWidths = function () {
        var width = this.el.nativeElement.offsetWidth;
        this._tabs.forEach(function (tab) {
            tab.setWidth(width);
        });
    };
    SuperTabs.prototype.alignTabButtonsContainer = function (animate) {
        var mw = this.el.nativeElement.offsetWidth, // max width
        iw = this.toolbar.indicatorWidth, // indicator width
        ip = this.toolbar.indicatorPosition, // indicatorPosition
        sp = this.toolbar.segmentPosition; // segment position
        if (this.toolbar.segmentWidth <= mw) {
            if (this.toolbar.segmentPosition !== 0) {
                this.toolbar.setSegmentPosition(0, animate);
            }
            return;
        }
        var pos;
        if (ip + iw + (mw / 2 - iw / 2) > mw + sp) {
            // we need to move the segment container to the left
            var delta = (ip + iw + (mw / 2 - iw / 2)) - mw - sp;
            pos = sp + delta;
            var max = this.toolbar.segmentWidth - mw;
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
    };
    SuperTabs.prototype.getRelativeIndicatorPosition = function (index) {
        if (index === void 0) { index = this.selectedTabIndex; }
        var position = 0;
        for (var i = 0; i < this.toolbar.segmentButtonWidths.length; i++) {
            if (index > Number(i)) {
                position += this.toolbar.segmentButtonWidths[i] + 5;
            }
        }
        position += 5 * (index + 1);
        return position;
    };
    SuperTabs.prototype.getAbsoluteIndicatorPosition = function () {
        var position = this.selectedTabIndex * this.tabsContainer.tabWidth / this._tabs.length;
        return position <= this.maxIndicatorPosition ? position : this.maxIndicatorPosition;
    };
    /**
     * Gets the width of a tab button when `scrollTabs` is set to `true`
     */
    SuperTabs.prototype.getSegmentButtonWidth = function (index) {
        if (index === void 0) { index = this.selectedTabIndex; }
        if (!this.isToolbarVisible)
            return;
        return this.toolbar.segmentButtonWidths[index];
    };
    SuperTabs.prototype.setFixedIndicatorWidth = function () {
        if (this.scrollTabs || !this.isToolbarVisible)
            return;
        // the width of the "slide", should be equal to the width of a single `ion-segment-button`
        // we'll just calculate it instead of querying for a segment button
        this.toolbar.setIndicatorWidth(this.el.nativeElement.offsetWidth / this._tabs.length, false);
    };
    /**
     * Aligns slide position with selected tab
     */
    SuperTabs.prototype.alignIndicatorPosition = function (animate) {
        if (animate === void 0) { animate = false; }
        if (!this.isToolbarVisible)
            return;
        if (this.scrollTabs) {
            this.toolbar.alignIndicator(this.getRelativeIndicatorPosition(), this.getSegmentButtonWidth(), animate);
            this.alignTabButtonsContainer(animate);
        }
        else {
            this.toolbar.setIndicatorPosition(this.getAbsoluteIndicatorPosition(), animate);
        }
    };
    SuperTabs.prototype.getTabIndexById = function (tabId) {
        return this._tabs.findIndex(function (tab) { return tab.tabId === tabId; });
    };
    SuperTabs.prototype.getTabById = function (tabId) {
        return this._tabs.find(function (tab) { return tab.tabId === tabId; });
    };
    SuperTabs.prototype.getActiveTab = function () {
        return this._tabs[this.selectedTabIndex];
    };
    SuperTabs.prototype.getElementRef = function () { return this.el; };
    SuperTabs.prototype.initPane = function () { return true; };
    SuperTabs.prototype.paneChanged = function () { };
    SuperTabs.prototype.getSelected = function () { };
    SuperTabs.prototype.setTabbarPosition = function () { };
    return SuperTabs;
}());
export { SuperTabs };
SuperTabs.decorators = [
    { type: Component, args: [{
                selector: 'ion-super-tabs',
                template: "\n    <ion-super-tabs-toolbar [tabsPlacement]=\"tabsPlacement\" [hidden]=\"!isToolbarVisible\" [config]=\"config\"\n                        [color]=\"toolbarBackground\" [tabsColor]=\"toolbarColor\" [indicatorColor]=\"indicatorColor\"\n                        [badgeColor]=\"badgeColor\" [scrollTabs]=\"scrollTabs\" [selectedTab]=\"selectedTabIndex\"\n                        (tabSelect)=\"onToolbarTabSelect($event)\"></ion-super-tabs-toolbar>\n    <ion-super-tabs-container [config]=\"config\" [tabsCount]=\"_tabs.length\" [selectedTabIndex]=\"selectedTabIndex\"\n                          (tabSelect)=\"onContainerTabSelect($event)\" (onDrag)=\"onDrag($event)\">\n      <ng-content></ng-content>\n    </ion-super-tabs-container>\n  ",
                encapsulation: ViewEncapsulation.None,
                providers: [{ provide: RootNode, useExisting: forwardRef(function () { return SuperTabs; }) }]
            },] },
];
/** @nocollapse */
SuperTabs.ctorParameters = function () { return [
    { type: NavController, decorators: [{ type: Optional },] },
    { type: ViewController, decorators: [{ type: Optional },] },
    { type: App, },
    { type: ElementRef, },
    { type: Renderer2, },
    { type: SuperTabsController, },
    { type: DeepLinker, },
    { type: DomController, },
]; };
SuperTabs.propDecorators = {
    'toolbarBackground': [{ type: Input },],
    'toolbarColor': [{ type: Input },],
    'indicatorColor': [{ type: Input },],
    'badgeColor': [{ type: Input },],
    'config': [{ type: Input },],
    'id': [{ type: Input },],
    'height': [{ type: Input },],
    'selectedTabIndex': [{ type: Input },],
    'scrollTabs': [{ type: Input },],
    'tabsPlacement': [{ type: Input },],
    'tabSelect': [{ type: Output },],
    'toolbar': [{ type: ViewChild, args: [SuperTabsToolbar,] },],
    'tabsContainer': [{ type: ViewChild, args: [SuperTabsContainer,] },],
};
var superTabsIds = -1;
//# sourceMappingURL=super-tabs.js.map