export interface GpsPoint {
  lng: number;
  lat: number;
}

export const　enum MapType { BAIDU, AMAP }

export interface GeogProvider {
  transformGps(points: GpsPoint[]): Promise<GpsPoint[]>;
}
