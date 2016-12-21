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
var core_1 = require('@angular/core');
var ionic_angular_1 = require('ionic-angular');
var _ = require('lodash');
var order_by_1 = require('../../pipes/order-by');
var AlphaScroll = (function () {
    function AlphaScroll(_content, _elementRef, orderBy) {
        this._content = _content;
        this._elementRef = _elementRef;
        this.orderBy = orderBy;
        this.sortedItems = {};
        this.alphabet = [];
        this.ionAlphaScrollRef = this;
    }
    AlphaScroll.prototype.ngOnInit = function () {
        var _this = this;
        this.alphaScrollTemplate = "\n      <ion-scroll class=\"ion-alpha-scroll\" [ngStyle]=\"ionAlphaScrollRef.calculateScrollDimensions()\" scrollX=\"false\" scrollY=\"true\">\n        <ion-item-group class=\"ion-alpha-list-outer\">\n          <div *ngFor=\"let items of ionAlphaScrollRef.sortedItems | mapToIterable; trackBy:ionAlphaScrollRef.trackBySortedItems\">\n            <ion-item-divider id=\"scroll-letter-{{items.key}}\">{{items.key}}</ion-item-divider>\n            <div *ngFor=\"let item of items.value\">\n              " + this.itemTemplate + "\n            </div>\n          </div>\n        </ion-item-group>\n      </ion-scroll>\n      <ul class=\"ion-alpha-sidebar\" [ngStyle]=\"ionAlphaScrollRef.calculateDimensionsForSidebar()\">\n        <li *ngFor=\"let alpha of ionAlphaScrollRef.alphabet\" [class]=\"alpha.isActive ? 'ion-alpha-active' : 'ion-alpha-invalid'\" tappable (click)=\"ionAlphaScrollRef.alphaScrollGoToList(alpha.letter)\">\n        <a>{{alpha.letter}}</a>\n        </li>\n      </ul>\n      <div class=\"ion-alpha-letter-indicator\"></div>\n   ";
        setTimeout(function () {
            _this._scrollEle = _this._elementRef.nativeElement.querySelector('.scroll-content');
            _this._letterIndicatorEle = _this._elementRef.nativeElement.querySelector('.ion-alpha-letter-indicator');
            _this._indicatorWidth = _this._letterIndicatorEle.offsetWidth;
            _this._indicatorHeight = _this._letterIndicatorEle.offsetHeight;
            _this.setupHammerHandlers();
        });
    };
    AlphaScroll.prototype.ngOnChanges = function () {
        var sortedListData = this.orderBy.transform(this.listData, [this.key]);
        this.sortedItems = this.groupItems(sortedListData);
        this.alphabet = this.iterateAlphabet(this.sortedItems);
    };
    AlphaScroll.prototype.ngOnDestroy = function () {
        this._letterIndicatorEle.remove();
    };
    AlphaScroll.prototype.calculateScrollDimensions = function () {
        var dimensions = this._content.getContentDimensions();
        return {
            height: dimensions.scrollHeight + 'px',
            width: (dimensions.contentWidth - 20) + 'px'
        };
    };
    AlphaScroll.prototype.calculateDimensionsForSidebar = function () {
        return {
            top: this._content.contentTop + 'px',
            height: (this._content.getContentDimensions().contentHeight - 24) + 'px'
        };
    };
    AlphaScroll.prototype.alphaScrollGoToList = function (letter) {
        if (!this.groupItems[letter]) {
            return;
        }
        var ele = this._elementRef.nativeElement.querySelector("#scroll-letter-" + letter);
        var offsetY = ele.offsetTop;
        this._scrollEle.scrollTop = offsetY;
    };
    AlphaScroll.prototype.trackBySortedItems = function (index, item) {
        return index;
    };
    AlphaScroll.prototype.setupHammerHandlers = function () {
        var _this = this;
        var sidebarEle = this._elementRef.nativeElement.querySelector('.ion-alpha-sidebar');
        if (!sidebarEle)
            return;
        var mcHammer = new Hammer(sidebarEle, {
            recognizers: [
                [Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }],
            ]
        });
        mcHammer.on('panstart', function (e) {
            _this._letterIndicatorEle.style.top = ((_this._content.getContentDimensions().contentHeight - _this._indicatorHeight) / 2) + 'px';
            _this._letterIndicatorEle.style.left = ((window.innerWidth - _this._indicatorWidth) / 2) + 'px';
            _this._letterIndicatorEle.style.visibility = 'visible';
        });
        mcHammer.on('panend', function (e) {
            _this._letterIndicatorEle.style.visibility = 'hidden';
        });
        mcHammer.on('panup pandown', function (e) {
            var closestEle = document.elementFromPoint(e.center.x, e.center.y);
            if (closestEle && ['LI', 'A'].indexOf(closestEle.tagName) > -1) {
                var letter = closestEle.innerText;
                _this._letterIndicatorEle.innerText = letter;
                var letterDivider = _this._elementRef.nativeElement.querySelector("#scroll-letter-" + letter);
                if (letterDivider) {
                    _this._scrollEle.scrollTop = letterDivider.offsetTop;
                }
            }
        });
    };
    AlphaScroll.prototype.iterateAlphabet = function (alphabet) {
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = [];
        for (var i = 0; i < str.length; i++) {
            var letter = str.charAt(i);
            var isActive = alphabet[letter] ? true : false;
            result.push({ letter: letter, isActive: isActive });
        }
        return result;
    };
    AlphaScroll.prototype.groupItems = function (sortedListData) {
        var result = {};
        for (var i = 0; i < sortedListData.length; i++) {
            var listValue = _.get(sortedListData[i], this.key);
            var letter = listValue.toUpperCase().charAt(0);
            if (typeof result[letter] === 'undefined') {
                result[letter] = [];
            }
            result[letter].push(sortedListData[i]);
        }
        return result;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AlphaScroll.prototype, "listData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AlphaScroll.prototype, "key", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AlphaScroll.prototype, "itemTemplate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AlphaScroll.prototype, "currentPageClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AlphaScroll.prototype, "triggerChange", void 0);
    AlphaScroll = __decorate([
        core_1.Component({
            selector: 'ion-alpha-scroll',
            template: "\n    <template dynamic-component [componentTemplate]=\"alphaScrollTemplate\" [componentContext]=\"ionAlphaScrollRef\"></template>\n  "
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [ionic_angular_1.Content, core_1.ElementRef, order_by_1.OrderBy])
    ], AlphaScroll);
    return AlphaScroll;
}());
exports.AlphaScroll = AlphaScroll;
//# sourceMappingURL=alpha-scroll.js.map