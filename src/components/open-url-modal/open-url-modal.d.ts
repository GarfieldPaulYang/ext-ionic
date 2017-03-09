import { ModalController, ModalOptions } from 'ionic-angular';
import { ConfigProvider } from '../../config/config';
import { OpenUrlModalOptions } from './open-url-modal-options';
export declare class OpenUrlModalController {
    private modalCtrl;
    private config;
    private options;
    private modal;
    constructor(modalCtrl: ModalController, config: ConfigProvider);
    open(opts?: OpenUrlModalOptions, modalOpts?: ModalOptions): void;
    close(): void;
}
