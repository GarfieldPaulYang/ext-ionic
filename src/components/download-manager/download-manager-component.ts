import { Component } from '@angular/core';
import { DownloadManagerController, DownloadInfo } from './download-manager';

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
        <ion-item *ngFor="let item of lownloadList">
          <div>{{item.fileName}}</div>
          <div><ion-progress-bar [progress]="item.progress"></ion-progress-bar></div>
        </ion-item>
      </ion-list>
    </ion-content>
  `
})
export class DownloadManagerCmp {
  lownloadList: Array<DownloadInfo>;

  constructor(private downloadManagerCtl: DownloadManagerController) {
    this.lownloadList = this.downloadManagerCtl.lownloadList;
  }
}