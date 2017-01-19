import { OpaqueToken } from '@angular/core';

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
  hotUpdateUrl?: string;
  login?: LoginConfig;
  openUrlModal?: OpenUrlModalOptions;
  imageLoader?: ImageLoaderOptions;
  baiduMap?: BaiduMapOptions;
}

export const defaultConfig: Config = {
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

export const WHCYIT_IONIC_CONFIG = new OpaqueToken('WHCYIT-IONIC-CONFIG');