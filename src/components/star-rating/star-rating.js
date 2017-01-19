"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var lodash_1 = require('lodash');
exports.STAR_RATING_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return StarRatingCmp; }),
    multi: true
};
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
        if (lodash_1.isUndefined(val)) {
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
        this.hammer.on('panleft panright', lodash_1.throttle(function (e) {
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
    StarRatingCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ion-star-rating',
                    template: "\n    <ul class=\"rating\">\n      <li *ngFor=\"let r of range; let i = index\" tappable (click)=\"rate(i + 1)\" attr.index=\"{{i + 1}}\">\n        <ion-icon [name]=\"setIcon(r)\"></ion-icon>\n      </li>\n    </ul>\n  ",
                    providers: [exports.STAR_RATING_VALUE_ACCESSOR]
                },] },
    ];
    StarRatingCmp.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    StarRatingCmp.propDecorators = {
        'max': [{ type: core_1.Input },],
        'readonly': [{ type: core_1.Input },],
    };
    return StarRatingCmp;
}());
exports.StarRatingCmp = StarRatingCmp;
//# sourceMappingURL=star-rating.js.map