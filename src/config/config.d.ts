import { OpenUrlModalOptions } from '../components/open-url-modal/open-url-modal-options';
import { ImageLoaderOptions } from '../components/image-loader/image-loader-options';
import { BaiduMapOptions } from '../components/baidu-map/baidu-map-options';
export interface Config {
    color: string;
    openUrlModalOptions?: OpenUrlModalOptions;
    imageLoaderOptions?: ImageLoaderOptions;
    baiduMapOptions?: BaiduMapOptions;
}
export declare class ConfigManager {
    private _config;
    readonly config: Config;
    readonly openUrlModalOptions: OpenUrlModalOptions;
    readonly imageLoaderOptions: ImageLoaderOptions;
    readonly baiduMapOptions: BaiduMapOptions;
    set(config: Config): void;
}
