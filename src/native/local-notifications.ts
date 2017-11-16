import { Injectable } from '@angular/core';
import { Cordova, Plugin } from '@ionic-native/core';
import { ILocalNotification, LocalNotifications } from '@ionic-native/local-notifications';

export interface ExtILocalNotification extends ILocalNotification {
  sticky?: boolean;
  autoClear?: boolean;
  group?: string;
  groupSummary?: boolean;
  progressBar?: { enabled?: boolean, value?: number, maxValue?: number, indeterminate?: boolean };
  summary?: string;
}

@Plugin({
  pluginName: 'LocalNotifications',
  plugin: 'cordova-plugin-local-notification',
  pluginRef: 'cordova.plugins.notification.local',
  repo: 'https://github.com/katzer/cordova-plugin-local-notifications',
  platforms: ['Android', 'iOS', 'Windows']
})
@Injectable()
export class ExtLocalNotifications extends LocalNotifications {
  @Cordova({
    sync: true
  })
  schedule(_options?: ExtILocalNotification | Array<ExtILocalNotification>): void { }

  @Cordova({
    sync: true
  })
  update(_options?: ExtILocalNotification): void { }
}