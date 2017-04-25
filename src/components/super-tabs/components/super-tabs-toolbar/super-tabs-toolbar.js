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
let SuperTabsToolbar = class SuperTabsToolbar {
    // Initialization methods
    constructor(el, plt, rnd, domCtrl) {
        this.el = el;
        this.plt = plt;
        this.rnd = rnd;
        this.domCtrl = domCtrl;
        this.color = '';
        this.tabsColor = '';
        this.badgeColor = '';
        this.scrollTabs = false;
        this.indicatorColor = '';
        this.selectedTab = 0;
        this.indicatorPosition = 0;
        this.indicatorWidth = 0;
        this.tabSelect = new core_1.EventEmitter();
        /**
         * @private
         */
        this.segmentPosition = 0;
        /**
         * The width of each button
         */
        this.segmentButtonWidths = [];
        /**
         * The segment width
         */
        this.segmentWidth = 0;
        this.tabs = [];
        this.animationState = {
            indicator: false,
            segment: false
        };
    }
    ngAfterViewInit() {
        this.gesture = new super_tabs_pan_gesture_1.SuperTabsPanGesture(this.plt, this.tabButtonsContainer.nativeElement, this.config, this.rnd);
        this.gesture.onMove = (delta) => {
            let newCPos = this.segmentPosition + delta;
            let mw = this.el.nativeElement.offsetWidth, cw = this.segmentWidth;
            newCPos = Math.max(0, Math.min(newCPos, cw - mw));
            this.setSegmentPosition(newCPos);
        };
        if (this.scrollTabs) {
            this.plt.timeout(() => {
                this.indexSegmentButtonWidths();
            }, 10);
        }
    }
    ngOnDestroy() {
        this.gesture && this.gesture.destroy();
    }
    onTabSelect(index) {
        this.tabSelect.emit(index);
    }
    alignIndicator(position, width, animate) {
        this.setIndicatorProperties(width, position, animate);
    }
    setIndicatorPosition(position, animate) {
        this.setIndicatorProperties(this.indicatorWidth, position, animate);
    }
    setIndicatorWidth(width, animate) {
        this.setIndicatorProperties(width, this.indicatorPosition, animate);
    }
    setIndicatorProperties(width, position, animate) {
        this.indicatorWidth = width;
        this.indicatorPosition = position;
        const scale = width / 100;
        this.toggleAnimation('indicator', animate);
        this.rnd.setStyle(this.indicator.nativeElement, this.plt.Css.transform, 'translate3d(' + (position - this.segmentPosition) + 'px, 0, 0) scale3d(' + scale + ', 1, 1)');
    }
    setSegmentPosition(position, animate) {
        this.segmentPosition = position;
        this.toggleAnimation('segment', animate);
        this.rnd.setStyle(this.segment.getNativeElement(), this.plt.Css.transform, `translate3d(${-1 * position}px,0,0)`);
        this.setIndicatorPosition(this.indicatorPosition, animate);
    }
    /**
     * Enables/disables animation
     * @param el
     * @param animate
     */
    toggleAnimation(el, animate) {
        if (!this.config || this.config.transitionDuration === 0)
            return;
        // only change style if the value changed
        if (this.animationState[el] === animate)
            return;
        this.animationState[el] = animate;
        const _el = el === 'indicator' ? this.indicator.nativeElement : this.segment.getNativeElement();
        const value = animate ? `all ${this.config.transitionDuration}ms ${this.config.transitionEase}` : 'initial';
        this.rnd.setStyle(_el, this.plt.Css.transition, value);
    }
    /**
     * Indexes the segment button widths
     */
    indexSegmentButtonWidths() {
        let index = [], total = 0;
        this.segmentButtons.forEach((btn, i) => {
            index[i] = btn._elementRef.nativeElement.offsetWidth;
            total += index[i] + 10;
        });
        this.segmentButtonWidths = index;
        this.segmentWidth = total;
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SuperTabsToolbar.prototype, "color", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SuperTabsToolbar.prototype, "tabsColor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SuperTabsToolbar.prototype, "badgeColor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SuperTabsToolbar.prototype, "scrollTabs", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SuperTabsToolbar.prototype, "indicatorColor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SuperTabsToolbar.prototype, "selectedTab", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SuperTabsToolbar.prototype, "config", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SuperTabsToolbar.prototype, "tabsPlacement", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SuperTabsToolbar.prototype, "tabSelect", void 0);
__decorate([
    core_1.ViewChildren(ionic_angular_1.SegmentButton),
    __metadata("design:type", core_1.QueryList)
], SuperTabsToolbar.prototype, "segmentButtons", void 0);
__decorate([
    core_1.ViewChild('tabButtonsContainer'),
    __metadata("design:type", core_1.ElementRef)
], SuperTabsToolbar.prototype, "tabButtonsContainer", void 0);
__decorate([
    core_1.ViewChild('indicator'),
    __metadata("design:type", core_1.ElementRef)
], SuperTabsToolbar.prototype, "indicator", void 0);
__decorate([
    core_1.ViewChild(ionic_angular_1.Segment),
    __metadata("design:type", ionic_angular_1.Segment)
], SuperTabsToolbar.prototype, "segment", void 0);
SuperTabsToolbar = __decorate([
    core_1.Component({
        selector: 'ion-super-tabs-toolbar',
        template: `
    <ion-toolbar [color]="color" mode="md" [class.scroll-tabs]="scrollTabs">
      <div class="tab-buttons-container" #tabButtonsContainer>
        <div *ngIf="tabsPlacement === 'bottom'" class="indicator {{ 'button-md-' + indicatorColor }}" #indicator></div>
        <ion-segment [color]="tabsColor" [(ngModel)]="selectedTab" mode="md">
          <ion-segment-button text-wrap *ngFor="let tab of tabs; let i = index" [value]="i" (ionSelect)="selectedTab !== i && onTabSelect(i)">
            <ion-icon *ngIf="tab.icon" [name]="tab.icon"></ion-icon>
            {{tab.title}}
            <span [hidden]="tab.badge <= 0" class="badge {{ 'badge-md-' + badgeColor }}">{{tab.badge}}</span>
          </ion-segment-button>
        </ion-segment>
        <div *ngIf="tabsPlacement === 'top'" class="indicator {{ 'button-md-' + indicatorColor }}" #indicator></div>
      </div>
    </ion-toolbar>`,
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        ionic_angular_1.Platform,
        core_1.Renderer2,
        ionic_angular_1.DomController])
], SuperTabsToolbar);
exports.SuperTabsToolbar = SuperTabsToolbar;
//# sourceMappingURL=super-tabs-toolbar.js.map