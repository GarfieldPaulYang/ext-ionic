import { Platform } from 'ionic-angular';
import { ConfigProvider } from '../config/config';
import { Dialog } from '../utils/dialog';
import { OpenUrlModalController } from '../components/open-url-modal/open-url-modal';
export declare class HotUpdater {
    private platform;
    private dialog;
    private config;
    private openUrlCtrl;
    constructor(platform: Platform, dialog: Dialog, config: ConfigProvider, openUrlCtrl: OpenUrlModalController);
    start(): void;
    updateApp(): void;
    updateIos(): void;
    updateAndroid(): void;
}
