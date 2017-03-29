import { AfterViewInit, OnChanges, EventEmitter, ElementRef, SimpleChanges } from '@angular/core';
import { ConfigProvider } from '../../config/config';
import { BaiduMapOptions } from './baidu-map-options';
import { BaiduMapController } from './baidu-map';
export declare class BaiduMap implements AfterViewInit, OnChanges {
    private _elementRef;
    private baiduMapCtrl;
    private config;
    options: BaiduMapOptions;
    onMapLoaded: EventEmitter<void>;
    onMapLoadFialed: EventEmitter<any>;
    onMapClick: EventEmitter<any>;
    onMarkerClick: EventEmitter<any>;
    private opacity;
    private mapLoaded;
    constructor(_elementRef: ElementRef, baiduMapCtrl: BaiduMapController, config: ConfigProvider);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private reDraw(opts);
    private draw(markers);
    private getOptions();
}
