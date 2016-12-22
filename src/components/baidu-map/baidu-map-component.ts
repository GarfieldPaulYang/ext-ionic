import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  Host,
  Input,
  ElementRef,
  SimpleChange
} from '@angular/core';

import { BaiduMapOptions } from './baidu-map-options';

@Component({
  selector: 'ion-baidu-map',
  template: '<div class="baidu-map"></div>'
})
export class BaiduMap implements OnInit, OnChanges, OnDestroy {
  @Input() options: BaiduMapOptions;

  constructor(private _elementRef: ElementRef) { }

  ngOnInit() { }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) { }

  ngOnDestroy() { }
}