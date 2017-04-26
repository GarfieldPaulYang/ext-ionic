import { Storage, SaveOptions, LoadOptions, RemoveOptions } from './storage';
export declare class MemoryStorage implements Storage {
    private localStorage;
    save(options: SaveOptions): Promise<any>;
    load<T>(options: LoadOptions): Promise<T>;
    remove(options: RemoveOptions): Promise<any>;
    private getKey(filename, dirname);
}
