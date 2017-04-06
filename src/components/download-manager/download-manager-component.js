"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const download_manager_1 = require("./download-manager");
const file_1 = require("@ionic-native/file");
const _ = require("lodash");
const util_1 = require("../../utils/util");
let DownloadManagerCmp = class DownloadManagerCmp {
    constructor(downloadManagerCtl, file, ngZone) {
        this.downloadManagerCtl = downloadManagerCtl;
        this.file = file;
        this.ngZone = ngZone;
        this.segmentValue = 'downloading';
    }
    ngOnInit() {
        this.destroy = false;
        this.downloadManager = { downloadingList: [], fileList: [] };
        this.subscribe();
        this.breadcrumbs = [];
        this.loadFileList(this.downloadManagerCtl.downloadDirectory, true);
    }
    ngOnDestroy() {
        this.destroy = true;
    }
    subscribe() {
        this.downloadManagerCtl.event.subscribe((event) => {
            if (this.destroy)
                return;
            this.update(event);
        });
    }
    update(event) {
        let file = _.find(this.downloadManager.downloadingList, { fileName: event.fileName, filePath: event.filePath });
        if (util_1.isPresent(file)) {
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
    ngOnChanges(changes) {
        console.log(changes);
    }
    loadFileList(directoryPath, push) {
        this.file.resolveDirectoryUrl(directoryPath).then(directory => {
            if (push) {
                this.breadcrumbs.push(directory);
            }
            let reader = directory.createReader();
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
    itemCheck(entry) {
        if (entry.isDirectory) {
            this.loadFileList(entry.nativeURL, true);
        }
    }
    breadcrubCheck(entry) {
        let index = _.findIndex(this.breadcrumbs, { fullPath: entry.fullPath });
        if (this.breadcrumbs.length - 1 !== index) {
            this.breadcrumbs.length = index + 1;
        }
        this.loadFileList(entry.nativeURL, false);
    }
};
DownloadManagerCmp = __decorate([
    core_1.Component({
        selector: 'page-download-file',
        styles: [`
    .breadcrumb{
      display: flex;
      flex-direction: row;
      list-style:none;
      padding-left: 10px;
    }
    .breadcrumb ion-icon{
      padding-left: 5px;
      padding-right: 5px;
      font-size: 1em;
    }
  `],
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
        <ion-list *ngSwitchCase="'downloading'">
          <ion-item *ngFor="let item of downloadManager.downloadingList">
            <div>{{item.fileName}}({{item.progress}}%)</div>
            <div>
              <progress value="{{item.progress}}" max="100"></progress>
            </div>
          </ion-item>
        </ion-list>
        <ion-list *ngSwitchCase="'history'">
          <ul class="breadcrumb">
            <li *ngFor="let item of breadcrumbs; let last = last" (click)="breadcrubCheck(item)">
              <a>{{item.name}}</a><ion-icon *ngIf="!last" name="ios-arrow-forward-outline"></ion-icon>
            </li>
          </ul>
          <ion-item-divider *ngFor="let item of downloadManager.fileList" (click)="itemCheck(item)">
            <ion-icon name="{{item.isFile ? 'document': 'folder'}}" item-left></ion-icon>
            {{item.name}}
            <ion-icon *ngIf="!last" name="ios-arrow-forward-outline" item-right></ion-icon>
          </ion-item-divider>
        </ion-list>
      </div>
    </ion-content>
  `
    }),
    __metadata("design:paramtypes", [download_manager_1.DownloadManagerController,
        file_1.File,
        core_1.NgZone])
], DownloadManagerCmp);
exports.DownloadManagerCmp = DownloadManagerCmp;
//# sourceMappingURL=download-manager-component.js.map