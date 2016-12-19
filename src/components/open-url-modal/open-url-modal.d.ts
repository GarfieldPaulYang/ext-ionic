import { ModalController, ModalOptions } from 'ionic-angular';
import { OpenUrlModalOptions } from './open-url-modal-options';
export declare class OpenUrlModalController {
    private modalCtrl;
    constructor(modalCtrl: ModalController);
    open(opts?: OpenUrlModalOptions, modalOpts?: ModalOptions): void;
}
