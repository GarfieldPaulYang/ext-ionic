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
  private _scrollEle: HTMLElement;
  private _letterIndicatorEle: HTMLElement;
  private _indicatorHeight: number;
  private _indicatorWidth: number;
  sortedItems: any = {};
  alphabet: any = [];
  ionAlphaScrollRef = this;
  alphaScrollTemplate: string;

  constructor( @Host() private _content: Content, private _elementRef: ElementRef, private orderBy: OrderBy) {
  }

  ngOnInit() {
    this.alphaScrollTemplate = `
      <ion-scroll class="ion-alpha-scroll" [ngStyle]="ionAlphaScrollRef.calculateScrollDimensions()" scrollX="false" scrollY="true">
        <ion-item-group class="ion-alpha-list-outer">
          <div *ngFor="let items of ionAlphaScrollRef.sortedItems | mapToIterable; trackBy:ionAlphaScrollRef.trackBySortedItems">
            <ion-item-divider id="scroll-letter-{{items.key}}">{{items.key}}</ion-item-divider>
            <div *ngFor="let item of items.value">
              ${this.itemTemplate}
            </div>
          </div>
        </ion-item-group>
      </ion-scroll>
      <ul class="ion-alpha-sidebar" [ngStyle]="ionAlphaScrollRef.calculateDimensionsForSidebar()">
        <li *ngFor="let alpha of ionAlphaScrollRef.alphabet" [class]="alpha.isActive ? 'ion-alpha-active' : 'ion-alpha-invalid'" tappable (click)="ionAlphaScrollRef.alphaScrollGoToList(alpha.letter)">
        <a>{{alpha.letter}}</a>
        </li>
      </ul>
      <div class="ion-alpha-letter-indicator"></div>
   `;

    setTimeout(() => {
      this._scrollEle = this._elementRef.nativeElement.querySelector('.scroll-content');
      this._letterIndicatorEle = this._elementRef.nativeElement.querySelector('.ion-alpha-letter-indicator');
      this._indicatorWidth = this._letterIndicatorEle.offsetWidth;
      this._indicatorHeight = this._letterIndicatorEle.offsetHeight;
      this.setupHammerHandlers();
    });
  }

  ngOnChanges() {
    let sortedListData: Array<any> = this.orderBy.transform(this.listData, [this.key]);
    this.sortedItems = this.groupItems(sortedListData);
    this.alphabet = this.iterateAlphabet(this.sortedItems);
  }

  ngOnDestroy() {
    this._letterIndicatorEle.remove();
  }

  calculateScrollDimensions() {
    let dimensions = this._content.getContentDimensions();
    return {
      height: dimensions.scrollHeight + 'px',
      width: (dimensions.contentWidth - 20) + 'px'
    };
  }

  calculateDimensionsForSidebar() {
    return {
      top: this._content.contentTop + 'px',
      height: (this._content.getContentDimensions().contentHeight - 24) + 'px'
    }
  }

  alphaScrollGoToList(letter: any) {
    if (!this.groupItems[letter]) {
      return;
    }

    let ele: any = this._elementRef.nativeElement.querySelector(`#scroll-letter-${letter}`);
    let offsetY = ele.offsetTop;
    this._scrollEle.scrollTop = offsetY;
  }

  trackBySortedItems(index: number, item: any): number {
    return index;
  }

  private setupHammerHandlers() {
    let sidebarEle: HTMLElement = this._elementRef.nativeElement.querySelector('.ion-alpha-sidebar');

    if (!sidebarEle) return;

    let mcHammer = new Hammer(sidebarEle, {
      recognizers: [
        // RecognizerClass, [options], [recognizeWith, ...], [requireFailure, ...]
        [Hammer.Pan, { direction: Hammer.DIRECTION_VERTICAL }],
      ]
    });

    mcHammer.on('panstart', (e: any) => {
      this._letterIndicatorEle.style.top = ((this._content.getContentDimensions().contentHeight - this._indicatorHeight) / 2) + 'px';
      this._letterIndicatorEle.style.left = ((window.innerWidth - this._indicatorWidth) / 2) + 'px';
      this._letterIndicatorEle.style.visibility = 'visible';
    });

    mcHammer.on('panend', (e: any) => {
      this._letterIndicatorEle.style.visibility = 'hidden';
    });

    mcHammer.on('panup pandown', (e: any) => {
      let closestEle: any = document.elementFromPoint(e.center.x, e.center.y);
      if (closestEle && ['LI', 'A'].indexOf(closestEle.tagName) > -1) {
        let letter = closestEle.innerText;
        this._letterIndicatorEle.innerText = letter;
        let letterDivider: any = this._elementRef.nativeElement.querySelector(`#scroll-letter-${letter}`);
        if (letterDivider) {
          this._scrollEle.scrollTop = letterDivider.offsetTop;
        }
      }
    });
  }

  private iterateAlphabet(alphabet: any) {
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