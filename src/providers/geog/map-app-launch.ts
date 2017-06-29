import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { Platform, ActionSheetController } from 'ionic-angular';
import * as _ from 'lodash';
import { AppLauncher, AppLauncherOptions } from '../../native/app-launcher';
import { Dialog } from '../../utils/dialog';
import { GpsPoint, BaiduGeogProvider } from './geog';

interface GeogService {
  transformGps(coord: GpsPoint[]): Promise<GpsPoint[]>;
}

class BaiDuGeogService implements GeogService {

  constructor(private geog: BaiduGeogProvider) { }

  transformGps(coordes: GpsPoint[]): Promise<GpsPoint[]> {
    return this.geog.transformGps(coordes);
  }
}

class AmapGeogService implements GeogService {
  private appKey: string = '32adf46617be0d1a6a5658cce57cf9e0';

  constructor(
    private jsonp: Jsonp,
  ) { }

  transformGps(coordes: GpsPoint[]): Promise<GpsPoint[]> {
    let coordsStrs = [];
    coordes.forEach(coords => {
      coordsStrs.push(coords.lng + ',' + coords.lat);
    });
    let url = `http://restapi.amap.com/v3/assistant/coordinate/convert?callback=JSONP_CALLBACK&coordsys=gps&output=json&key=${this.appKey}&locations=${coordsStrs.join('|')}`;
    return this.jsonp.get(url).map(
      (r => r.json())
    ).toPromise().then(o => {
      let location: string[] = _.split(o.locations, ';');
      let result: GpsPoint[] = [];
      location.forEach(v => {
        let p = _.split(v, ',');
        result.push({ lng: +p[0], lat: +p[1] });
      });
      return result;
    }).catch(e => {
      Promise.reject(e);
    });
  }
}

export const　enum MapType { BAIDU, AMAP }

@Injectable()
export class GeogProvider {
  private serviceMap: Map<MapType, GeogService> = new Map();

  constructor(
    private jsonp: Jsonp,
    private geog: BaiduGeogProvider
  ) {
    this.serviceMap.set(MapType.BAIDU, new BaiDuGeogService(geog));
    this.serviceMap.set(MapType.AMAP, new AmapGeogService(jsonp));
  }

  transformGps(coordes: GpsPoint[], mapType?: MapType): Promise<GpsPoint[]> {
    let geogService = this.serviceMap.get(mapType ? mapType : MapType.BAIDU);
    return geogService.transformGps(coordes);
  }
}

interface MapLaunchService {
  launch(coords: GpsPoint): Promise<any>;

  canLaunch(): Promise<any>;

  getMapType(): MapType;

  getName(): string;
}

class BaiDuMapLaunchService implements MapLaunchService {
  constructor(
    private platform: Platform,
    private appLauncher: AppLauncher
  ) { }

  getName(): string {
    return '百度地图';
  }

  getMapType(): MapType {
    return MapType.BAIDU;
  }

  launch(coords: GpsPoint): Promise<any> {
    return this.appLauncher.launch({
      uri: `baidumap://map/geocoder?location=${coords.lng},${coords.lat}&src=webapp.rgeo.whcyit.myApp`
    });
  }

  canLaunch(): Promise<any> {
    let opt: AppLauncherOptions = {};
    if (this.platform.is('ios')) {
      opt.uri = 'baidumap://';
    } else {
      opt.packageName = 'com.baidu.BaiduMap';
    }
    return this.appLauncher.canLaunch(opt).then(v => {
      return true;
    }).catch(e => {
      Promise.resolve(false);
    });
  }
}

class AmapMapLaunchService implements MapLaunchService {
  constructor(
    private platform: Platform,
    private appLauncher: AppLauncher

  ) {
  }

  getName(): string {
    return '高德地图';
  }

  getMapType(): MapType {
    return MapType.AMAP;
  }

  launch(coords: GpsPoint): Promise<any> {
    let o = {
      platform: this.platform.is('android') ? 'android' : 'ios',
      dev: this.platform.is('android') ? 0 : 1,
      ...coords,
    };
    let uri = `${o.platform}amap://viewReGeo?sourceApplication=myApp&dev=${o.dev}&lon=${o.lng}&lat=${o.lat}`;
    return this.appLauncher.launch({
      uri: uri
    });
  }

  canLaunch(): Promise<any> {
    let opt: AppLauncherOptions = {};
    if (this.platform.is('ios')) {
      opt.uri = 'iosamap://';
    } else {
      opt.packageName = 'com.autonavi.minimap';
    }
    return this.appLauncher.canLaunch(opt).then(v => {
      return true;
    }).catch(e => {
      Promise.resolve(false);
    });
  }
}

@Injectable()
export class MapLaunchProvider {
  private services: MapLaunchService[] = [];

  constructor(
    platform: Platform,
    appLauncher: AppLauncher,
    private geoProvider: GeogProvider,
    private dialog: Dialog,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.services.push(new BaiDuMapLaunchService(platform, appLauncher));
    this.services.push(new AmapMapLaunchService(platform, appLauncher));
  }

  launch(coords: GpsPoint): Promise<any> {
    let promises: Promise<any>[] = [];
    this.services.forEach(service => {
      promises.push(service.canLaunch());
    });
    let indexs: number[] = [];
    return Promise.all(promises).then(results => {
      results.forEach((v, index) => {
        if (v === true) {
          indexs.push(index);
        }
      });
      if (indexs.length === 0) {
        this.dialog.alert('错误', '请安装百度地图或高德地图后在使用地图功能');
        return Promise.reject('未安装地图app');
      }
      if (indexs.length === 1) {
        return this._launch(coords, indexs[0]);
      }
      this.show(coords, indexs);
      return Promise.resolve();
    });
  }

  private show(coords: GpsPoint, index: number[]) {
    let buttons = [];
    index.forEach(v => {
      buttons.push({
        text: this.services[v].getName(),
        handler: () => {
          this._launch(coords, v);
        }
      });
    });
    let actionSheet = this.actionSheetCtrl.create({
      buttons: buttons
    });
    actionSheet.present();
  }

  private _launch(coords: GpsPoint, index: number): Promise<any> {
    let service = this.services[index];
    return this.geoProvider.transformGps([coords], service.getMapType()).then(coordes => {
      service.launch(coordes[0]);
    }).catch(e => {
      return Promise.reject(e);
    });
  }
}