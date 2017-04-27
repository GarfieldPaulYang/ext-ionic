import { Injectable } from '@angular/core';
import { Cordova, Plugin } from '@ionic-native/core';

@Plugin({
  pluginName: 'ImmersePlugin',
  plugin: 'cordova-plugin-Immerse',
  pluginRef: 'ImmersePlugin',
  repo: 'https://github.com/squallliu/cordova-plugin-Immerse',
  platforms: ['Android']
})
@Injectable()
export class Immerse {
  @Cordova({
    sync: true
  })
  setDarkMode(enable: boolean): void { }
}