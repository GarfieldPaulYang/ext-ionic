import { Platform } from 'ionic-angular';
import { Transfer } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';
import { ConfigProvider } from '../../config/config';
export declare class ImageLoaderController {
    private platform;
    private transfer;
    private file;
    private config;
    private isCacheReady;
    private isInit;
    constructor(platform: Platform, transfer: Transfer, file: File, config: ConfigProvider);
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
