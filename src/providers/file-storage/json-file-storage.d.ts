import { TextFileStorage } from './file-storage';
import { Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
export declare class JsonFileStorage extends TextFileStorage {
    platform: Platform;
    file: File;
    constructor(platform: Platform, file: File);
    protected serialize(content: any): string;
    protected deserialize(content: string): any;
}
