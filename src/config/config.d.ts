import { OpaqueToken } from '@angular/core';
import { OpenUrlModalOptions } from '../components/open-url-modal/open-url-modal-options';
import { ImageLoaderOptions } from '../components/image-loader/image-loader-options';
import { BaiduMapOptions } from '../components/baidu-map/baidu-map-options';
import { HttpInterceptor } from '../providers/http';
export interface LoginConfig {
    appKey?: string;
    url?: string;
}
export interface Config {
    color?: string;
    hotUpdateUrl?: any;
    devMode?: boolean;
    login?: LoginConfig;
    openUrlModal?: OpenUrlModalOptions;
    imageLoader?: ImageLoaderOptions;
    baiduMap?: BaiduMapOptions;
    interceptors?: Array<HttpInterceptor>;
}
export declare class ConfigProvider {
    private _config;
    get(): Config;
    init(config: Config): void;
}
export declare function setupConfig(userConfig: Config): Config;
export declare const EXT_IONIC_CONFIG: OpaqueToken;
