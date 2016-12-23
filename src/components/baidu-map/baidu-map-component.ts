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
  template: `
    <div class="offlinePanel">
      <label>离线</label>
    </div>
  `
})
export class BaiduMap implements OnInit, OnChanges, OnDestroy {
  @Input() options: BaiduMapOptions;

  @Output() onMapLoaded: EventEmitter<void> = new EventEmitter<void>();
  @Output() onMapClick: EventEmitter<any> = new EventEmitter();
  @Output() onMarkerClick: EventEmitter<any> = new EventEmitter();

  private mapLoaded: boolean = false;

  constructor(private _elementRef: ElementRef, private baiduMapCtrl: BaiduMapController) { }

  ngOnInit() {
    let opts: BaiduMapOptions = this.getOptions();
    this.baiduMapCtrl.init(
      opts,
      this._elementRef.nativeElement
    ).then(() => {
      this.baiduMapCtrl.addEventListener('click', this.onMapClick);
      this.reDraw(opts);
      this.onMapLoaded.emit();
      this.mapLoaded = true;
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

  ngOnDestroy() { }

  private reDraw(opts: BaiduMapOptions) {
    this.baiduMapCtrl.panTo(new BMap.Point(opts.center.lng, opts.center.lat));
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
    return Object.assign({}, baiduMapDefaultOpts, this.options);
  }
}