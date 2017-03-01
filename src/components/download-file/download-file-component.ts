import { Component, OnInit } from '@angular/core';
import { Events } from 'ionic-angular';
import { download_progress } from './download-file';
import * as _ from 'lodash';
import { isPresent } from '../../utils/util';

export interface DownloadProgress {
  fileName: string;
  progress: number;
}

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
        <ion-item *ngFor="let item of download">
          <div>{{item.fileName}}</div>
          <div><ion-progress-bar [progress]="item.progress"></ion-progress-bar></div>
        </ion-item>
      </ion-list>
    </ion-content>
  `
})
export class DownloadFileCmp implements OnInit {
  download: Array<DownloadProgress> = [];
  finish: Array<any> = [];

  constructor(private events: Events) {
  }

  ngOnInit(): void {
    let me = this;
    this.events.subscribe(download_progress, (opt: DownloadProgress) => {
      console.log('opt');
      console.log(opt);
      let file = _.find(me.download, { fileName: opt.fileName });
      if (!isPresent(file)) {
        me.download.push(opt);
        return;
      }
      console.log('file');
      console.log(file);
      file.progress = opt.progress;
    });
  }
}