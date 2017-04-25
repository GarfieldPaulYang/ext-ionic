import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Storage } from './storage';
import { MemoryStorage } from './mem-storage';
export declare class TextFileStorage implements Storage {
    protected platform: Platform;
    protected file: File;
    protected memoryStorage: MemoryStorage;
    constructor(platform: Platform, file: File, memoryStorage: MemoryStorage);
    save(filename: string, content: any): Promise<any>;
    load<T>(filename: string): Promise<T>;
    remove(filename: string): Promise<any>;
    protected serialize(content: any): string;
    protected deserialize(content: string): any;
    private writeToFile(filename, content);
    private readFile<T>(filename);
    private removeFile(filename);
    private getFilepath();
}
