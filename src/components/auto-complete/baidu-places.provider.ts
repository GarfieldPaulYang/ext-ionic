import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import { AutoCompleteDataProvider } from './auto-complete';

@Injectable()
export class BaiduPlacesProvider implements AutoCompleteDataProvider {
  constructor(private jsonp: Jsonp) { }

  loadItems(params: any): Promise<any[]> {
    params = {
      region: '湖北省',
      coordType: 'wgs84', // wgs84,gcj02,bd09
      retCoordType: 'gcj02ll', // gcj02,bd09
      location: '', // lat,lng
      ...params
    };
    const url = `http://api.map.baidu.com/place/v2/suggestion?q=${params.keyword}&region=${params.region}&location=${params.location}&city_limit=true&coord_type=${params.coordType}&ret_coordtype=${params.retCoordType}&output=json&ak=DmMSdcEILbFTUHs4QvlcV2G0`;
    return this.jsonp.get(url, { params: { 'callback': 'JSONP_CALLBACK' } }).map((r => r.json())).toPromise().then(r => {
      if (r.status !== 0) {
        return Promise.reject(r.message);
      }
      return r.result;
    }).catch(e => Promise.reject(e));
  }
}