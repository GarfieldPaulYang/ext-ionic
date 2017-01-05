import { OpenUrlModalOptions } from '../components/open-url-modal/open-url-modal-options';
import { ImageLoaderOptions } from '../components/image-loader/image-loader-options';
export interface Config {
    color: string;
    openUrlModalOptions?: OpenUrlModalOptions;
    imageLoaderOptions?: ImageLoaderOptions;
}
export declare class ConfigManager {
    private _config;
    readonly config: Config;
    readonly openUrlModalOptions: OpenUrlModalOptions;
    readonly imageLoaderOptions: ImageLoaderOptions;
    set(config: Config): void;
}
