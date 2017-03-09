import { TextFileStorage } from './file-storage';
import { Platform } from 'ionic-angular';
export declare class JsonFileStorage extends TextFileStorage {
    platform: Platform;
    constructor(platform: Platform);
    protected serialize(content: any): string;
    protected deserialize(content: string): any;
}
