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
const forms_1 = require("@angular/forms");
const _ = require("lodash");
exports.STAR_RATING_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(() => StarRatingCmp),
    multi: true
};
let StarRatingCmp = class StarRatingCmp {
    constructor(elementRef) {
        this.elementRef = elementRef;
        this.max = 5;
        this.readonly = false;
        this.onChangeCallback = () => { };
    }
    get value() {
        return this.innerValue;
    }
    set value(v) {
        if (v !== this.innerValue) {
            this.innerValue = v;
            this.fullStates();
            this.onChangeCallback(v);
        }
    }
    ngOnInit() {
        setTimeout(() => {
            this.setupHammerHandlers();
        });
    }
    ngOnDestroy() {
        if (this.hammer) {
            this.hammer.destroy();
        }
    }
    setIcon(r) {
        if (r === 1) {
            return 'star';
        }
        if (r === 2) {
            return 'star-half';
        }
        return 'star-outline';
    }
    writeValue(val) {
        if (_.isUndefined(val)) {
            return;
        }
        if (val !== this.innerValue) {
            this.innerValue = val;
            this.fullStates();
        }
    }
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    registerOnTouched(fn) { }
    rate(amount) {
        if (this.readonly) {
            return;
        }
        if (this.range[amount - 1] === 1) {
            amount = amount - 1;
        }
        this.value = amount;
    }
    setupHammerHandlers() {
        let ratingEle = this.elementRef.nativeElement.querySelector('.rating');
        if (!ratingEle)
            return;
        this.hammer = new Hammer(ratingEle, {
            recognizers: [
                [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }],
            ]
        });
        this.hammer.on('panleft panright', _.throttle((e) => {
            let closestEle = document.elementFromPoint(e.center.x, e.center.y);
            if (closestEle && ['LI'].indexOf(closestEle.tagName) > -1) {
                this.rate(Number(closestEle.getAttribute('index')));
            }
        }, 50));
    }
    fullStates() {
        let states = [];
        for (let i = 0; i < this.max; i++) {
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
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], StarRatingCmp.prototype, "max", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], StarRatingCmp.prototype, "readonly", void 0);
StarRatingCmp = __decorate([
    core_1.Component({
        selector: 'ion-star-rating',
        template: `
    <ul class="rating">
      <li *ngFor="let r of range; let i = index" tappable (click)="rate(i + 1)" attr.index="{{i + 1}}">
        <ion-icon [name]="setIcon(r)"></ion-icon>
      </li>
    </ul>
  `,
        providers: [exports.STAR_RATING_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], StarRatingCmp);
exports.StarRatingCmp = StarRatingCmp;
//# sourceMappingURL=star-rating.js.map