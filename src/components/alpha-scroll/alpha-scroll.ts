import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  Host,
  Input,
  ElementRef
} from '@angular/core';
import { Content, Scroll } from 'ionic-angular';
import * as _ from 'lodash';

import { OrderBy } from '../../pipes/order-by';

@Component({
  selector: 'ion-alpha-scroll',
  template: `
    <template dynamic-component [componentTemplate]="alphaScrollTemplate" [componentContext]="ionAlphaScrollRef"></template>
  `
})
export class AlphaScroll implements OnInit, OnChanges, OnDestroy {
  @Input() listData: any;
  @Input() key: string;
  @Input() itemTemplate: string;
  @Input() currentPageClass: any;
  @Input() triggerChange: any;
  private _letterIndicatorEle: HTMLElement;
  private _indicatorHeight: number;
  private _indicatorWidth: number;
  private _hammer: HammerManager;
  sortedItems: any = [];
  alphabet: any = [];
  ionAlphaScrollRef = this;
  alphaScrollTemplate: string;

  constructor( @Host() private _content: Content, private _elementRef: ElementRef, private orderBy: OrderBy) {
    this._letterIndicatorEle = document.createElement("div");
    this._letterIndicatorEle.className = 'ion-alpha-letter-indicator';
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(this._letterIndicatorEle);
  }

  ngOnInit() {
    this.alphaScrollTemplate = `
      <ion-list class="ion-alpha-list">
        <ion-item-group class="ion-alpha-item-group">
          <div *ngFor="let item of ionAlphaScrollRef.sortedItems">
            <ion-item-divider id="scroll-letter-{{item.letter}}" *ngIf="item.isDivider">{{item.letter}}</ion-item-divider>
            <div *ngIf="!item.isDivider">
            ${this.itemTemplate}
            </div>
          </div>
        </ion-item-group>
      </ion-list>
      <ul class="ion-alpha-sidebar" [ngStyle]="ionAlphaScrollRef.calculateDimensionsForSidebar()">
        <li *ngFor="let alpha of ionAlphaScrollRef.alphabet" [class]="alpha.isActive ? 'ion-alpha-active' : 'ion-alpha-invalid'" tappable (click)="ionAlphaScrollRef.alphaScrollGoToList(alpha.letter)">
        <a>{{alpha.letter}}</a>
        </li>
      </ul>
      <div class="ion-alpha-letter-indicator"></div>
   `;

    setTimeout(() => {
      this._indicatorWidth = this._letterIndicatorEle.offsetWidth;
      this._indicatorHeight = this._letterIndicatorEle.offsetHeight;
      this.setupHammerHandlers();
    });
  }

  ngOnChanges() {
    let sortedListData: Array<any> = this.orderBy.transform(this.listData, [this.key]);
    let groupItems: any = this.groupItems(sortedListData);
    this.sortedItems = this.unwindGroup(groupItems);
    this.alphabet = this.iterateAlphabet(groupItems);
  }

  ngOnDestroy() {
    if (this._letterIndicatorEle) {
      this._letterIndicatorEle.remove();
    }

    if (this._hammer) {
      this._hammer.destroy();
    }
  }

  calculateDimensionsForSidebar() {
    return {
      top: this._content.contentTop + 'px',
      height: (this._content.getContentDimensions().contentHeight - 28) + 'px'
    }
  }

  alphaScrollGoToList(letter: any) {
    let ele: any = this._elementRef.nativeElement.querySelector(`#scroll-letter-${letter}`);
    if (ele) {
      this._content.scrollTo(0, ele.offsetTop);
    }
  }

  private setupHammerHandlers() {
    let sidebarEle: HTMLElement = this._elementRef.nativeElement.querySelector('.ion-alpha-sidebar');

    if (!sidebarEle) return;

    this._hammer = new Hammer(sidebarEle, {
      recognizers: [
        [Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }],
      ]
    });

    this._hammer.on('panstart', (e: any) => {
      this._letterIndicatorEle.style.top = ((window.innerHeight - this._indicatorHeight) / 2) + 'px';
      this._letterIndicatorEle.style.left = ((window.innerWidth - this._indicatorWidth) / 2) + 'px';
      this._letterIndicatorEle.style.visibility = 'visible';
    });

    this._hammer.on('panend pancancel', (e: any) => {
      this._letterIndicatorEle.style.visibility = 'hidden';
    });

    this._hammer.on('panup pandown', _.throttle((e: any) => {
      let closestEle: any = document.elementFromPoint(e.center.x, e.center.y);
      if (closestEle && ['LI', 'A'].indexOf(closestEle.tagName) > -1) {
        let letter = closestEle.innerText;
        this._letterIndicatorEle.innerText = letter;
        let letterDivider: any = this._elementRef.nativeElement.querySelector(`#scroll-letter-${letter}`);
        if (letterDivider) {
          this._content.scrollTo(0, letterDivider.offsetTop);
        }
      }
    }, 50));
  }

  private unwindGroup(groupItems: any): Array<any> {
    let result: Array<any> = [];
    for (let letter in groupItems) {
      result = result.concat([{ isDivider: true, letter: letter }].concat(groupItems[letter]));
    }
    return result;
  }

  private iterateAlphabet(alphabet: any): Array<any> {
    let str: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result: Array<any> = [];
    for (var i = 0; i < str.length; i++) {
      var letter = str.charAt(i);
      var isActive = alphabet[letter] ? true : false;
      result.push({ letter: letter, isActive: isActive });
    }
    return result;
  }

  private groupItems(sortedListData: Array<any>): any {
    let result: any = {};
    for (let i = 0; i < sortedListData.length; i++) {
      let listValue: any = _.get(sortedListData[i], this.key);
      let letter = listValue.toUpperCase().charAt(0);
      if (typeof result[letter] === 'undefined') {
        result[letter] = [];
      }
      result[letter].push(sortedListData[i]);
    }
    return result;
  }
}