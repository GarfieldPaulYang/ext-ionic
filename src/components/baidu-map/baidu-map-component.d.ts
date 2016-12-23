import { OnInit, OnChanges, OnDestroy, EventEmitter, ElementRef, SimpleChange } from '@angular/core';
import { BaiduMapOptions } from './baidu-map-options';
import { BaiduMapController } from './baidu-map';
export declare class BaiduMap implements OnInit, OnChanges, OnDestroy {
    private _elementRef;
    private baiduMapCtrl;
    options: BaiduMapOptions;
    onMapLoaded: EventEmitter<void>;
    onMapClick: EventEmitter<any>;
    onMarkerClick: EventEmitter<any>;
    constructor(_elementRef: ElementRef, baiduMapCtrl: BaiduMapController);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    ngOnDestroy(): void;
    private draw(markers);
    private getOptions();
}
