import { Jsonp } from '@angular/http';
import * as _ from 'lodash';
import { Injectable } from '@angular/core';

export interface Coords {
  longitude: number;
  latitude: number;
}

@Injectable()
export class BaiduGeogProvider {
  private appKey: string = '12c17c924871a04f1dbac75e1824edb7';

  constructor(private jsonp: Jsonp) {
  }

  transformGps(coordes: Coords[]): Promise<Coords[]> {
    let coordsStrs = [];
    coordes.forEach(coords => {
      coordsStrs.push(coords.longitude + ',' + coords.latitude);
    });
    let url = `http://api.map.baidu.com/geoconv/v1/?callback=JSONP_CALLBACK&output=json&from=1&to=5&ak=${this.appKey}&coords=${coordsStrs.join(';')}`;
    return this.jsonp.get(url).map(
      r => r.json()
    ).toPromise().then(o => {
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