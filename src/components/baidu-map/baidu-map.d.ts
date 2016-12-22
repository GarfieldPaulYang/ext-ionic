import { BaiduMapOptions } from './baidu-map-options';
export declare class BaiduMapController {
    private _map;
    init(opts: BaiduMapOptions, ele: HTMLElement): Promise<void>;
    translateGps(): void;
}
