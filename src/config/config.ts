import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { OpenUrlModalOptions } from '../components/open-url-modal/open-url-modal-options';
import { ImageLoaderOptions } from '../components/image-loader/image-loader-options';
import { BaiduMapOptions } from '../components/baidu-map/baidu-map-options';

export interface Config {
  color: string;
  openUrlModalOptions?: OpenUrlModalOptions;
  imageLoaderOptions?: ImageLoaderOptions;
  baiduMapOptions?: BaiduMapOptions;
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
    },
    baiduMapOptions: {
      navCtrl: true,
      scaleCtrl: true,
      overviewCtrl: true,
      enableScrollWheelZoom: false,
      zoom: 10,
      city: '武汉',
      mass: {
        enabled: false
      }
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

  get baiduMapOptions(): BaiduMapOptions {
    return this._config.baiduMapOptions;
  }

  set(config: Config) {
    this._config = _.assign({}, this._config, config);
  }
}