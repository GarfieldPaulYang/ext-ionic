import { Platform } from 'ionic-angular';
import { ConfigProvider } from '../config/config';
import { Dialog } from '../utils/dialog';
export declare class HotUpdater {
    private platform;
    private dialog;
    private config;
    constructor(platform: Platform, dialog: Dialog, config: ConfigProvider);
    start(): void;
    updateApp(): void;
}
