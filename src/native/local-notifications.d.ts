import { ILocalNotification, LocalNotifications } from 'ionic-native';
export interface ExtILocalNotification extends ILocalNotification {
    progress?: boolean;
    removeProgress?: boolean;
    maxProgress?: number;
    currentProgress?: number;
}
export declare class ExtLocalNotifications extends LocalNotifications {
    static updateProgress(options?: ExtILocalNotification): void;
}
