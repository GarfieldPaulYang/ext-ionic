import { Cordova, Plugin } from 'ionic-native';

@Plugin({
  pluginName: 'ImmersePlugin',
  plugin: 'cordova-plugin-Immerse',
  pluginRef: 'ImmersePlugin',
  repo: 'https://github.com/squallliu/cordova-plugin-Immerse'
})
export class Immerse {
  @Cordova({
    sync: true
  })
  static setDarkMode(enable: boolean): void { }
}