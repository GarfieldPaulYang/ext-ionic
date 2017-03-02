import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DownloadManagerController, DownloadManagerInfo } from './download-manager';

@Component({
  selector: 'page-download-file',
  template: `
    <ion-header>
      <ion-navbar>
        <ion-title>文件下载</ion-title>
      </ion-navbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item *ngFor="let item of downloadManagerInfo.downloadList">
          <div>{{item.fileName}}</div>
          <div>
            <progress value="{{item.progress}}" max="100"></progress>
          </div>
        </ion-item>
      </ion-list>
    </ion-content>
  `
})
export class DownloadManagerCmp implements OnDestroy {
  downloadManagerInfo: DownloadManagerInfo;

  constructor(
    private downloadManagerCtl: DownloadManagerController,
    private changeDetectorRef: ChangeDetectorRef) {
    this.downloadManagerCtl.pageChangeDetetorRef = changeDetectorRef;
    this.downloadManagerInfo = this.downloadManagerCtl.managerInfo;
  }

  ngOnDestroy(): void {
    this.downloadManagerCtl.pageChangeDetetorRef = null;
  }
}