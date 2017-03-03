import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { DownloadManagerController, DownloadEvent } from './download-manager';
import { isPresent } from '../../utils/util';

@Component({
  selector: 'page-download-file',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>文件下载</ion-title>
      </ion-navbar>
      <ion-segment [(ngModel)]="segmentValue" (ionChange)="segmentChange()">
        <ion-segment-button value="'downloading'">正在下载</ion-segment-button>
        <ion-segment-button value="'history'">下载历史</ion-segment-button>
      </ion-segment>
    </ion-header>
    <ion-content>
      <div [ngSwitch]="segmentValue">
        <ion-list *ngSwitchCase="'downloading'">
          <ion-item *ngFor="let item of downloadManager.downloadingList">
            <div>{{item.fileName}}({{item.progress}}%)</div>
            <div>
              <progress value="{{item.progress}}" max="100"></progress>
            </div>
          </ion-item>
        </ion-list>
        <ion-list *ngSwitchCase="'history'">
          <ion-item *ngFor="let item of downloadManager.downloadingList">
            <div>{{item.fileName}}({{item.progress}}%)</div>
            <div>
              <progress value="{{item.progress}}" max="100"></progress>
            </div>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  `
})
export class DownloadManagerCmp implements OnInit, OnDestroy {
  private downloadManager: DownloadManager;
  private destroy: boolean;
  segmentValue: string = 'downloading';

  constructor(
    private downloadManagerCtl: DownloadManagerController,
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.destroy = false;
    this.downloadManager = { downloadingList: [] };
    this.subscribe();
  }

  ngOnDestroy(): void {
    this.destroy = true;
  }

  subscribe() {
    this.downloadManagerCtl.event.subscribe((event: DownloadEvent) => {
      if (this.destroy) return;
      this.update(event);
      this.changeDetectorRef.detectChanges();
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

  segmentChange() {

  }
}

interface DownloadManager {
  downloadingList: Array<DownloadEvent>;
}