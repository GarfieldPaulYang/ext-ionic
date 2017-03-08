import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, NgZone } from '@angular/core';
import { DownloadManagerController, DownloadEvent } from './download-manager';
import { File, Entry, DirectoryEntry, DirectoryReader } from 'ionic-native';
import * as _ from 'lodash';
import { isPresent } from '../../utils/util';

@Component({
  selector: 'page-download-file',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>文件下载</ion-title>
      </ion-navbar>
      <ion-segment [(ngModel)]="segmentValue">
        <ion-segment-button value="downloading">正在下载</ion-segment-button>
        <ion-segment-button value="history">下载历史</ion-segment-button>
      </ion-segment>
    </ion-header>
    <ion-content>
      <div [ngSwitch]="segmentValue">
        <ion-list *ngSwitchCase="'downloading'" no-lines>
          <ion-item *ngFor="let item of downloadManager.downloadingList">
            <div>{{item.fileName}}({{item.progress}}%)</div>
            <div>
              <progress value="{{item.progress}}" max="100"></progress>
            </div>
          </ion-item>
        </ion-list>
        <ion-list *ngSwitchCase="'history'" no-lines>
          <ion-item *ngIf="downloadManager.currentDirectory">
            当前目录:{{downloadManager.currentDirectory.name}}
          </ion-item>
          <ion-item *ngIf="downloadManager.parentDirectory" (click)="backToParent(downloadManager.parentDirectory)">
            回到上级目录
          </ion-item>
          <ion-item *ngFor="let item of downloadManager.fileList" (click)="itemCheck(item)">
            <ion-icon name="{{item.isFile ? 'document': 'folder'}}" item-left></ion-icon>
            {{item.name}}
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  `
})
export class DownloadManagerCmp implements OnInit, OnDestroy, OnChanges {
  private downloadManager: DownloadManager;
  private destroy: boolean;
  segmentValue: string = 'downloading';

  constructor(
    private downloadManagerCtl: DownloadManagerController,
    private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.destroy = false;
    this.downloadManager = { downloadingList: [], currentDirectory: null, fileList: [] };
    this.subscribe();
    this.loadFileList(this.downloadManagerCtl.downloadDirectory, null);
  }

  ngOnDestroy(): void {
    this.destroy = true;
  }

  subscribe() {
    this.downloadManagerCtl.event.subscribe((event: DownloadEvent) => {
      if (this.destroy) return;
      this.update(event);
    });
  }

  update(event: DownloadEvent) {
    let file: DownloadEvent = _.find(this.downloadManager.downloadingList,
      { fileName: event.fileName, filePath: event.filePath });
    if (isPresent(file)) {
      if (file.progress === 100) {
        file.progress = 0;
      }
      if (event.progress > file.progress) {
        file.progress = event.progress;
      }
      return;
    }
    this.downloadManager.downloadingList.push(event);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  loadFileList(directoryPath: string, parent: DirectoryEntry) {
    File.resolveDirectoryUrl(directoryPath).then(directory => {
      this.downloadManager.currentDirectory = directory;
      this.downloadManager.parentDirectory = parent;
      let reader: DirectoryReader = directory.createReader();
      this.downloadManager.fileList.length = 0;
      reader.readEntries(entries => {
        this.ngZone.run(() => {
          entries.forEach(e => {
            this.downloadManager.fileList.push(e);
          });
        });
      });
    });
  }

  itemCheck(entry: Entry) {
    if (entry.isDirectory) {
      this.loadFileList(entry.nativeURL, this.downloadManager.currentDirectory);
    }
  }

  backToParent(directory: DirectoryEntry) {
    let paths = directory.nativeURL.split('/');
    paths.length = paths.length - 1;
    let parentPath = paths.join('/');
    if ((parentPath + '/') === this.downloadManagerCtl.downloadDirectory) {
      this.loadFileList(this.downloadManagerCtl.downloadDirectory, null);
      return;
    }
    File.resolveDirectoryUrl(parentPath).then(parentDirectory => {
      this.loadFileList(directory.nativeURL, parentDirectory);
    });
  }
}

interface DownloadManager {
  downloadingList: Array<DownloadEvent>;
  parentDirectory?: DirectoryEntry;
  currentDirectory?: DirectoryEntry;
  fileList: Array<Entry>;
}

interface FileInfo {
  fileName: string;
  filePath: string;
}