import { OnInit, OnDestroy, OnChanges, SimpleChanges, NgZone } from '@angular/core';
import { DownloadManagerController, DownloadEvent } from './download-manager';
import { File, Entry, DirectoryEntry } from '@ionic-native/file';
export interface DownloadManager {
    downloadingList: Array<DownloadEvent>;
    fileList: Array<Entry>;
}
export declare class DownloadManagerCmp implements OnInit, OnDestroy, OnChanges {
    private downloadManagerCtl;
    private file;
    private ngZone;
    downloadManager: DownloadManager;
    breadcrumbs: Array<DirectoryEntry>;
    segmentValue: string;
    private destroy;
    constructor(downloadManagerCtl: DownloadManagerController, file: File, ngZone: NgZone);
    ngOnInit(): void;
    ngOnDestroy(): void;
    subscribe(): void;
    update(event: DownloadEvent): void;
    ngOnChanges(changes: SimpleChanges): void;
    loadFileList(directoryPath: string, push: boolean): void;
    itemCheck(entry: Entry): void;
    breadcrubCheck(entry: DirectoryEntry): void;
}
