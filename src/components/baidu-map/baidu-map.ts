// 封装参考官方API，http://developer.baidu.com/map/reference/index.php
import { Injectable, EventEmitter } from '@angular/core';
import { GpsPoint } from '../../providers/geog/geog';
import { baiduMapLoader } from './baidu-map-loader';
import {
  BaiduMapOptions,
  MarkerOptions,
  PointCollectionOptions
} from './baidu-map-options';

export var BMap: any;
var BMAP_STATUS_SUCCESS: any;
var BMAP_POINT_SIZE_SMALL: any;
var BMAP_POINT_SHAPE_CIRCLE: any;

@Injectable()
export class BaiduMapController {
  private map: any;

  init(opts?: BaiduMapOptions, ele?: HTMLElement): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      baiduMapLoader().then(() => {
        this.initDeclarations();

        if (!ele || !opts) {
          resolve();
          return;
        }

        this.map = new BMap.Map(ele);
        setTimeout(() => {
          this.map.centerAndZoom(new BMap.Point(opts.center.lng, opts.center.lat), opts.zoom);
          if (opts.navCtrl) {
            this.map.addControl(new BMap.NavigationControl());
          }
          if (opts.scaleCtrl) {
            this.map.addControl(new BMap.ScaleControl());
          }
          if (opts.overviewCtrl) {
            this.map.addControl(new BMap.OverviewMapControl());
          }
          if (opts.enableScrollWheelZoom) {
            this.map.enableScrollWheelZoom();
          }
          this.map.setCurrentCity(opts.city);
          resolve();
        });
      }, reject);
    });
  }

  translateGps(gpsData: Array<GpsPoint> = []): Promise<any> {
    return new Promise<any>(resolve => {
      let points: Array<any> = [];
      gpsData.forEach((value, index) => {
        points.push(new BMap.Point(value.lng, value.lat));
      });

      let convertor = new BMap.Convertor();
      convertor.translate(points, 1, 5, resolve);
    });
  }

  geoLocation(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let location = new BMap.Geolocation();
      location.getCurrentPosition((result: any) => {
        if (location.getStatus() === BMAP_STATUS_SUCCESS) {
          resolve(result);
        } else {
          reject('不能获取位置');
        }
      }, () => {
        reject('定位失败');
      });
    });
  }

  clearOverlays() {
    this.map.clearOverlays();
  }

  panTo(point: any) {
    this.map.panTo(point);
  }

  geoLocationAndCenter(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.geoLocation().then(result => {
        this.panTo(result.point);
        resolve(result);
      }, () => reject('定位失败'));
    });
  }

  addEventListener(event: string, handler: EventEmitter<any>) {
    this.map.addEventListener(event, (e: any) => {
      handler.emit(e);
    });
  }

  addMarker(markerOpts: MarkerOptions, clickHandler: EventEmitter<any>) {
    let marker = this.createMarker(markerOpts);
    let infoWindow = this.createInfoWindow(markerOpts);
    if (infoWindow) {
      marker.addEventListener('click', (e: any) => {
        marker.openInfoWindow(infoWindow);
      });
    } else {
      marker.addEventListener('click', (e: any) => {
        clickHandler.emit(e);
      });
    }
    this.map.addOverlay(marker);
  }

  drawMarkers(markers: Array<MarkerOptions>, clickHandler: EventEmitter<any>): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        // 判断是否含有定位点
        if (!markers || markers.length === 0) {
          reject('没有传入兴趣点');
          return;
        }

        this.clearOverlays();
        markers.forEach(marker => {
          this.addMarker(marker, clickHandler);
        });
        resolve();
      });
    });
  }

  drawMassPoints(markers: Array<MarkerOptions>, opts: PointCollectionOptions, clickHandler: EventEmitter<any>): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (!markers || markers.length === 0) {
          reject('没有传入兴趣点');
          return;
        }

        this.clearOverlays();

        var points: Array<any> = [];
        markers.forEach(marker => {
          points.push(new BMap.Point(marker.point.lng, marker.point.lat));
        });

        var pointCollection = new BMap.PointCollection(points, {
          size: BMAP_POINT_SIZE_SMALL,
          shape: BMAP_POINT_SHAPE_CIRCLE,
          color: '#d340c3',
          ...opts
        });
        pointCollection.addEventListener('click', (e: any) => {
          clickHandler.emit(e);
        });
        this.map.addOverlay(pointCollection);
        resolve();
      });
    });
  }

  private initDeclarations() {
    BMap = window['BMap'];
    BMAP_STATUS_SUCCESS = window['BMAP_STATUS_SUCCESS'];
    BMAP_POINT_SIZE_SMALL = window['BMAP_POINT_SIZE_SMALL'];
    BMAP_POINT_SHAPE_CIRCLE = window['BMAP_POINT_SHAPE_CIRCLE'];
  }

  private createIcon(marker: MarkerOptions): any {
    if (marker.icon) {
      if (marker.size) {
        return new BMap.Icon(marker.icon, new BMap.Size(marker.size.width, marker.size.height));
      }
      return new BMap.Icon(marker.icon);
    }

    return null;
  }

  private createInfoWindow(marker: MarkerOptions): any {
    if (marker.infoWindow) {
      var msg = '<p>' + marker.infoWindow.title + '</p><p>' + marker.infoWindow.content + '</p>';
      return new BMap.InfoWindow(msg, {
        enableMessage: !!marker.infoWindow.enableMessage,
        enableCloseOnClick: true
      });
    }

    return null;
  }

  private createMarker(marker: MarkerOptions): any {
    var icon = this.createIcon(marker);
    var pt = new BMap.Point(marker.point.lng, marker.point.lat);
    if (icon) {
      return new BMap.Marker(pt, { icon: icon });
    }
    return new BMap.Marker(pt);
  }
}