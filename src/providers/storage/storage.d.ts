export interface Storage {
    save(filename: string, content: any): Promise<any>;
    load<T>(filename: string): Promise<T>;
    remove(filename: string): Promise<any>;
}
