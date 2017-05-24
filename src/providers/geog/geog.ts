import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { AppLauncher } from '../../native/app-launcher';
import { Platform } from 'ionic-angular';
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
    let url = 'http://api.map.baidu.com/geoconv/v1/?callback=JSONP_CALLBACK&output=json&from=1&to=5&ak=' + this.appKey;
    let coordsStrs = [];
    coordes.forEach(coords => {
      coordsStrs.push(coords.longitude + ',' + coords.latitude);
    });
    url = url + '&coords=' + coordsStrs.join(';');
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

export const　enum MapType { BAIDU }

@Injectable()
export class GeogProvider {
  private serviceMap: Map<MapType, GeogService> = new Map();

  constructor(private jsonp: Jsonp) {
    this.serviceMap.set(MapType.BAIDU, new BaiDuGeogService(jsonp));
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
}

class BaiDuMapLaunchService implements MapLaunchService {
  private geogService: GeogService;
  constructor(
    private platform: Platform,
    private appLauncher: AppLauncher

  ) {
    this.geogService = new BaiDuGeogService(jsonp);
  }

  getMapType(): MapType {
    return MapType.BAIDU;
  }

  launch(coords: Coords): Promise<any> {
    return this.appLauncher.launch({
      uri: 'baidumap://map/geocoder?location=' + coords.longitude + ',' + coords.latitude
    });
  }

  canLaunch(): Promise<any> {
    return this.appLauncher.launch({
      uri: 'baidumap://map/show'
    }).then(v => {
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
    private dialog: Dialog
  ) {
    this.services.push(new BaiDuMapLaunchService(platform, appLauncher));
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
    });
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