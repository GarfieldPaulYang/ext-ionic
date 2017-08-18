import { Injectable } from '@angular/core';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class GeolocationProvider {
  private watch: Subscription;
  private coordinates: Coordinates | any;

  constructor(private geolocation: Geolocation) { }

  start(options: GeolocationOptions = { enableHighAccuracy: true, timeout: 20000 }) {
    this.watch = this.geolocation.watchPosition(options).filter((p) => p.coords !== undefined).subscribe((data) => {
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