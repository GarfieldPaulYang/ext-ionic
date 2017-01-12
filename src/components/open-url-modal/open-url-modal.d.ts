import { ModalController, ModalOptions } from 'ionic-angular';
import { Config } from '../../config/config';
import { OpenUrlModalOptions } from './open-url-modal-options';
export declare class OpenUrlModalController {
    private modalCtrl;
    private config;
    private options;
    private modal;
    constructor(modalCtrl: ModalController, config: Config);
    open(opts?: OpenUrlModalOptions, modalOpts?: ModalOptions): void;
    close(): void;
}
