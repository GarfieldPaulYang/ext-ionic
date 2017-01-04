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
var forms_1 = require('@angular/forms');
exports.STAR_RATING_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return StarRatingCmp; }),
    multi: true
};
var StarRatingCmp = (function () {
    function StarRatingCmp() {
        this.half = true;
        this.max = 5;
        this.readonly = false;
        this.stars = [];
        this._value = -1;
        this.onTouchedCallback = function () { };
        this.onChangeCallback = function (_) { };
    }
    Object.defineProperty(StarRatingCmp.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (val) {
            var _this = this;
            if (val != this._value) {
                this._value = val;
                setTimeout(function () {
                    _this._updateStars();
                }, 10);
                this.onChangeCallback(val);
            }
        },
        enumerable: true,
        configurable: true
    });
    StarRatingCmp.prototype.out = function () {
        if (!this.readonly) {
            this.value = -1;
            this.writeValue(this.value);
        }
        this.onTouchedCallback();
    };
    StarRatingCmp.prototype.valchange = function (val) {
        if (!this.readonly) {
            this.writeValue(val);
        }
    };
    StarRatingCmp.prototype.writeValue = function (val) {
        if (this.value != val) {
            this.value = val;
        }
    };
    StarRatingCmp.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    StarRatingCmp.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    StarRatingCmp.prototype.ngOnDestroy = function () {
        this.onChangeCallback = null;
        this.onTouchedCallback = null;
    };
    StarRatingCmp.prototype._getStart = function (i) {
        var result = 'star';
        if (!this.value) {
            return result;
        }
        if (this.half && this.readonly) {
            var v = Math.round(this.value * 2) / 2;
            if (i <= v - 1) {
                return result + ' filled';
            }
            else if ((v > i) && (i < v + 1)) {
                return result + ' filled-half';
            }
            return result;
        }
        if (i < this.value) {
            return result + ' filled';
        }
        return result;
    };
    StarRatingCmp.prototype._updateStars = function () {
        this.stars = [];
        for (var i = 0; i < this.max; i++) {
            this.stars.push(this._getStart(i));
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], StarRatingCmp.prototype, "half", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], StarRatingCmp.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], StarRatingCmp.prototype, "readonly", void 0);
    StarRatingCmp = __decorate([
        core_1.Component({
            selector: 'ion-star-rating',
            template: "\n    <ul class=\"rating\" (mouseout)=\"out()\">\n      <li *ngFor=\"let star of stars; let i = index\" [class]=\"star\" (click)=\"valchange(i + 1)\" (mouseover)=\"valchange(i + 1)\"></li>\n    </ul>\n  ",
            providers: [exports.STAR_RATING_VALUE_ACCESSOR],
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], StarRatingCmp);
    return StarRatingCmp;
}());
exports.StarRatingCmp = StarRatingCmp;
//# sourceMappingURL=star-rating.js.map