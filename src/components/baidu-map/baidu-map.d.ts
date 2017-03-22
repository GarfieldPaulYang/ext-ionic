import { EventEmitter } from '@angular/core';
import { BaiduMapOptions, GpsPoint, MarkerOptions, PointCollectionOptions } from './baidu-map-options';
export declare var BMap: any;
export declare class BaiduMapController {
    private map;
    init(opts?: BaiduMapOptions, ele?: HTMLElement): Promise<void>;
    translateGps(gpsData?: Array<GpsPoint>): Promise<any>;
    geoLocation(): Promise<any>;
    clearOverlays(): void;
    panTo(point: any): void;
    geoLocationAndCenter(): Promise<any>;
    addEventListener(event: string, handler: EventEmitter<any>): void;
    addMarker(markerOpts: MarkerOptions, clickHandler: EventEmitter<any>): void;
    drawMarkers(markers: Array<MarkerOptions>, clickHandler: EventEmitter<any>): Promise<void>;
    drawMassPoints(markers: Array<MarkerOptions>, opts: PointCollectionOptions, clickHandler: EventEmitter<any>): Promise<void>;
    private initDeclarations();
    private createIcon(marker);
    private createInfoWindow(marker);
    private createMarker(marker);
}
