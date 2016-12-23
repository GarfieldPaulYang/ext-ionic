export interface GpsPoint {
    lng: number;
    lat: number;
}
export interface MarkerSize {
    width: number;
    height: number;
}
export interface MarkerInfoWindow {
    title: string;
    content: string;
    enableMessage?: boolean;
}
export interface MarkerOptions {
    point: GpsPoint;
    icon?: string;
    size?: MarkerSize;
    infoWindow?: MarkerInfoWindow;
}
export interface PointCollectionOptions {
    size?: any;
    shape?: any;
    color?: string;
}
export interface MassOptions {
    enabled?: boolean;
    options?: PointCollectionOptions;
}
export interface BaiduMapOptions {
    navCtrl?: boolean;
    scaleCtrl?: boolean;
    overviewCtrl?: boolean;
    enableScrollWheelZoom?: boolean;
    zoom?: number;
    city?: string;
    center?: GpsPoint;
    markers?: MarkerOptions[];
    mass?: MassOptions;
}
export declare const baiduMapDefaultOpts: BaiduMapOptions;
