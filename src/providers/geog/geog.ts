import { Jsonp } from '@angular/http';
import * as _ from 'lodash';
import { Injectable } from '@angular/core';

export interface GpsPoint {
  lng: number;
  lat: number;
}

@Injectable()
export class BaiduGeogProvider {
  private appKey: string = '12c17c924871a04f1dbac75e1824edb7';

  constructor(private jsonp: Jsonp) {
  }

  transformGps(coordes: GpsPoint[]): Promise<GpsPoint[]> {
    let coordsStrs = [];
    coordes.forEach(coords => {
      coordsStrs.push(coords.lng + ',' + coords.lat);
    });
    let url = `http://api.map.baidu.com/geoconv/v1/?callback=JSONP_CALLBACK&output=json&from=1&to=5&ak=${this.appKey}&coords=${coordsStrs.join(';')}`;
    return this.jsonp.get(url).map(
      r => r.json()
    ).toPromise().then(o => {
      let result: GpsPoint[] = [];
      o.result.forEach(p => {
        result.push({ lng: p.y, lat: p.x });
      });
      return result;
    }).catch(e => {
      Promise.reject(e);
    });
  }
}