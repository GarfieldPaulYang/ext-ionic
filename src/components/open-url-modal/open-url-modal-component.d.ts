import { ViewController, NavParams } from 'ionic-angular';
import { OpenUrlModalOptions } from './open-url-modal-options';
export declare class OpenUrlModalCmp {
    private navParams;
    private viewCtrl;
    options: OpenUrlModalOptions;
    constructor(navParams: NavParams, viewCtrl: ViewController);
    dismiss(): void;
}
