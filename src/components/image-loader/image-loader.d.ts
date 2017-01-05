import { Platform } from 'ionic-angular';
import { ConfigManager } from "../../config/config";
export declare class ImageLoaderController {
    private config;
    private isCacheReady;
    private isInit;
    constructor(platform: Platform, config: ConfigManager);
    getImagePath(imageUrl: string): Promise<string>;
    removeCacheFile(localPath: string): void;
    clearCache(): void;
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
