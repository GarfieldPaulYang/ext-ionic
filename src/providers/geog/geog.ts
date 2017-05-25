import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import * as _ from 'lodash';
import { AppLauncher, AppLauncherOptions } from '../../native/app-launcher';
import { Platform, ActionSheetController } from 'ionic-angular';
import { Dialog } from '../../utils/dialog';

export interface Coords {
  longitude: number;
  latitude: number;
}

interface GeogService {
  transformGps(coord: Coords[]): Promise<Coords[]>;
}

class BaiDuGeogService implements GeogService {
  private appKey: string = '12c17c924871a04f1dbac75e1824edb7';

  constructor(private jsonp: Jsonp) { }

  transformGps(coordes: Coords[]): Promise<Coords[]> {
    let coordsStrs = [];
    coordes.forEach(coords => {
      coordsStrs.push(coords.longitude + ',' + coords.latitude);
    });
    let url = `http://api.map.baidu.com/geoconv/v1/?callback=JSONP_CALLBACK&output=json&from=1&to=5&ak=${this.appKey}&coords=${coordsStrs.join(';')}`;
    return this.jsonp.get(url).map(
      (r => r.text())
    ).toPromise().then(v => {
      let o = JSON.parse(v);
      let result: Coords[] = [];
      o.result.forEach(p => {
        result.push({ longitude: p.y, latitude: p.x });
      });
      return result;
    }).catch(e => {
      Promise.reject(e);
    });
  }
}

class AmapGeogService implements GeogService {
  private appKey: string = '32adf46617be0d1a6a5658cce57cf9e0';

  constructor(
    private jsonp: Jsonp,
  ) { }

  transformGps(coordes: Coords[]): Promise<Coords[]> {
    let coordsStrs = [];
    coordes.forEach(coords => {
      coordsStrs.push(coords.longitude + ',' + coords.latitude);
    });
    let url = `http://restapi.amap.com/v3/assistant/coordinate/convert?callback=JSONP_CALLBACK&coordsys=gps&output=json&key=${this.appKey}&locations=${coordsStrs.join('|')}`;
    return this.jsonp.get(url).map(
      (r => r.text())
    ).toPromise().then(v => {
      let o = JSON.parse(v);
      let location: string[] = _.split(o.locations, ';');
      let result: Coords[] = [];
      location.forEach(v => {
        let p = _.split(v, ',');
        result.push({ longitude: +p[0], latitude: +p[1] });
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

  constructor(private jsonp: Jsonp) {
    this.serviceMap.set(MapType.BAIDU, new BaiDuGeogService(jsonp));
    this.serviceMap.set(MapType.AMAP, new AmapGeogService(jsonp));
  }

  transformGps(coordes: Coords[], mapType?: MapType): Promise<Coords[]> {
    let geogService = this.serviceMap.get(mapType ? mapType : MapType.BAIDU);
    return geogService.transformGps(coordes);
  }
}

interface MapLaunchService {
  launch(coords: Coords): Promise<any>;

  canLaunch(): Promise<any>;

  getMapType(): MapType;

  getName(): string;
}

class BaiDuMapLaunchService implements MapLaunchService {
  constructor(
    private platform: Platform,
    private appLauncher: AppLauncher

  ) {
  }

  getName(): string {
    return '百度地图';
  }

  getMapType(): MapType {
    return MapType.BAIDU;
  }

  launch(coords: Coords): Promise<any> {
    return this.appLauncher.launch({
      uri: `baidumap://map/geocoder?location=${coords.longitude},${coords.latitude}&src=webapp.rgeo.whcyit.myApp`
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

  launch(coords: Coords): Promise<any> {
    let o = {
      platform: this.platform.is('android') ? 'android' : 'ios',
      dev: this.platform.is('android') ? 0 : 1,
      ...coords,
    };
    let uri = `${o.platform}amap://viewMap?sourceApplication=myApp&poiname=目的地&dev=${o.dev}&lon=${o.longitude}&lat=${o.latitude}`;
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

  launch(coords: Coords): Promise<any> {
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

  private show(coords: Coords, index: number[]) {
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

  private _launch(coords: Coords, index: number): Promise<any> {
    let service = this.services[index];
    return this.geoProvider.transformGps([coords], service.getMapType()).then(coordes => {
      service.launch({
        longitude: coordes[0].longitude,
        latitude: coordes[0].latitude
      });
    }).catch(e => {
      return Promise.reject(e);
    });
  }
}