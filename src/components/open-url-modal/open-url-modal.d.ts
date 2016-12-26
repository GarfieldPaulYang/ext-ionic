import { ModalController, ModalOptions } from 'ionic-angular';
import { OpenUrlModalOptions } from './open-url-modal-options';
export declare class OpenUrlModalController {
    private modalCtrl;
    private options;
    private modal;
    constructor(modalCtrl: ModalController);
    open(opts?: OpenUrlModalOptions, modalOpts?: ModalOptions): void;
    close(): void;
}
