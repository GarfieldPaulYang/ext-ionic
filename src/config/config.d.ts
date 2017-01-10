import { OpenUrlModalOptions } from '../components/open-url-modal/open-url-modal-options';
import { ImageLoaderOptions } from '../components/image-loader/image-loader-options';
import { BaiduMapOptions } from '../components/baidu-map/baidu-map-options';
export interface LoginConfig {
    appKey?: string;
    devMode?: boolean;
    url?: string;
}
export interface Config {
    color: string;
    login?: LoginConfig;
    openUrlModal?: OpenUrlModalOptions;
    imageLoader?: ImageLoaderOptions;
    baiduMap?: BaiduMapOptions;
}
export declare class ConfigManager {
    private _config;
    readonly config: Config;
    readonly openUrlModal: OpenUrlModalOptions;
    readonly imageLoader: ImageLoaderOptions;
    readonly baiduMap: BaiduMapOptions;
    readonly login: LoginConfig;
    set(config: Config): void;
}
