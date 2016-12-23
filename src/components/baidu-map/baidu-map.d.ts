import { EventEmitter } from '@angular/core';
import { BaiduMapOptions, GpsPoint, MarkerOptions, PointCollectionOptions } from './baidu-map-options';
export declare class BaiduMapController {
    private _map;
    init(opts: BaiduMapOptions, ele: HTMLElement): Promise<void>;
    translateGps(gpsData?: Array<GpsPoint>): Promise<void>;
    geoLocation(): Promise<any>;
    clearOverlays(): void;
    panTo(point: any): void;
    geoLocationAndCenter(): Promise<any>;
    addEventListener(event: string, handler: EventEmitter<any>): void;
    addMarker(markerOpts: MarkerOptions, clickHandler: EventEmitter<any>): void;
    drawMarkers(markers: Array<MarkerOptions>, clickHandler: EventEmitter<any>): Promise<void>;
    drawMassPoints(markers: Array<MarkerOptions>, opts: PointCollectionOptions, clickHandler: EventEmitter<any>): Promise<void>;
    private createIcon(marker);
    private createInfoWindow(marker);
    private createMarker(marker);
}
