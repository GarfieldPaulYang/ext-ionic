import { Component, OnInit, OnDestroy, Input, forwardRef, ElementRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isUndefined } from 'ionic-angular/util/util';

import * as _ from 'lodash';

export const STAR_RATING_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StarRatingCmp),
  multi: true
};

@Component({
  selector: 'ion-star-rating',
  template: `
    <ul class="rating">
      <li *ngFor="let r of range; let i = index" tappable (click)="rate(i + 1)" attr.index="{{i + 1}}">
        <ion-icon [name]="setIcon(r)"></ion-icon>
      </li>
    </ul>
  `,
  providers: [STAR_RATING_VALUE_ACCESSOR]
})
export class StarRatingCmp implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() max: number = 5;
  @Input() readonly: boolean = false;

  private range: Array<number>;
  private innerValue: number;
  private _hammer: HammerManager;
  private onChangeCallback: (_: any) => void = () => { };

  get value(): number {
    return this.innerValue;
  }

  set value(v: number) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.fullStates();
      this.onChangeCallback(v);
    }
  }

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() {
    setTimeout(() => {
      this.setupHammerHandlers();
    });
  }
  ngOnDestroy() {
    if (this._hammer) {
      this._hammer.destroy();
    }
  }

  setIcon(r: number): string {
    if (r === 1) {
      return 'star';
    }

    if (r === 2) {
      return 'star-half';
    }

    return 'star-outline';
  }

  writeValue(val: any) {
    if (isUndefined(val)) {
      return;
    }

    if (val !== this.innerValue) {
      this.innerValue = val;
      this.fullStates();
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) { }

  rate(amount: number) {
    if (this.readonly) {
      return;
    }

    if (this.range[amount - 1] === 1) {
      amount = amount - 1;
    }

    this.value = amount;
  }

  private setupHammerHandlers() {
    let ratingEle: HTMLElement = this._elementRef.nativeElement.querySelector('.rating');

    if (!ratingEle) return;

    this._hammer = new Hammer(ratingEle, {
      recognizers: [
        [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }],
      ]
    });

    this._hammer.on('panleft panright', _.throttle((e: any) => {
      let closestEle: Element = document.elementFromPoint(e.center.x, e.center.y);
      if (closestEle && ['LI'].indexOf(closestEle.tagName) > -1) {
        this.rate(Number(closestEle.getAttribute('index')));
      }
    }, 50));
  }

  private fullStates(): void {
    let states: Array<number> = [];
    for (let i = 0; i < this.max; i++) {
      if (this.value > i && this.value < i + 1) {
        states[i] = 2;
      } else if (this.value > i) {
        states[i] = 1;
      } else {
        states[i] = 0;
      }
    }
    this.range = states;
  }
}