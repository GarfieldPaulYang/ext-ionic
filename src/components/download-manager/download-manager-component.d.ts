import { OnInit, OnDestroy, OnChanges, SimpleChanges, NgZone } from '@angular/core';
import { DownloadManagerController, DownloadEvent } from './download-manager';
import { Entry, DirectoryEntry } from 'ionic-native';
export declare class DownloadManagerCmp implements OnInit, OnDestroy, OnChanges {
    private downloadManagerCtl;
    private ngZone;
    private downloadManager;
    private destroy;
    private breadcrumbs;
    segmentValue: string;
    constructor(downloadManagerCtl: DownloadManagerController, ngZone: NgZone);
    ngOnInit(): void;
    ngOnDestroy(): void;
    subscribe(): void;
    update(event: DownloadEvent): void;
    ngOnChanges(changes: SimpleChanges): void;
    loadFileList(directoryPath: string, push: boolean): void;
    itemCheck(entry: Entry): void;
    breadcrubCheck(entry: DirectoryEntry): void;
}
