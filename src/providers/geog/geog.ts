import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { AppLauncher } from '../../native/app-launcher';
import { Platform } from 'ionic-angular';

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
  launch(coords: Coords);
}

class BaiDuMapLaunchService implements MapLaunchService {
  constructor(
    private platform: Platform,
    private appLauncher: AppLauncher

  ) { }

  launch(coords: Coords) {
    this.appLauncher.launch({
      uri: 'baidumap://map/geocoder?location=' + coords.longitude + ',' + coords.latitude
    });
  }
}

@Injectable()
export class MapLaunchProvider {
  private services: MapLaunchService[] = [];

  constructor(
    platform: Platform,
    appLauncher: AppLauncher,
    private geoProvider: GeogProvider
  ) {
    this.services.push(new BaiDuMapLaunchService(platform, appLauncher));
  }

  launch(coords: Coords) {
    this.geoProvider.transformGps([coords]).then(coordes => {
      this.services[0].launch({
        longitude: coordes[0].longitude,
        latitude: coordes[0].latitude
      });
    }).catch(e => {
      return Promise.reject(e);
    });
  }
}