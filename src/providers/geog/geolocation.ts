import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class GeolocationProvider {
  private watch: Subscription;
  private coordinates: Coordinates | any;

  constructor(private geolocation: Geolocation) { }

  start() {
    this.watch = this.geolocation.watchPosition({
      enableHighAccuracy: true,
      timeout: 20000
    }).subscribe((data) => {
      this.coordinates = data.coords;
    });
  }

  stop() {
    if (this.watch) {
      this.watch.unsubscribe();
    }
  }

  getCurrentCoordinates(): Coordinates {
    return this.coordinates || {};
  }
}