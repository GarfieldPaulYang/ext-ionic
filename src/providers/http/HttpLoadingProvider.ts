import { EventEmitter, Injectable } from '@angular/core';
import { Loading } from 'ionic-angular';
import { HttpProviderOptions } from './http';
import { Dialog } from '../../utils/dialog';

@Injectable()
export class HttpLoadingProvider {
  private onLoadingChanged: EventEmitter<any> = new EventEmitter();
  private requests: HttpProviderOptions[] = [];
  private loading: Loading;

  constructor(private dialog: Dialog) {
    this.onLoadingChanged.subscribe(opts => {
      if (!opts.showLoading) {
        return;
      }

      if (opts.isLoading) {
        if (!this.loading) {
          this.loading = this.dialog.loading(opts.loadingContent);
          this.loading.present().catch(() => { });
        }
        return;
      }

      if (this.loading) {
        this.loading.dismiss().catch(() => { });
      }
    });
  }

  onStarted(opts: HttpProviderOptions): void {
    this.requests.push(opts);
    this.notify(opts);
  }

  onFinished(opts: HttpProviderOptions): void {
    const index = this.requests.indexOf(opts);
    if (index !== -1) {
      this.requests.splice(index, 1);
    }
    this.notify(opts);
  }

  private notify(opts: HttpProviderOptions): void {
    this.onLoadingChanged.emit({
      isLoading: this.requests.length !== 0,
      loadingContent: opts.loadingContent,
      showLoading: opts.showLoading
    });
  }
}