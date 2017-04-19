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
let SlideTabsToolbar = class SlideTabsToolbar {
    constructor(rnd, el, plt) {
        this.rnd = rnd;
        this.el = el;
        this.plt = plt;
        this.color = '';
        this.tabsColor = '';
        this.scrollTabs = false;
        this.ease = false;
        this.indicatorPosition = 0;
        this.indicatorWidth = 0;
        this.selectedTab = 0;
        this.tabSelect = new core_1.EventEmitter();
        /**
         * @private
         */
        this.segmentPosition = 0;
        // Public values to be accessed by parent SuperTabs component
        /**
         * The width of each button
         */
        this.segmentButtonWidths = [];
        /**
         * The segment width
         */
        this.segmentWidth = 0;
        this.tabs = [];
        /**
         * Indicates whether this component is initialized
         */
        this.init = false;
    }
    set indicatorColor(val) {
        this.setIndicatorColor(val);
    }
    get indicatorColor() {
        return this._indicatorColor;
    }
    ngAfterViewInit() {
        this.init = true;
        if (this.scrollTabs) {
            this.plt.timeout(() => {
                this.indexSegmentButtonWidths();
            }, 10);
        }
        this.setIndicatorColor(this.indicatorColor);
    }
    onTabButtonsContainerTouch(name, ev) {
        if (!this.scrollTabs)
            return;
        switch (name) {
            case 'touchstart':
                this.lastTouchPositionX = ev.touches[0].clientX;
                break;
            case 'touchmove':
                let newPos = ev.touches[0].clientX;
                let delta = this.lastTouchPositionX - newPos;
                this.lastTouchPositionX = newPos;
                let newCPos = this.segmentPosition + delta;
                let mw = this.el.nativeElement.offsetWidth, cw = this.segmentWidth;
                let min = 0, max = cw - mw;
                if (newCPos < min)
                    newCPos = min;
                if (newCPos > max)
                    newCPos = max;
                this.setSegmentPosition(newCPos);
                break;
        }
    }
    onTabSelect(index) {
        this.tabSelect.emit(index);
    }
    setIndicatorProperties(position, width, shouldEase = false) {
        shouldEase && this.toggleEase();
        this.setIndicatorPosition(position, false);
        this.setIndicatorWidth(width, false);
    }
    setIndicatorPosition(position, shouldEase = false) {
        shouldEase && this.toggleEase();
        this.indicatorPosition = position;
    }
    setIndicatorWidth(width, shouldEase = false) {
        shouldEase && this.toggleEase();
        this.indicatorWidth = width;
    }
    setSegmentPosition(position) {
        this.segmentPosition = position;
        this.rnd.setElementStyle(this.segment.getNativeElement(), 'transform', `translate3d(${-1 * position}px, 0, 0)`);
    }
    toggleEase() {
        this.ease = true;
        setTimeout(() => this.ease = false, 150);
    }
    /**
     * Indexes the segment button widths
     */
    indexSegmentButtonWidths() {
        const index = [];
        let total = 0;
        this.segmentButtons.forEach((btn, i) => {
            const el = btn._elementRef;
            index[i] = el.nativeElement.offsetWidth;
        });
        total = index.reduce((a, b) => a + b + 10, 0);
        this.segmentButtonWidths = index;
        this.segmentWidth = total;
    }
    /**
     * Sets the color of the indicator
     */
    setIndicatorColor(color) {
        if (!this.init) {
            this._indicatorColor = color;
            return;
        }
        this.rnd.setElementClass(this.indicator.nativeElement, `button-md-${this._indicatorColor}`, false);
        this.rnd.setElementClass(this.indicator.nativeElement, `button-md-${color}`, true);
        this._indicatorColor = color;
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SlideTabsToolbar.prototype, "color", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SlideTabsToolbar.prototype, "tabsColor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SlideTabsToolbar.prototype, "scrollTabs", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], SlideTabsToolbar.prototype, "indicatorColor", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SlideTabsToolbar.prototype, "selectedTab", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], SlideTabsToolbar.prototype, "tabSelect", void 0);
__decorate([
    core_1.ViewChildren(ionic_angular_1.SegmentButton),
    __metadata("design:type", core_1.QueryList)
], SlideTabsToolbar.prototype, "segmentButtons", void 0);
__decorate([
    core_1.ViewChild(ionic_angular_1.Segment),
    __metadata("design:type", ionic_angular_1.Segment)
], SlideTabsToolbar.prototype, "segment", void 0);
__decorate([
    core_1.ViewChild('indicator'),
    __metadata("design:type", core_1.ElementRef)
], SlideTabsToolbar.prototype, "indicator", void 0);
SlideTabsToolbar = __decorate([
    core_1.Component({
        selector: 'ion-slide-tabs-toolbar',
        template: `
    <ion-toolbar [color]="color" mode="md" [class.scroll-tabs]="scrollTabs" [class.ease]="ease">
      <div class="tab-buttons-container" #tabButtonsContainer
           (touchstart)="onTabButtonsContainerTouch('touchstart', $event)"
           (touchmove)="onTabButtonsContainerTouch('touchmove', $event)">
        <ion-segment [color]="tabsColor" [(ngModel)]="selectedTab" mode="md">
          <ion-segment-button text-wrap *ngFor="let tab of tabs; let i = index" [value]="i"
                              (ionSelect)="onTabSelect(i)">
            <ion-icon *ngIf="tab.icon" [name]="tab.icon"></ion-icon>
            {{tab.title}}
          </ion-segment-button>
        </ion-segment>
        <div class="indicator" 
             [style.width]="indicatorWidth + 'px'"
             [style.transform]="'translate3d(' + (indicatorPosition - segmentPosition) + 'px, 0, 0)'"
             #indicator></div>
      </div>
    </ion-toolbar>`
    }),
    __metadata("design:paramtypes", [core_1.Renderer,
        core_1.ElementRef,
        ionic_angular_1.Platform])
], SlideTabsToolbar);
exports.SlideTabsToolbar = SlideTabsToolbar;
//# sourceMappingURL=tabs-toolbar.js.map