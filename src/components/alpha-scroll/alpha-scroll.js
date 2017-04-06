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
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const core_1 = require("@angular/core");
const ionic_angular_1 = require("ionic-angular");
const order_by_1 = require("../../pipes/order-by");
let AlphaScroll = class AlphaScroll {
    constructor(elementRef, orderBy, content) {
        this.elementRef = elementRef;
        this.orderBy = orderBy;
        this.content = content;
        this.sortedItems = [];
        this.alphabet = [];
        this.letterIndicatorEle = document.createElement('div');
        this.letterIndicatorEle.className = 'ion-alpha-letter-indicator';
        let body = document.getElementsByTagName('body')[0];
        body.appendChild(this.letterIndicatorEle);
    }
    ngOnInit() {
        setTimeout(() => {
            this.indicatorWidth = this.letterIndicatorEle.offsetWidth;
            this.indicatorHeight = this.letterIndicatorEle.offsetHeight;
            this.setupHammerHandlers();
        });
    }
    ngOnChanges() {
        let sortedListData = this.orderBy.transform(this.listData, [this.key]);
        let groupItems = _.groupBy(sortedListData, item => {
            let letter = _.get(item, this.key);
            return letter.toUpperCase().charAt(0);
        });
        this.sortedItems = this.unwindGroup(groupItems);
        this.alphabet = this.iterateAlphabet(groupItems);
    }
    ngOnDestroy() {
        if (this.letterIndicatorEle) {
            this.letterIndicatorEle.remove();
        }
        if (this.hammer) {
            this.hammer.destroy();
        }
    }
    setAlphaClass(alpha) {
        return alpha.isActive ? 'ion-alpha-active' : 'ion-alpha-invalid';
    }
    calculateDimensionsForSidebar() {
        return {
            top: this.content.contentTop + 'px',
            height: (this.content.getContentDimensions().contentHeight - 28) + 'px'
        };
    }
    alphaScrollGoToList(letter) {
        let ele = this.elementRef.nativeElement.querySelector(`#scroll-letter-${letter}`);
        if (ele) {
            this.content.scrollTo(0, ele.offsetTop);
        }
    }
    setupHammerHandlers() {
        let sidebarEle = this.elementRef.nativeElement.querySelector('.ion-alpha-sidebar');
        if (!sidebarEle)
            return;
        this.hammer = new Hammer(sidebarEle, {
            recognizers: [
                [Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }],
            ]
        });
        this.hammer.on('panstart', (e) => {
            this.letterIndicatorEle.style.top = ((window.innerHeight - this.indicatorHeight) / 2) + 'px';
            this.letterIndicatorEle.style.left = ((window.innerWidth - this.indicatorWidth) / 2) + 'px';
            this.letterIndicatorEle.style.visibility = 'visible';
        });
        this.hammer.on('panend pancancel', (e) => {
            this.letterIndicatorEle.style.visibility = 'hidden';
        });
        this.hammer.on('panup pandown', _.throttle((e) => {
            let closestEle = document.elementFromPoint(e.center.x, e.center.y);
            if (closestEle && ['LI', 'A'].indexOf(closestEle.tagName) > -1) {
                let letter = closestEle.innerText;
                this.letterIndicatorEle.innerText = letter;
                let letterDivider = this.elementRef.nativeElement.querySelector(`#scroll-letter-${letter}`);
                if (letterDivider) {
                    this.content.scrollTo(0, letterDivider.offsetTop);
                }
            }
        }, 50));
    }
    unwindGroup(groupItems) {
        let result = [];
        for (let letter in groupItems) {
            result = result.concat([{ isDivider: true, letter: letter }].concat(groupItems[letter]));
        }
        return result;
    }
    iterateAlphabet(alphabet) {
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = [];
        for (let i = 0; i < str.length; i++) {
            let letter = str.charAt(i);
            let isActive = alphabet[letter] ? true : false;
            result.push({ letter: letter, isActive: isActive });
        }
        return result;
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AlphaScroll.prototype, "listData", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AlphaScroll.prototype, "key", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", core_1.TemplateRef)
], AlphaScroll.prototype, "itemTemplate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AlphaScroll.prototype, "currentPageClass", void 0);
AlphaScroll = __decorate([
    core_1.Component({
        selector: 'ion-alpha-scroll',
        template: `
    <ion-list class="ion-alpha-list">
      <div *ngFor="let item of sortedItems">
        <ion-item-divider id="scroll-letter-{{item.letter}}" *ngIf="item.isDivider">{{item.letter}}</ion-item-divider>
        <ng-template [ngTemplateOutlet]="itemTemplate" [ngOutletContext]="{'item': item, 'currentPageClass': currentPageClass}" *ngIf="!item.isDivider">
        </ng-template>
      </div>
    </ion-list>
    <ul class="ion-alpha-sidebar" [ngStyle]="calculateDimensionsForSidebar()">
      <li *ngFor="let alpha of alphabet" [class]="setAlphaClass(alpha)" tappable (click)="alphaScrollGoToList(alpha.letter)">
        <a>{{alpha.letter}}</a>
      </li>
    </ul>
  `
    }),
    __param(2, core_1.Host()),
    __metadata("design:paramtypes", [core_1.ElementRef, order_by_1.OrderBy, ionic_angular_1.Content])
], AlphaScroll);
exports.AlphaScroll = AlphaScroll;
//# sourceMappingURL=alpha-scroll.js.map