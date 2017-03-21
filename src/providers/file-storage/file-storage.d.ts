import { FileStorage } from './file-storage';
import { Platform } from 'ionic-angular';
import { File, RemoveResult } from '@ionic-native/file';
export interface FileStorage {
    save(filename: string, content: any): Promise<any>;
    load<T>(filename: string): Promise<T>;
    remove(filename: string): Promise<RemoveResult>;
}
export declare class TextFileStorage implements FileStorage {
    protected platform: Platform;
    protected file: File;
    private localStorage;
    constructor(platform: Platform, file: File);
    save(filename: string, content: any): Promise<void>;
    load<T>(filename: string): Promise<T>;
    remove(filename: string): Promise<RemoveResult>;
    protected serialize(content: any): string;
    protected deserialize(content: string): any;
    private writeToFile(filename, content);
    private readFile<T>(filename);
    private removeFile(filename);
    private getFilepath();
}
