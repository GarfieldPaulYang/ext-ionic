import { FileStorage } from './file-storage';
import { Platform } from 'ionic-angular';
export interface FileStorage {
    save(filename: string, content: any): Promise<boolean>;
    load<T>(filename: string): Promise<T>;
    remove(filename: string): Promise<boolean>;
}
export declare class TextFileStorage implements FileStorage {
    protected platform: Platform;
    private localStorage;
    constructor(platform: Platform);
    save(filename: string, content: any): Promise<boolean>;
    load<T>(filename: string): Promise<T>;
    remove(filename: string): Promise<boolean>;
    protected serialize(content: any): string;
    protected deserialize(content: string): any;
    private writeToFile(filename, content);
    private readFile<T>(filename);
    private removeFile(filename);
    private getFilepath();
}
