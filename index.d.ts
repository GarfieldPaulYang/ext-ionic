export { LoginConfig, Config, defaultConfig } from './src/config/config';
export { ResponseResult, Pagination } from './src/utils/http/response/response-result';
export { URLParamsBuilder } from './src/utils/http/url-params-builder';
export { MapToIterable } from './src/pipes/map-to-iterable';
export { OrderBy } from './src/pipes/order-by';
export { AlphaScroll } from './src/components/alpha-scroll/alpha-scroll';
export { OpenUrlModalController } from './src/components/open-url-modal/open-url-modal';
export { BaiduMap } from './src/components/baidu-map/baidu-map-component';
export { GpsPoint, MarkerSize, MarkerInfoWindow, MarkerOptions, PointCollectionOptions, MassOptions, BaiduMapOptions } from './src/components/baidu-map/baidu-map-options';
export { ImageLoaderCmp } from './src/components/image-loader/image-loader-component';
export { ImageLoaderOptions } from './src/components/image-loader/image-loader-options';
export { StarRatingCmp } from './src/components/star-rating/star-rating';
export { StringUtils } from './src/utils/string';
export { Dialog } from './src/utils/dialog';
export { HttpProviderOptionsArgs, HttpProviderOptions, LoginOptions, HttpProvider, CorsHttpProvider } from './src/utils/http/http';
import './src/rxjs-extensions';
import { ModuleWithProviders } from '@angular/core';
import { Config } from './src/config/config';
export declare class WhcyitModule {
    static forRoot(config?: Config): ModuleWithProviders;
}
