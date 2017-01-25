import { OpaqueToken } from '@angular/core';
import { OpenUrlModalOptions } from '../components/open-url-modal/open-url-modal-options';
import { ImageLoaderOptions } from '../components/image-loader/image-loader-options';
import { BaiduMapOptions } from '../components/baidu-map/baidu-map-options';
export interface LoginConfig {
    appKey?: string;
    url?: string;
}
export interface Config {
    color: string;
    hotUpdateUrl?: string;
    devMode?: boolean;
    login?: LoginConfig;
    openUrlModal?: OpenUrlModalOptions;
    imageLoader?: ImageLoaderOptions;
    baiduMap?: BaiduMapOptions;
}
export declare const defaultConfig: Config;
export declare const EXT_IONIC_CONFIG: OpaqueToken;
