import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
export interface Coords {
  longitude: number;
  latitude: number;
}

interface GeoService {
  transformGps(coord: Coords[]): Promise<Coords[]>;
}

class BaiDuService implements GeoService {
  private appKey: string = '12c17c924871a04f1dbac75e1824edb7';
  constructor(
    private jsonp: Jsonp
  ) {
  }

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

export const BAIDU: string = 'baidu';

@Injectable()
export class GeoProvider {
  private serviceMap: Map<string, GeoService> = new Map();
  constructor(
    private jsonp: Jsonp
  ) {
    this.serviceMap.set(BAIDU, new BaiDuService(jsonp));
  }

  transformGps(coordes: Coords[], typeKey?: string): Promise<Coords[]> {
    let geoService = this.serviceMap.get(typeKey ? typeKey : BAIDU);
    return geoService.transformGps(coordes);
  }
}