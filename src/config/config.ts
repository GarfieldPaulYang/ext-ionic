import { Injectable } from '@angular/core';
import * as _ from 'lodash';

import { OpenUrlModalOptions } from '../components/open-url-modal/open-url-modal-options';
import { ImageLoaderOptions } from '../components/image-loader/image-loader-options';
import { BaiduMapOptions } from '../components/baidu-map/baidu-map-options';

export interface LoginConfig {
  appKey?: string;
  devMode?: boolean;
  url?: string;
}

export interface Config {
  color: string;
  login?: LoginConfig;
  openUrlModal?: OpenUrlModalOptions;
  imageLoader?: ImageLoaderOptions;
  baiduMap?: BaiduMapOptions;
}

@Injectable()
export class ConfigManager {
  private _config: Config = {
    color: 'light',
    openUrlModal: {
      color: 'light',
      onmessage: (e) => { }
    },
    login: {
      devMode: false
    },
    imageLoader: {
      spinnerEnabled: true,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      display: 'block',
      width: '100%',
      height: '100%',
      useImg: true,
      cacheDirectoryName: 'image-loader-cache'
    },
    baiduMap: {
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

  get openUrlModal(): OpenUrlModalOptions {
    return this._config.openUrlModal;
  }

  get imageLoader(): ImageLoaderOptions {
    return this._config.imageLoader;
  }

  get baiduMap(): BaiduMapOptions {
    return this._config.baiduMap;
  }

  get login(): LoginConfig {
    return this._config.login;
  }

  set(config: Config) {
    this._config = _.assign({}, this._config, config);
  }
}