import { Component, Input, OnInit, ElementRef, Renderer, Optional } from '@angular/core';
import { BaseInput } from 'ionic-angular/util/base-input';
import { Config, Form, Item } from 'ionic-angular';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CorsHttpProvider } from '../../providers/http/http';
import { URLParamsBuilder } from '../../utils/http/url-params-builder';
import * as _ from 'lodash';

@Component({
  selector: 'ion-lazy-select',
  styles: [`
    ion-select {
      max-width: 100%;
    }
  `],
  template: `
    <ion-select [(ngModel)]="value" interface="popover" [placeholder]="placeholder">
      <ion-option value="" *ngIf="chooseTextField">全部</ion-option>
      <ion-option value="{{option[valueField]}}" *ngFor="let option of options">{{option[textField]}}</ion-option>
    </ion-select>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: LazySelect,
    multi: true
  }]
})
export class LazySelect extends BaseInput<any> implements OnInit {

  options: Array<any> = [];

  @Input()
  placeholder: string;

  @Input()
  chooseTextField: boolean = false;

  @Input()
  url: string;

  @Input()
  params: any;

  @Input()
  valueField: string = 'id';

  @Input()
  textField: string = 'name';

  constructor(
    private config: Config,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private form: Form,
    @Optional() private item: Item,
    private http: CorsHttpProvider
  ) {
    super(config, elementRef, renderer, 'ion-lazy-select', 0, form, item, null);
  }

  ngOnInit(): void {
    this.http.request<Array<any>>(
      this.url,
      { cache: true, cacheOnly: true, memCache: true, search: URLParamsBuilder.build(this.params), showLoading: false }
    ).then((data: Array<any>) => {
      this.options = data;
    }).catch(e => {
      Promise.reject(e);
    });
  }

}