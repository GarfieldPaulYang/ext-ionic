import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ViewController, NavParams } from 'ionic-angular';
import { OpenUrlModalOptions } from './open-url-modal-options';
export declare class OpenUrlModalCmp {
    private navParams;
    private viewCtrl;
    private sanitizer;
    options: OpenUrlModalOptions;
    safeUrl: SafeResourceUrl;
    constructor(navParams: NavParams, viewCtrl: ViewController, sanitizer: DomSanitizer);
    dismiss(): void;
}
