import { Storage } from './storage';
export declare class MemoryStorage implements Storage {
    private localStorage;
    save(filename: string, content: any): Promise<any>;
    load<T>(filename: string): Promise<T>;
    remove(filename: string): Promise<any>;
}
