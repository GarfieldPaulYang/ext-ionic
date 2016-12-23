import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  Host,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  SimpleChange
} from '@angular/core';
import * as _ from 'lodash';

import { BaiduMapOptions, baiduMapDefaultOpts, MarkerOptions } from './baidu-map-options';
import { BaiduMapController } from './baidu-map';

@Component({
  selector: 'ion-baidu-map',
  template: '<div class="baidu-map"></div>'
})
export class BaiduMap implements OnInit, OnChanges, OnDestroy {
  @Input() options: BaiduMapOptions;

  @Output() onMapLoaded: EventEmitter<void> = new EventEmitter<void>();
  @Output() onMapClick: EventEmitter<any> = new EventEmitter();
  @Output() onMarkerClick: EventEmitter<any> = new EventEmitter();

  constructor(private _elementRef: ElementRef, private baiduMapCtrl: BaiduMapController) { }

  ngOnInit() {
    this.baiduMapCtrl.init(
      this.getOptions(),
      this._elementRef.nativeElement.querySelector('.baidu-map')
    ).then(() => {
      this.baiduMapCtrl.addEventListener('click', this.onMapClick);
      this.onMapLoaded.emit();
    });
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    let options: SimpleChange = changes['options'];
    if (options && !_.isEqual(options.previousValue, options.currentValue)) {
      let opts: BaiduMapOptions = this.getOptions();
      this.baiduMapCtrl.panTo(new BMap.Point(opts.center.lng, opts.center.lat));
      this.draw(opts.markers);
    }
  }

  ngOnDestroy() { }

  private draw(markers: Array<MarkerOptions>) {
    let opts: BaiduMapOptions = this.getOptions();
    if (opts.mass.enabled) {
      this.baiduMapCtrl.drawMassPoints(markers, opts.mass.options, this.onMarkerClick);
      return;
    }
    this.baiduMapCtrl.drawMarkers(markers, this.onMarkerClick);
  }

  private getOptions(): BaiduMapOptions {
    return Object.assign({}, baiduMapDefaultOpts, this.options);
  }
}