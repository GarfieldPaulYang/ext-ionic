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
var AlphaScroll = (function () {
    function AlphaScroll(_content, _elementRef, vcRef) {
        this._content = _content;
        this._elementRef = _elementRef;
        this.vcRef = vcRef;
        this.sortedItems = {};
        this.alphabet = [];
        this.ionAlphaScrollRef = this;
    }
    AlphaScroll.prototype.ngOnInit = function () {
        var _this = this;
        this.alphaScrollTemplate = "\n      <style>\n        .ion-alpha-sidebar {\n          position: fixed;\n          right: 0;\n          display: flex;\n          flex-flow: column;\n          z-index: 50000;\n        }\n\n        .ion-alpha-sidebar li {\n          flex: 1 1 auto;\n          list-style: none;\n          width: 15px;\n          text-align: center;\n        }\n      </style>\n      \n      <ion-scroll class=\"ion-alpha-scroll\" [ngStyle]=\"ionAlphaScrollRef.calculateScrollDimensions()\" scrollX=\"false\" scrollY=\"true\">\n        <ion-item-group class=\"ion-alpha-list-outer\">\n          <div *ngFor=\"let items of ionAlphaScrollRef.sortedItems | mapToIterable; trackBy:ionAlphaScrollRef.trackBySortedItems\">\n            <ion-item-divider id=\"scroll-letter-{{items.key}}\">{{items.key}}</ion-item-divider>\n            <div *ngFor=\"let item of items.value\">\n              " + this.itemTemplate + "\n            </div>\n          </div>\n        </ion-item-group>\n      </ion-scroll>\n      <ul class=\"ion-alpha-sidebar\" [ngStyle]=\"ionAlphaScrollRef.calculateDimensionsForSidebar()\">\n        <li *ngFor=\"let letter of ionAlphaScrollRef.alphabet\" tappable (click)=\"ionAlphaScrollRef.alphaScrollGoToList(letter)\">\n        <a>{{letter}}</a>\n        </li>\n      </ul>\n   ";
        setTimeout(function () {
            _this._scrollEle = _this._elementRef.nativeElement.querySelector('.scroll-content');
            _this.setupHammerHandlers();
        });
    };
    AlphaScroll.prototype.ngOnChanges = function (changes) {
        var tmp = {};
        for (var i = 0; i < this.listData.length; i++) {
            var listValue = _.get(this.listData[i], this.key);
            var letter = listValue.toUpperCase().charAt(0);
            if (typeof tmp[letter] === 'undefined') {
                tmp[letter] = [];
            }
            tmp[letter].push(this.listData[i]);
        }
        this.alphabet = this.iterateAlphabet(tmp);
        this.sortedItems = tmp;
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
            height: (this._content.getContentDimensions().contentHeight - this._content.contentTop - 70) + 'px'
        };
    };
    AlphaScroll.prototype.alphaScrollGoToList = function (letter) {
        var ele = this._elementRef.nativeElement.querySelector("#scroll-letter-" + letter);
        var offsetY = ele.offsetTop;
        this._scrollEle.scrollTop = offsetY;
    };
    AlphaScroll.prototype.iterateAlphabet = function (alphabet) {
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var numbers = [];
        if (Object.keys(alphabet).length > 0) {
            str = '';
            for (var i = 0; i < Object.keys(alphabet).length; i++) {
                str += Object.keys(alphabet)[i];
            }
        }
        for (var i = 0; i < str.length; i++) {
            var nextChar = str.charAt(i);
            numbers.push(nextChar);
        }
        return numbers;
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
        mcHammer.on('panup pandown', _.throttle(function (e) {
            var closestEle = document.elementFromPoint(e.center.x, e.center.y);
            if (closestEle && ['LI', 'A'].indexOf(closestEle.tagName) > -1) {
                var letter = closestEle.innerText;
                var letterDivider = _this._elementRef.nativeElement.querySelector("#scroll-letter-" + letter);
                if (letterDivider) {
                    _this._scrollEle.scrollTop = letterDivider.offsetTop;
                }
            }
        }, 50));
    };
    AlphaScroll.prototype.trackBySortedItems = function (index, item) {
        return index;
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
            template: "\n    <div *dynamicComponent=\"alphaScrollTemplate; context: ionAlphaScrollRef;\"></div>\n  "
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [ionic_angular_1.Content, core_1.ElementRef, core_1.ViewContainerRef])
    ], AlphaScroll);
    return AlphaScroll;
}());
exports.AlphaScroll = AlphaScroll;
//# sourceMappingURL=alpha-scroll.js.map