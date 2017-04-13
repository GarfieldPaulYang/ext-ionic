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
    private processing;
    private indexed;
    private currentCacheSize;
    private queue;
    private cacheIndex;
    constructor(platform: Platform, transfer: Transfer, file: File, config: ConfigProvider);
    getImagePath(imageUrl: string): Promise<string>;
    preload(imageUrl: string): Promise<string>;
    removeCacheFile(localPath: string): void;
    clearCache(): void;
    private downloadImage(imageUrl, localPath);
    private needDownload(imageUrl);
    private initCache(replace?);
    private addFileToIndex(file);
    private indexCache();
    private maintainCacheSize();
    private addItemToQueue(imageUrl, resolve, reject);
    private readonly canProcess;
    private processQueue();
    private getCachedImagePath(url);
    private throwError(...args);
    private throwWarning(...args);
    private readonly cacheDirectoryExists;
    private readonly cacheRootDirectory;
    private readonly cacheDirectory;
    private readonly shouldIndex;
    private createCacheDirectory(replace?);
    private createFileName(url);
}
