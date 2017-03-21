import { ILocalNotification, LocalNotifications } from '@ionic-native/local-notifications';
export interface ExtILocalNotification extends ILocalNotification {
    progress?: boolean;
    removeProgress?: boolean;
    maxProgress?: number;
    currentProgress?: number;
}
export declare class ExtLocalNotifications extends LocalNotifications {
    schedule(options?: ExtILocalNotification | Array<ExtILocalNotification>): void;
    update(options?: ExtILocalNotification): void;
}
