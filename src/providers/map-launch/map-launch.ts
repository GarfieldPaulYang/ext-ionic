import { Injectable } from '@angular/core';
import { Coords, GeoProvider } from '../geo/geo';
import { AppLauncher } from '../../native/app-launcher';

interface MapLaunchService {
  launch(coords: Coords);
}

class BaiDuMapLaunchService implements MapLaunchService {
  constructor(private appLauncher: AppLauncher) { }

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
    private appLauncher: AppLauncher,
    private geoProvider: GeoProvider
  ) {
    this.services.push(new BaiDuMapLaunchService(appLauncher));
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