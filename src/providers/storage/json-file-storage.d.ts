import { TextFileStorage } from './file-storage';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { MemoryStorage } from './mem-storage';
export declare class JsonFileStorage extends TextFileStorage {
    protected platform: Platform;
    protected file: File;
    protected memoryStorage: MemoryStorage;
    constructor(platform: Platform, file: File, memoryStorage: MemoryStorage);
    protected serialize(content: any): string;
    protected deserialize(content: string): any;
}
