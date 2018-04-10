import { Injectable } from '@angular/core';
import { ActionSheetController, Platform } from 'ionic-angular';

import { HttpProvider } from '../http/http';
import { AppLauncher, AppLauncherOptions } from '../../native/app-launcher';
import { Dialog } from '../../utils/dialog';
import { AmapGeogProvider, BaiduGeogProvider } from './geog';
import { GeogProvider, GpsPoint, MapType } from '../../commons/type/geog';

@Injectable()
export class GeogProviderFactory {
  private serviceMap: Map<MapType, GeogProvider> = new Map();

  constructor(
    private http: HttpProvider
  ) {
    this.serviceMap.set(MapType.BAIDU, new BaiduGeogProvider(this.http));
    this.serviceMap.set(MapType.AMAP, new AmapGeogProvider(this.http));
  }

  create(mapType?: MapType): GeogProvider {
    return this.serviceMap.get(mapType ? mapType : MapType.BAIDU);
  }
}

interface MapLaunchService {
  launch(point: GpsPoint): Promise<any>;

  canLaunch(): Promise<any>;

  getMapType(): MapType;

  getName(): string;
}

class BaiduMapLaunchService implements MapLaunchService {
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

  launch(point: GpsPoint): Promise<any> {
    return this.appLauncher.launch({
      uri: `baidumap://map/geocoder?location=${point.lat},${point.lng}&src=webapp.rgeo.whcyit.myApp`
    });
  }

  canLaunch(): Promise<any> {
    const opt: AppLauncherOptions = {};
    if (this.platform.is('ios')) {
      opt.uri = 'baidumap://';
    } else {
      opt.packageName = 'com.baidu.BaiduMap';
    }
    return this.appLauncher.canLaunch(opt).then(() => {
      return true;
    }).catch(() => {
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

  launch(point: GpsPoint): Promise<any> {
    const o = {
      platform: this.platform.is('android') ? 'android' : 'ios',
      dev: this.platform.is('android') ? 0 : 1,
      ...point,
    };
    const uri = `${o.platform}amap://viewReGeo?sourceApplication=myApp&dev=${o.dev}&lon=${o.lng}&lat=${o.lat}`;
    return this.appLauncher.launch({
      uri: uri
    });
  }

  canLaunch(): Promise<any> {
    const opt: AppLauncherOptions = {};
    if (this.platform.is('ios')) {
      opt.uri = 'iosamap://';
    } else {
      opt.packageName = 'com.autonavi.minimap';
    }
    return this.appLauncher.canLaunch(opt).then(() => {
      return true;
    }).catch(() => {
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
    private geogProviderFactory: GeogProviderFactory,
    private dialog: Dialog,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.services.push(new BaiduMapLaunchService(platform, appLauncher));
    this.services.push(new AmapMapLaunchService(platform, appLauncher));
  }

  launch(point: GpsPoint): Promise<any> {
    const promises: Promise<any>[] = [];
    this.services.forEach(service => {
      promises.push(service.canLaunch());
    });
    const indexs: number[] = [];
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
        return this._launch(point, indexs[0]);
      }
      this.show(point, indexs);
      return Promise.resolve();
    });
  }

  private show(point: GpsPoint, index: number[]) {
    const buttons = [];
    index.forEach(v => {
      buttons.push({
        text: this.services[v].getName(),
        handler: () => {
          this._launch(point, v);
        }
      });
    });
    const actionSheet = this.actionSheetCtrl.create({
      buttons: buttons
    });
    actionSheet.present();
  }

  private _launch(point: GpsPoint, index: number): Promise<any> {
    const service = this.services[index];
    const geoProvider = this.geogProviderFactory.create(service.getMapType());
    return geoProvider.transformGps([point]).then(result => {
      service.launch(result[0]);
    }).catch(e => {
      return Promise.reject(e);
    });
  }
}