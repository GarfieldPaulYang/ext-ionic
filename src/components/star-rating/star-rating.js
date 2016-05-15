import { Component, Input, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _ from 'lodash';
var StarRatingCmp = (function () {
    function StarRatingCmp(elementRef) {
        this.elementRef = elementRef;
        this.max = 5;
        this.readonly = false;
        this.onChangeCallback = function () { };
    }
    Object.defineProperty(StarRatingCmp.prototype, "value", {
        get: function () {
            return this.innerValue;
        },
        set: function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.fullStates();
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    StarRatingCmp.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.setupHammerHandlers();
        });
    };
    StarRatingCmp.prototype.ngOnDestroy = function () {
        if (this.hammer) {
            this.hammer.destroy();
        }
    };
    StarRatingCmp.prototype.setIcon = function (r) {
        if (r === 1) {
            return 'star';
        }
        if (r === 2) {
            return 'star-half';
        }
        return 'star-outline';
    };
    StarRatingCmp.prototype.writeValue = function (val) {
        if (_.isUndefined(val)) {
            return;
        }
        if (val !== this.innerValue) {
            this.innerValue = val;
            this.fullStates();
        }
    };
    StarRatingCmp.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    StarRatingCmp.prototype.registerOnTouched = function (fn) { };
    StarRatingCmp.prototype.setDisabledState = function (isDisabled) { };
    StarRatingCmp.prototype.rate = function (amount) {
        if (this.readonly) {
            return;
        }
        if (this.range[amount - 1] === 1) {
            amount = amount - 1;
        }
        this.value = amount;
    };
    StarRatingCmp.prototype.setupHammerHandlers = function () {
        var _this = this;
        var ratingEle = this.elementRef.nativeElement.querySelector('.rating');
        if (!ratingEle)
            return;
        this.hammer = new Hammer(ratingEle, {
            recognizers: [
                [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }],
            ]
        });
        this.hammer.on('panleft panright', _.throttle(function (e) {
            var closestEle = document.elementFromPoint(e.center.x, e.center.y);
            if (closestEle && ['LI'].indexOf(closestEle.tagName) > -1) {
                _this.rate(Number(closestEle.getAttribute('index')));
            }
        }, 50));
    };
    StarRatingCmp.prototype.fullStates = function () {
        var states = [];
        for (var i = 0; i < this.max; i++) {
            if (this.value > i && this.value < i + 1) {
                states[i] = 2;
            }
            else if (this.value > i) {
                states[i] = 1;
            }
            else {
                states[i] = 0;
            }
        }
        this.range = states;
    };
    return StarRatingCmp;
}());
export { StarRatingCmp };
StarRatingCmp.decorators = [
    { type: Component, args: [{
                selector: 'ion-star-rating',
                template: "\n    <ul class=\"rating\">\n      <li *ngFor=\"let r of range; let i = index\" tappable (click)=\"rate(i + 1)\" attr.index=\"{{i + 1}}\">\n        <ion-icon [name]=\"setIcon(r)\"></ion-icon>\n      </li>\n    </ul>\n  ",
                providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: StarRatingCmp, multi: true }]
            },] },
];
/** @nocollapse */
StarRatingCmp.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
StarRatingCmp.propDecorators = {
    'max': [{ type: Input },],
    'readonly': [{ type: Input },],
};
//# sourceMappingURL=star-rating.js.map