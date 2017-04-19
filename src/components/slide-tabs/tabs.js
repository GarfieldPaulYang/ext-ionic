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
const tab_1 = require("./tab");
const ionic_angular_1 = require("ionic-angular");
const Observable_1 = require("rxjs/Observable");
const tabs_toolbar_1 = require("./tabs-toolbar");
let SlideTabs = class SlideTabs {
    constructor(el, rnd, plt) {
        this.el = el;
        this.rnd = rnd;
        this.plt = plt;
        /**
         * Color of the slider that moves based on what tab is selected
         */
        this.indicatorColor = 'primary';
        this._scrollTabs = false;
        /**
         * The tabs
         */
        this.tabs = [];
        this._selectedTabIndex = 0;
        this.hasIcons = false;
        this.hasTitles = false;
        this.validSlideLocations = [];
        this.isTouchingSlides = false;
        this.lastTranslate = 0;
        // re-adjust the height of the slider when the orientation changes
        this.screenOrientationWatch = Observable_1.Observable.fromEvent(window, 'orientationchange').subscribe(() => {
            this.setFixedIndicatorWidth();
            this.setSlidesHeight();
            this.slides.update(0);
            this.indexValidSlideLocations();
        });
    }
    /**
     * Height of the tabs
     */
    set height(val) {
        this.rnd.setElementStyle(this.el.nativeElement, 'height', val);
    }
    /**
     * The initial selected tab index
     * @param val {number} tab index
     */
    set selectedTabIndex(val) {
        this._selectedTabIndex = val;
        this.alignIndicatorPosition(true);
        this.lockSwipes();
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
    ngAfterContentInit() {
        // take the tabs from the query and put them in a regular array to make life easier
        this.superTabs.forEach((tab) => {
            tab.navParams = tab.navParams || {};
            tab.navParams.rootNavCtrl = this.rootNavCtrl;
            this.tabs.push(tab);
            if (tab.icon) {
                this.hasIcons = true;
            }
            if (tab.title) {
                this.hasTitles = true;
            }
        });
        this.toolbar.tabs = this.tabs;
        this.slides.update(0);
        this.setSlidesHeight();
    }
    ngAfterViewInit() {
        this.setFixedIndicatorWidth();
        // we need this to make sure the "slide" thingy doesn't move outside the screen
        this.maxIndicatorPosition = this.el.nativeElement.offsetWidth - (this.el.nativeElement.offsetWidth / this.tabs.length);
        // set slide speed to match slider
        this.slides.speed = 150;
        this.plt.timeout(() => {
            // Ion-Slides has an issue where sometimes swiping causes the slides to be stuck in the middle of two slides
            // Let's figure out all the possible locations of the slides
            // Then every time the slideTouchEnd is fired, we will ensure that the slider is displaying correctly.
            this.indexValidSlideLocations();
            // Allow opening left menu on first tab, and right menu on last slide
            this.slides.touchReleaseOnEdges = true;
            // TODO add input for touchMoveStopPropagation option, and document the consequences (or try to fix)
            // this.slides.touchMoveStopPropagation = false;
            // this.slides.iOSEdgeSwipeDetection = true;
            // this.slides.ionSlideDidChange
            //   .debounceTime(100)
            //   .skipWhile(() => this.isTouchingSlides)
            //   .subscribe(ev => {
            //     if (!this.isTouchingSlides) {
            //       this.validateSlideLocation(ev);
            //     }
            //   });
        }, 100);
        this.lockSwipes();
        // wait 1s before setting height again, to make sure our view is fully loaded
        // TODO figure out a better way to do this
        setTimeout(() => {
            this.setSlidesHeight();
        }, 1000);
        // wait a bit then align indicator position, setting it right away causes issues
        // TODO figure out a better way to do this
        setTimeout(() => {
            this.alignIndicatorPosition();
        }, 100);
    }
    ngOnDestroy() {
        if (this.screenOrientationWatch && this.screenOrientationWatch.unsubscribe) {
            this.screenOrientationWatch.unsubscribe();
        }
    }
    /**
     * We listen to drag events to move the "slide" thingy along with the slides
     * @param ev
     */
    onDrag(ev) {
        const singleSlideWidth = this.slides.renderedWidth, slidesWidth = singleSlideWidth * this.tabs.length;
        let percentage = Math.abs(ev._translate / slidesWidth);
        if (ev._translate > 0 || ev._translate < -slidesWidth) {
            // over sliding
            return;
        }
        if (this.scrollTabs) {
            const originalSlideStart = singleSlideWidth * this.selectedTabIndex, originalPosition = this.getRelativeIndicatorPosition(), originalWidth = this.getSegmentButtonWidth();
            let nextPosition, nextWidth, position, indicatorWidth;
            const deltaTabPos = originalSlideStart - Math.abs(ev._translate);
            percentage = Math.abs(deltaTabPos / singleSlideWidth);
            if (deltaTabPos < 0) {
                // going to next slide
                nextPosition = this.getRelativeIndicatorPosition(this.selectedTabIndex + 1);
                nextWidth = this.getSegmentButtonWidth(this.selectedTabIndex + 1);
                position = originalPosition + percentage * (nextPosition - originalPosition);
            }
            else {
                // going to previous slide
                nextPosition = this.getRelativeIndicatorPosition(this.selectedTabIndex - 1);
                nextWidth = this.getSegmentButtonWidth(this.selectedTabIndex - 1);
                position = originalPosition - percentage * (originalPosition - nextPosition);
            }
            const deltaWidth = nextWidth - originalWidth;
            indicatorWidth = originalWidth + percentage * deltaWidth;
            if ((originalWidth > nextWidth && indicatorWidth < nextWidth) || (originalWidth < nextWidth && indicatorWidth > nextWidth)) {
                // this is only useful on desktop, because you are able to drag and swipe through multiple tabs at once
                // which results in the indicator width to be super small/big since it's changing based on the current/next widths
                indicatorWidth = nextWidth;
            }
            this.alignTabButtonsContainer();
            this.toolbar.setIndicatorProperties(position, indicatorWidth);
        }
        else {
            let indicatorPosition = percentage * singleSlideWidth;
            if (indicatorPosition > this.maxIndicatorPosition) {
                indicatorPosition = this.maxIndicatorPosition;
            }
            this.toolbar.setIndicatorPosition(indicatorPosition);
        }
    }
    /**
     * The slide will change because the user stopped dragging, or clicked on a segment button
     * Let's make sure the segment button is in alignment with the slides
     * Also, lets animate the "slide" element
     */
    onSlideWillChange() {
        if (this.slides.getActiveIndex() <= this.tabs.length) {
            // this.shouldIndicatorEase = true;
            this.selectedTabIndex = this.slides.getActiveIndex();
        }
    }
    /**
     * We need to disable animation after the slide is done changing
     * Any further movement should happen instantly as the user swipes through the tabs
     */
    onSlideDidChange(ev) {
        // this.shouldIndicatorEase = false;
    }
    /**
     * Runs when the user clicks on a segment button
     * @param index
     */
    onTabSelect(index) {
        if (index <= this.tabs.length) {
            this.slides.slideTo(index);
        }
    }
    setIsTouchingSlides(val) {
        this.isTouchingSlides = val;
        if (val === false) {
            this.alignIndicatorPosition(true);
            if (this.lastTranslate !== this.slides._translate) {
                this.validateSlideLocation(this.slides);
            }
        }
        else {
            this.lastTranslate = this.slides._translate;
        }
    }
    indexValidSlideLocations() {
        let validLocations = [];
        for (let i = 0; i < this.tabs.length; i++) {
            validLocations.push(i * this.slides.renderedWidth);
        }
        this.validSlideLocations = validLocations;
    }
    validateSlideLocation(ev) {
        const translate = Math.abs(ev._translate);
        if (this.validSlideLocations.indexOf(translate) === -1) {
            // invalid location, lets fix it!
            let tabIndex = Math.round(translate / this.slides.renderedWidth);
            // TODO simplify
            if (tabIndex > this.tabs.length - 1) {
                tabIndex = this.tabs.length - 1;
            }
            else if (tabIndex < 0) {
                tabIndex = 0;
            }
            // TODO simplify
            if (tabIndex === 0) {
                this.slides.slideTo(tabIndex + 1);
            }
            else {
                this.slides.slideTo(tabIndex - 1);
            }
            this.slides.slideTo(tabIndex);
        }
    }
    lockSwipes() {
        if (this.selectedTabIndex === 0) {
            this.slides.lockSwipeToPrev(true);
        }
        else {
            this.slides.lockSwipeToPrev(false);
        }
        if (this.selectedTabIndex === this.tabs.length - 1) {
            this.slides.lockSwipeToNext(true);
        }
        else {
            this.slides.lockSwipeToNext(false);
        }
    }
    alignTabButtonsContainer() {
        let mw = this.el.nativeElement.offsetWidth, iw = this.toolbar.indicatorWidth, iPos = this.toolbar.indicatorPosition, sPos = this.toolbar.segmentPosition;
        let cVisibleStart = sPos;
        let cVisibleEnd = mw + sPos;
        if (iPos + iw + (mw / 2 - iw / 2) > cVisibleEnd) {
            let delta = (iPos + iw + (mw / 2 - iw / 2)) - cVisibleEnd;
            let pos = sPos + delta;
            let max = this.toolbar.segmentWidth - mw;
            pos = pos < max ? pos : max;
            this.toolbar.setSegmentPosition(pos);
        }
        else if (iPos - (mw / 2 - iw / 2) < cVisibleStart) {
            let pos = iPos - (mw / 2 - iw / 2);
            pos = pos >= 0 ? pos : 0;
            this.toolbar.setSegmentPosition(pos);
        }
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
        let position = this.selectedTabIndex * this.slides.renderedWidth / this.tabs.length;
        return position <= this.maxIndicatorPosition ? position : this.maxIndicatorPosition;
    }
    /**
     * Gets the width of a tab button when `scrollTabs` is set to `true`
     */
    getSegmentButtonWidth(index = this.selectedTabIndex) {
        return this.toolbar.segmentButtonWidths[index];
    }
    setFixedIndicatorWidth() {
        if (this.scrollTabs)
            return;
        // the width of the "slide", should be equal to the width of a single `ion-segment-button`
        // we'll just calculate it instead of querying for a segment button
        this.toolbar.setIndicatorWidth(this.el.nativeElement.offsetWidth / this.tabs.length, false);
    }
    /**
     * Aligns slide position with selected tab
     */
    alignIndicatorPosition(ease = false) {
        let position;
        if (this.scrollTabs) {
            position = this.getRelativeIndicatorPosition();
            this.toolbar.setIndicatorWidth(this.getSegmentButtonWidth(), ease);
            this.toolbar.setIndicatorProperties(position, this.getSegmentButtonWidth(), ease);
            this.alignTabButtonsContainer();
        }
        else {
            position = this.getAbsoluteIndicatorPosition();
            this.toolbar.setIndicatorPosition(position, ease);
        }
    }
    /**
     * Sets the height of ion-slides
     */
    setSlidesHeight() {
        let height = this.el.nativeElement.offsetHeight; // height of the current element
        height -= 4; // take out 4px which is the padding-top for the toolbar
        if (this.hasIcons)
            height -= 40; // take out 40px for icons
        if (this.hasTitles)
            height -= 40; // take out 40px for text
        this.rnd.setElementStyle(this.slides.getNativeElement(), 'height', height + 'px');
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", ionic_angular_1.NavController)
], SlideTabs.prototype, "rootNavCtrl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SlideTabs.prototype, "toolbarColor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SlideTabs.prototype, "tabsColor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SlideTabs.prototype, "indicatorColor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], SlideTabs.prototype, "height", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], SlideTabs.prototype, "selectedTabIndex", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], SlideTabs.prototype, "scrollTabs", null);
__decorate([
    core_1.ContentChildren(tab_1.SlideTab),
    __metadata("design:type", core_1.QueryList)
], SlideTabs.prototype, "superTabs", void 0);
__decorate([
    core_1.ViewChild(ionic_angular_1.Slides),
    __metadata("design:type", ionic_angular_1.Slides)
], SlideTabs.prototype, "slides", void 0);
__decorate([
    core_1.ViewChild(tabs_toolbar_1.SlideTabsToolbar),
    __metadata("design:type", tabs_toolbar_1.SlideTabsToolbar)
], SlideTabs.prototype, "toolbar", void 0);
SlideTabs = __decorate([
    core_1.Component({
        selector: 'ion-slide-tabs',
        template: `
    <ion-slide-tabs-toolbar [color]="toolbarColor" [tabsColor]="tabsColor" [indicatorColor]="indicatorColor"
                        [scrollTabs]="scrollTabs"
                        [selectedTab]="selectedTabIndex"
                        (tabSelect)="onTabSelect($event)"></ion-slide-tabs-toolbar>
    <ion-slides (ionSlideDrag)="onDrag($event)"
                (ionSlideWillChange)="onSlideWillChange()" (ionSlideDidChange)="onSlideDidChange($event)"
                [initialSlide]="selectedTabIndex" (touchstart)="setIsTouchingSlides(true)" (touchend)="setIsTouchingSlides(false)">
      <ion-slide *ngFor="let tab of tabs">
        <ion-nav [root]="tab.tabRoot" [rootParams]="tab.navParams"></ion-nav>
      </ion-slide>
    </ion-slides>
  `
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.Renderer,
        ionic_angular_1.Platform])
], SlideTabs);
exports.SlideTabs = SlideTabs;
//# sourceMappingURL=tabs.js.map