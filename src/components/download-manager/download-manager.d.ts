import { EventEmitter, NgZone } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
export interface DownloadOptions {
    fileName: string;
    filePath?: string;
    url: string;
}
export interface DownloadEvent {
    fileName: string;
    filePath: string;
    progress: number;
}
export declare class DownloadManagerController {
    private platform;
    private ngZone;
    private _event;
    private idIndex;
    private _fileSystemRoot;
    private _rootDirectory;
    readonly event: EventEmitter<DownloadEvent>;
    readonly downloadDirectory: string;
    constructor(platform: Platform, ngZone: NgZone);
    show(navCtrl: NavController): void;
    download(option: DownloadOptions): Promise<any>;
    private createId();
    private createNotification(fileName);
    private updateLocalNotification(fileName, id, progress);
}
