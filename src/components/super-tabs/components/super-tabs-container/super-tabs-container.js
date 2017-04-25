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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const ionic_angular_1 = require("ionic-angular");
const super_tabs_pan_gesture_1 = require("../../super-tabs-pan-gesture");
let SuperTabsContainer = class SuperTabsContainer {
    constructor(el, rnd, plt, domCtrl, ngZone) {
        this.el = el;
        this.rnd = rnd;
        this.plt = plt;
        this.domCtrl = domCtrl;
        this.ngZone = ngZone;
        this.tabsCount = 0;
        this.tabSelect = new core_1.EventEmitter();
        this.onDrag = new core_1.EventEmitter();
        // View bindings
        this.containerPosition = 0;
        this.tabWidth = 0;
        this.containerWidth = 0;
        this.tabs = [];
        this.globalSwipeEnabled = true;
        this.swipeEnabledPerTab = {};
    }
    ngAfterViewInit() {
        this.init();
    }
    ngOnDestroy() {
        this.gesture && this.gesture.destroy();
    }
    enableTabsSwipe(enable) {
        this.globalSwipeEnabled = enable;
    }
    enableTabSwipe(tabIndex, enable) {
        this.swipeEnabledPerTab[tabIndex] = enable;
    }
    refreshDimensions() {
        this.calculateContainerWidth();
        this.setContainerWidth();
        this.refreshMinMax();
    }
    getNativeElement() {
        return this.el.nativeElement;
    }
    init() {
        this.refreshDimensions();
        this.gesture = new super_tabs_pan_gesture_1.SuperTabsPanGesture(this.plt, this.container.nativeElement, this.config, this.rnd);
        this.gesture.onMove = (delta) => {
            if (this.globalSwipeEnabled === false)
                return;
            if (this.swipeEnabledPerTab[this.selectedTabIndex] === false)
                return;
            if ((this.containerPosition === this.maxPosX && delta >= 0) || (this.containerPosition === this.minPosX && delta <= 0))
                return;
            this.containerPosition += delta;
            this.plt.raf(() => {
                this.onDrag.emit();
                this.moveContainer();
            });
        };
        this.gesture.onEnd = (shortSwipe, shortSwipeDelta) => {
            if (this.globalSwipeEnabled === false)
                return;
            if (this.swipeEnabledPerTab[this.selectedTabIndex] === false)
                return;
            // get tab index based on container position
            let tabIndex = Math.round(this.containerPosition / this.tabWidth);
            // handle short swipes
            // only short swipe if we didn't change tab already in this gesture
            (tabIndex === this.selectedTabIndex) && shortSwipe && ((shortSwipeDelta < 0 && tabIndex++) || (shortSwipeDelta > 0 && tabIndex--));
            // get location based on tab index
            const position = Math.max(this.minPosX, Math.min(this.maxPosX, tabIndex * this.tabWidth));
            tabIndex = position / this.tabWidth;
            // move container if we changed position
            if (position !== this.containerPosition) {
                this.plt.raf(() => {
                    this.moveContainer(true, position, () => this.ngZone.run(() => this.setSelectedTab(tabIndex)));
                });
            }
            else
                this.setSelectedTab(tabIndex);
        };
    }
    setSelectedTab(index) {
        let tab = this.tabs[index];
        tab.load().then(() => {
            this.tabSelect.emit({ index, changed: index !== this.selectedTabIndex });
            this.selectedTabIndex = index;
        });
    }
    calculateContainerWidth() {
        this.containerWidth = this.tabWidth * this.tabsCount;
    }
    setHeight(height) {
        this.rnd.setStyle(this.el.nativeElement, 'height', height + 'px');
    }
    setContainerWidth() {
        this.rnd.setStyle(this.container.nativeElement, 'width', this.containerWidth + 'px');
    }
    slideTo(index, animate = true) {
        let tab = this.tabs[index];
        return tab.load().then(() => {
            this.plt.raf(() => this.moveContainer(animate, index * this.tabWidth));
        });
    }
    moveContainer(animate = false, positionX, callback = () => { }) {
        const el = this.container.nativeElement;
        if (animate) {
            if (el.style[this.plt.Css.transform].indexOf('all') === -1) {
                this.rnd.setStyle(el, this.plt.Css.transition, `all ${this.config.transitionDuration}ms ${this.config.transitionEase}`);
            }
            this.rnd.setStyle(el, this.plt.Css.transform, `translate3d(${-1 * positionX}px, 0, 0)`);
            this.containerPosition = positionX;
        }
        else {
            if (positionX) {
                this.containerPosition = positionX;
            }
            if (el.style[this.plt.Css.transform] !== 'initial') {
                this.rnd.setStyle(el, this.plt.Css.transition, 'initial');
            }
            this.containerPosition = Math.max(this.minPosX, Math.min(this.maxPosX, this.containerPosition));
            this.rnd.setStyle(el, this.plt.Css.transform, `translate3d(${-1 * this.containerPosition}px, 0, 0)`);
        }
        callback();
    }
    refreshMinMax() {
        this.minPosX = 0;
        this.maxPosX = (this.tabsCount - 1) * this.tabWidth;
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SuperTabsContainer.prototype, "config", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SuperTabsContainer.prototype, "tabsCount", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SuperTabsContainer.prototype, "selectedTabIndex", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SuperTabsContainer.prototype, "tabSelect", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SuperTabsContainer.prototype, "onDrag", void 0);
__decorate([
    core_1.ViewChild('container'),
    __metadata("design:type", core_1.ElementRef)
], SuperTabsContainer.prototype, "container", void 0);
SuperTabsContainer = __decorate([
    core_1.Component({
        selector: 'ion-super-tabs-container',
        template: '<div #container><ng-content></ng-content></div>',
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.Renderer2,
        ionic_angular_1.Platform,
        ionic_angular_1.DomController,
        core_1.NgZone])
], SuperTabsContainer);
exports.SuperTabsContainer = SuperTabsContainer;
//# sourceMappingURL=super-tabs-container.js.map