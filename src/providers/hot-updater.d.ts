import { Platform } from 'ionic-angular';
import { Transfer } from '@ionic-native/transfer';
import { FileOpener } from '@ionic-native/file-opener';
import { HotCodePush } from '../native/hot-code-push';
import { ConfigProvider } from '../config/config';
import { Dialog } from '../utils/dialog';
import { ExtLocalNotifications } from '../native/local-notifications';
export declare class HotUpdater {
    private platform;
    private dialog;
    private config;
    private hotCodePush;
    private localNotifications;
    private transfer;
    private fileOpener;
    constructor(platform: Platform, dialog: Dialog, config: ConfigProvider, hotCodePush: HotCodePush, localNotifications: ExtLocalNotifications, transfer: Transfer, fileOpener: FileOpener);
    start(): void;
    updateApp(): void;
    updateIos(): void;
    updateAndroid(): void;
}
