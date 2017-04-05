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
var core_1 = require('@angular/core');
var tab_1 = require('./tab');
var ionic_angular_1 = require('ionic-angular');
var Observable_1 = require('rxjs/Observable');
var TabsCmp = (function () {
    function TabsCmp(el, render) {
        var _this = this;
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
        this.screenOrientationWatch = Observable_1.Observable.fromEvent(window, 'orientationchange').subscribe(function () { return _this.setHeights(); });
    }
    Object.defineProperty(TabsCmp.prototype, "height", {
        set: function (val) {
            this.render.setElementStyle(this.el.nativeElement, 'height', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabsCmp.prototype, "selectedTabIndex", {
        get: function () {
            return this._selectedTabIndex;
        },
        set: function (val) {
            this._selectedTabIndex = val;
            this.alignSlidePosition();
        },
        enumerable: true,
        configurable: true
    });
    TabsCmp.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.slideTabs.forEach(function (tab) {
            tab.navParams = tab.navParams || {};
            tab.navParams.rootNavCtrl = _this.rootNavCtrl;
            _this.tabs.push(tab);
        });
        this.slideWidth = this.el.nativeElement.offsetWidth / this.tabs.length + 'px';
        this.maxSlidePosition = this.el.nativeElement.offsetWidth - (this.el.nativeElement.offsetWidth / this.tabs.length);
        this.slides.speed = 250;
        this.render.setElementClass(this.slider.nativeElement, 'button-md-' + this.sliderColor, true);
        setTimeout(this.setHeights.bind(this), 100);
        var segmentButtonWidth = this.slides.renderedWidth / this.tabs.length;
        this.validSliderLocations = [];
        for (var i = 0; i < this.tabs.length; i++) {
            this.validSliderLocations.push(i * segmentButtonWidth);
        }
        this.slides.ionSlideTouchEnd.subscribe(function () { return _this.ensureSliderLocationIsValid(); });
    };
    TabsCmp.prototype.ngOnDestroy = function () {
        if (this.screenOrientationWatch && this.screenOrientationWatch.unsubscribe) {
            this.screenOrientationWatch.unsubscribe();
        }
    };
    TabsCmp.prototype.onDrag = function (ev) {
        if (ev._translate > 0 || ev._translate < -((this.tabs.length - 1) * this.slides.renderedWidth)) {
            return;
        }
        var percentage = Math.abs(ev._translate / ev._virtualSize);
        var singleSlideSize = ev._renderedSize;
        var slidePosition = percentage * singleSlideSize;
        if (slidePosition > this.maxSlidePosition) {
            slidePosition = this.maxSlidePosition;
        }
        this.slidePosition = slidePosition + 'px';
    };
    TabsCmp.prototype.onSlideWillChange = function () {
        if (this.slides.getActiveIndex() <= this.tabs.length) {
            this.shouldSlideEase = true;
            this.selectedTabIndex = this.slides.getActiveIndex();
        }
    };
    TabsCmp.prototype.onSlideDidChange = function () {
        this.shouldSlideEase = false;
    };
    TabsCmp.prototype.onTabSelect = function (index) {
        if (index <= this.tabs.length) {
            this.slides.slideTo(index);
        }
    };
    TabsCmp.prototype.ensureSliderLocationIsValid = function () {
        var _this = this;
        if (this.validSliderLocations.indexOf(Number(this.slidePosition)) === -1) {
            this.shouldSlideEase = true;
            this.alignSlidePosition();
            setTimeout(function () { return _this.shouldSlideEase = false; }, 250);
        }
    };
    TabsCmp.prototype.alignSlidePosition = function () {
        var slidePosition = this.selectedTabIndex * this.slides.renderedWidth / this.tabs.length;
        this.slidePosition = slidePosition <= this.maxSlidePosition ? slidePosition + 'px' : this.maxSlidePosition + 'px';
    };
    TabsCmp.prototype.setHeights = function () {
        this.slidesHeight = this.el.nativeElement.offsetHeight - this.toolbar.getNativeElement().offsetHeight;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', ionic_angular_1.NavController)
    ], TabsCmp.prototype, "rootNavCtrl", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TabsCmp.prototype, "toolbarColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TabsCmp.prototype, "tabsColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TabsCmp.prototype, "sliderColor", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], TabsCmp.prototype, "height", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], TabsCmp.prototype, "selectedTabIndex", null);
    __decorate([
        core_1.ContentChildren(tab_1.TabCmp), 
        __metadata('design:type', core_1.QueryList)
    ], TabsCmp.prototype, "slideTabs", void 0);
    __decorate([
        core_1.ViewChild(ionic_angular_1.Slides), 
        __metadata('design:type', ionic_angular_1.Slides)
    ], TabsCmp.prototype, "slides", void 0);
    __decorate([
        core_1.ViewChild('toolbar'), 
        __metadata('design:type', ionic_angular_1.Toolbar)
    ], TabsCmp.prototype, "toolbar", void 0);
    __decorate([
        core_1.ViewChild('slide'), 
        __metadata('design:type', core_1.ElementRef)
    ], TabsCmp.prototype, "slider", void 0);
    TabsCmp = __decorate([
        core_1.Component({
            selector: 'ion-slide-tabs',
            template: "\n    <ion-toolbar [color]=\"toolbarColor\" #toolbar mode=\"md\">\n      <ion-segment [color]=\"tabsColor\" [(ngModel)]=\"selectedTabIndex\" mode=\"md\">\n        <ion-segment-button *ngFor=\"let tab of tabs; let i = index\" [value]=\"i\" (ionSelect)=\"onTabSelect(i)\">\n          <ion-icon *ngIf=\"tab.icon\" [name]=\"tab.icon\"></ion-icon>\n          {{tab.title}}\n        </ion-segment-button>\n      </ion-segment>\n      <div class=\"slide\" #slide [style.left]=\"slidePosition\" [class.ease]=\"shouldSlideEase\" [style.width]=\"slideWidth\"></div>\n    </ion-toolbar>\n    <ion-slides [style.height]=\"slidesHeight + 'px'\" (ionSlideDrag)=\"onDrag($event)\" (ionSlideWillChange)=\"onSlideWillChange()\" (ionSlideDidChange)=\"onSlideDidChange()\" [initialSlide]=\"selectedTabIndex\">\n      <ion-slide *ngFor=\"let tab of tabs\">\n          <ion-nav [root]=\"tab.tabRoot\" [rootParams]=\"tab.navParams\"></ion-nav>\n      </ion-slide>\n    </ion-slides>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], TabsCmp);
    return TabsCmp;
}());
exports.TabsCmp = TabsCmp;
//# sourceMappingURL=tabs.js.map