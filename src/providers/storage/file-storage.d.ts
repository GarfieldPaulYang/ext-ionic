import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Storage, SaveOptions, LoadOptions, RemoveOptions } from './storage';
import { MemoryStorage } from './mem-storage';
export declare class TextFileStorage implements Storage {
    protected platform: Platform;
    protected file: File;
    protected memoryStorage: MemoryStorage;
    constructor(platform: Platform, file: File, memoryStorage: MemoryStorage);
    save(options: SaveOptions): Promise<any>;
    load<T>(options: LoadOptions): Promise<T>;
    remove(options: RemoveOptions): Promise<any>;
    protected serialize(content: any): string;
    protected deserialize(content: string): any;
    private writeToFile(options);
    private readFile<T>(options);
    private removeFile(options);
    private getMetadata(fileEntry);
    private createCacheDirectory(dirname);
    private getRootpath();
    private getFilepath(dirname?);
}
