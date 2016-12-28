import { Platform } from 'ionic-angular';
import { RemoveResult, FileError } from 'ionic-native';
import { ImageLoaderConfig } from "./image-loader-config";
export declare class ImageLoaderController {
    private config;
    private isCacheReady;
    private isInit;
    constructor(platform: Platform, config: ImageLoaderConfig);
    getImagePath(imageUrl: string): Promise<string>;
    removeCacheFile(localPath: string): void;
    clearCache(): Promise<RemoveResult | FileError>;
    private downloadImage(imageUrl, localPath);
    private needDownload(imageUrl);
    private initCache(replace?);
    private getCachedImagePath(url);
    private throwError(error);
    private throwWarning(error);
    private readonly filePluginExists;
    private readonly cacheDirectoryExists;
    private readonly cacheDirectory;
    private createCacheDirectory(replace?);
    private createFileName(url);
}
