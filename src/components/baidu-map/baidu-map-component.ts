import {
  Component,
  AfterViewInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  SimpleChange
} from '@angular/core';
import * as _ from 'lodash';

import { ConfigManager } from '../../config/config';

import { BaiduMapOptions, MarkerOptions } from './baidu-map-options';
import { BaiduMapController } from './baidu-map';

@Component({
  selector: 'ion-baidu-map',
  template: `
    <div class="offlinePanel">
      <label>正在加载地图...</label>
    </div>
  `
})
export class BaiduMap implements AfterViewInit, OnChanges {
  @Input() options: BaiduMapOptions;

  @Output() onMapLoaded: EventEmitter<void> = new EventEmitter<void>();
  @Output() onMapLoadFialed: EventEmitter<any> = new EventEmitter<any>();
  @Output() onMapClick: EventEmitter<any> = new EventEmitter<any>();
  @Output() onMarkerClick: EventEmitter<any> = new EventEmitter<any>();

  private mapLoaded: boolean = false;

  constructor(
    private _elementRef: ElementRef,
    private baiduMapCtrl: BaiduMapController,
    private config: ConfigManager
  ) { }

  ngAfterViewInit() {
    let opts: BaiduMapOptions = this.getOptions();
    this.baiduMapCtrl.init(
      opts,
      this._elementRef.nativeElement
    ).then(() => {
      this.baiduMapCtrl.addEventListener('click', this.onMapClick);
      this.reDraw(opts);
      this.onMapLoaded.emit();
      this.mapLoaded = true;
    }, e => {
      this.onMapLoadFialed.emit(e);
    });
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    if (!this.mapLoaded) {
      return;
    }

    let options: SimpleChange = changes['options'];
    if (options.isFirstChange) {
      return;
    }

    if (options && !_.isEqual(options.previousValue, options.currentValue)) {
      this.reDraw(this.getOptions());
    }
  }

  private reDraw(opts: BaiduMapOptions) {
    this.baiduMapCtrl.panTo(new window['BMap'].Point(opts.center.lng, opts.center.lat));
    this.draw(opts.markers);
  }

  private draw(markers: Array<MarkerOptions>) {
    let opts: BaiduMapOptions = this.getOptions();
    if (opts.mass.enabled) {
      this.baiduMapCtrl.drawMassPoints(markers, opts.mass.options, this.onMarkerClick);
      return;
    }
    this.baiduMapCtrl.drawMarkers(markers, this.onMarkerClick);
  }

  private getOptions(): BaiduMapOptions {
    return _.assign({}, this.config.baiduMap, this.options);
  }
}