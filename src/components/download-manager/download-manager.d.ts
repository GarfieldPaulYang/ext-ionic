import { EventEmitter, NgZone } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { Transfer } from '@ionic-native/transfer';
import { ExtLocalNotifications } from '../../native/local-notifications';
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
    private transfer;
    private localNotifications;
    private ngZone;
    private _event;
    private id;
    private _fileSystemRoot;
    private _rootDirectory;
    readonly event: EventEmitter<DownloadEvent>;
    readonly downloadDirectory: string;
    constructor(platform: Platform, transfer: Transfer, localNotifications: ExtLocalNotifications, ngZone: NgZone);
    show(navCtrl: NavController): void;
    download(option: DownloadOptions): Promise<any>;
    private createId();
    private createNotification(fileName);
    private updateLocalNotification(fileName, id, progress);
}
