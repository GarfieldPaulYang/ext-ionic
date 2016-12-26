import { OnInit, OnChanges, EventEmitter, ElementRef, SimpleChange } from '@angular/core';
import { BaiduMapOptions } from './baidu-map-options';
import { BaiduMapController } from './baidu-map';
export declare class BaiduMap implements OnInit, OnChanges {
    private _elementRef;
    private baiduMapCtrl;
    options: BaiduMapOptions;
    onMapLoaded: EventEmitter<void>;
    onMapLoadFialed: EventEmitter<any>;
    onMapClick: EventEmitter<any>;
    onMarkerClick: EventEmitter<any>;
    private mapLoaded;
    constructor(_elementRef: ElementRef, baiduMapCtrl: BaiduMapController);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    private reDraw(opts);
    private draw(markers);
    private getOptions();
}
