import { ModalController, ModalOptions, ViewController } from 'ionic-angular';
import { OpenUrlModalOptions } from './open-url-modal-options';
export declare class OpenUrlModalController {
    private modalCtrl;
    private viewCtrl;
    private options;
    constructor(modalCtrl: ModalController, viewCtrl: ViewController);
    open(opts?: OpenUrlModalOptions, modalOpts?: ModalOptions): void;
    close(): void;
}
