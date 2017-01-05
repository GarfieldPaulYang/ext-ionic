import { Injectable } from '@angular/core';
import { assign } from 'ionic-angular/util/util';

import { OpenUrlModalOptions } from '../components/open-url-modal/open-url-modal-options';
import { ImageLoaderOptions } from '../components/image-loader/image-loader-options';

export interface Config {
  color: string;
  openUrlModalOptions?: OpenUrlModalOptions;
  imageLoaderOptions?: ImageLoaderOptions;
}

@Injectable()
export class ConfigManager {
  private _config: Config = {
    color: 'light',
    openUrlModalOptions: {
      color: 'light',
      onmessage: (e) => { }
    },
    imageLoaderOptions: {
      spinnerEnabled: true,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      display: 'block',
      width: '100%',
      height: '100%',
      useImg: true,
      cacheDirectoryName: 'image-loader-cache'
    }
  };

  get config(): Config {
    return this._config;
  }

  get openUrlModalOptions(): OpenUrlModalOptions {
    return this._config.openUrlModalOptions;
  }

  get imageLoaderOptions(): ImageLoaderOptions {
    return this._config.imageLoaderOptions;
  }

  set(config: Config) {
    this._config = assign({}, this._config, config);
  }
}