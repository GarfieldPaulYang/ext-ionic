import { Component, Input, Output, EventEmitter, OnDestroy, forwardRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const STAR_RATING_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StarRatingCmp),
  multi: true
};

@Component({
  selector: 'ion-star-rating',
  template: `
    <ul class="rating" (mouseout)="out()">
      <li *ngFor="let star of stars; let i = index" [class]="star" (click)="valchange(i + 1)" (mouseover)="valchange(i + 1)"></li>
    </ul>
  `,
  providers: [STAR_RATING_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None
})
export class StarRatingCmp implements OnDestroy, ControlValueAccessor {
  @Input() half: boolean = true;
  @Input() max: number = 5;
  @Input() readonly: boolean = false;

  stars: Array<string> = [];

  private _value: number = -1;
  private onTouchedCallback: () => void = () => { };
  private onChangeCallback: (_: any) => void = (_: any) => { };

  constructor() { }

  get value(): number {
    return this._value;
  }

  set value(val: number) {
    if (val != this._value) {
      this._value = val;
      setTimeout(() => {
        this._updateStars();
      }, 10);
      this.onChangeCallback(val);
    }
  }

  out() {
    if (!this.readonly) {
      this.value = -1;
      this.writeValue(this.value);
    }
    this.onTouchedCallback();
  }

  valchange(val: number) {
    if (!this.readonly) {
      this.writeValue(val);
    }
  }

  writeValue(val: any) {
    if (this.value != val) {
      this.value = val;
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  ngOnDestroy() {
    this.onChangeCallback = null;
    this.onTouchedCallback = null;
  }

  _getStart(i: number): string {
    let result: string = 'star';
    if (!this.value) {
      return result;
    }

    if (this.half && this.readonly) {
      let v = Math.round(this.value * 2) / 2;
      if (i <= v - 1) {
        return result + ' filled';
      } else if ((v > i) && (i < v + 1)) {
        return result + ' filled-half';
      }
      return result;
    }

    if (i < this.value) {
      return result + ' filled';
    }
    return result;
  }

  _updateStars() {
    this.stars = [];
    for (let i = 0; i < this.max; i++) {
      this.stars.push(this._getStart(i));
    }
  }
}