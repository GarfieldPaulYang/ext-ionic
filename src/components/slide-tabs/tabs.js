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
let TabsCmp = class TabsCmp {
    constructor(el, render) {
        this.el = el;
        this.render = render;
        this.sliderColor = 'primary';
        this.tabs = [];
        this.slidesHeight = 0;
        this.slidePosition = '0';
        this.slideWidth = '0';
        this.shouldSlideEase = false;
        this._selectedTabIndex = 0;
        this.validSliderLocations = [];
        this.screenOrientationWatch = Observable_1.Observable.fromEvent(window, 'orientationchange').subscribe(() => this.setHeights());
    }
    set height(val) {
        this.render.setElementStyle(this.el.nativeElement, 'height', val);
    }
    set selectedTabIndex(val) {
        this._selectedTabIndex = val;
        this.alignSlidePosition();
    }
    get selectedTabIndex() {
        return this._selectedTabIndex;
    }
    ngAfterViewInit() {
        this.slideTabs.forEach(tab => {
            tab.navParams = tab.navParams || {};
            tab.navParams.rootNavCtrl = this.rootNavCtrl;
            this.tabs.push(tab);
        });
        this.slideWidth = this.el.nativeElement.offsetWidth / this.tabs.length + 'px';
        this.maxSlidePosition = this.el.nativeElement.offsetWidth - (this.el.nativeElement.offsetWidth / this.tabs.length);
        this.slides.speed = 250;
        this.render.setElementClass(this.slider.nativeElement, 'button-md-' + this.sliderColor, true);
        setTimeout(this.setHeights.bind(this), 100);
        const segmentButtonWidth = this.slides.renderedWidth / this.tabs.length;
        this.validSliderLocations = [];
        for (let i = 0; i < this.tabs.length; i++) {
            this.validSliderLocations.push(i * segmentButtonWidth);
        }
        this.slides.ionSlideTouchEnd.subscribe(() => this.ensureSliderLocationIsValid());
    }
    ngOnDestroy() {
        if (this.screenOrientationWatch && this.screenOrientationWatch.unsubscribe) {
            this.screenOrientationWatch.unsubscribe();
        }
    }
    onDrag(ev) {
        if (ev._translate > 0 || ev._translate < -((this.tabs.length - 1) * this.slides.renderedWidth)) {
            return;
        }
        const percentage = Math.abs(ev._translate / ev._virtualSize);
        const singleSlideSize = ev._renderedSize;
        let slidePosition = percentage * singleSlideSize;
        if (slidePosition > this.maxSlidePosition) {
            slidePosition = this.maxSlidePosition;
        }
        this.slidePosition = slidePosition + 'px';
    }
    onSlideWillChange() {
        if (this.slides.getActiveIndex() <= this.tabs.length) {
            this.shouldSlideEase = true;
            this.selectedTabIndex = this.slides.getActiveIndex();
        }
    }
    onSlideDidChange() {
        this.shouldSlideEase = false;
    }
    onTabSelect(index) {
        if (index <= this.tabs.length) {
            this.slides.slideTo(index);
        }
    }
    ensureSliderLocationIsValid() {
        if (this.validSliderLocations.indexOf(Number(this.slidePosition)) === -1) {
            this.shouldSlideEase = true;
            this.alignSlidePosition();
            setTimeout(() => this.shouldSlideEase = false, 250);
        }
    }
    alignSlidePosition() {
        let slidePosition = this.selectedTabIndex * this.slides.renderedWidth / this.tabs.length;
        this.slidePosition = slidePosition <= this.maxSlidePosition ? slidePosition + 'px' : this.maxSlidePosition + 'px';
    }
    setHeights() {
        this.slidesHeight = this.el.nativeElement.offsetHeight - this.toolbar.getNativeElement().offsetHeight;
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", ionic_angular_1.NavController)
], TabsCmp.prototype, "rootNavCtrl", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TabsCmp.prototype, "toolbarColor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TabsCmp.prototype, "tabsColor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], TabsCmp.prototype, "sliderColor", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], TabsCmp.prototype, "height", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], TabsCmp.prototype, "selectedTabIndex", null);
__decorate([
    core_1.ContentChildren(tab_1.TabCmp),
    __metadata("design:type", core_1.QueryList)
], TabsCmp.prototype, "slideTabs", void 0);
__decorate([
    core_1.ViewChild(ionic_angular_1.Slides),
    __metadata("design:type", ionic_angular_1.Slides)
], TabsCmp.prototype, "slides", void 0);
__decorate([
    core_1.ViewChild('toolbar'),
    __metadata("design:type", ionic_angular_1.Toolbar)
], TabsCmp.prototype, "toolbar", void 0);
__decorate([
    core_1.ViewChild('slide'),
    __metadata("design:type", core_1.ElementRef)
], TabsCmp.prototype, "slider", void 0);
TabsCmp = __decorate([
    core_1.Component({
        selector: 'ion-slide-tabs',
        template: `
    <ion-toolbar [color]="toolbarColor" #toolbar mode="md">
      <ion-segment [color]="tabsColor" [(ngModel)]="selectedTabIndex" mode="md">
        <ion-segment-button *ngFor="let tab of tabs; let i = index" [value]="i" (ionSelect)="onTabSelect(i)">
          <ion-icon *ngIf="tab.icon" [name]="tab.icon"></ion-icon>
          {{tab.title}}
        </ion-segment-button>
      </ion-segment>
      <div class="slide" #slide [style.left]="slidePosition" [class.ease]="shouldSlideEase" [style.width]="slideWidth"></div>
    </ion-toolbar>
    <ion-slides [style.height]="slidesHeight + 'px'" (ionSlideDrag)="onDrag($event)" (ionSlideWillChange)="onSlideWillChange()" (ionSlideDidChange)="onSlideDidChange()" [initialSlide]="selectedTabIndex">
      <ion-slide *ngFor="let tab of tabs">
          <ion-nav [root]="tab.tabRoot" [rootParams]="tab.navParams"></ion-nav>
      </ion-slide>
    </ion-slides>
  `
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer])
], TabsCmp);
exports.TabsCmp = TabsCmp;
//# sourceMappingURL=tabs.js.map