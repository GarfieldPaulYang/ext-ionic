import { Loading, LoadingController, AlertController } from 'ionic-angular';
export declare class Dialog {
    private loadingCtrl;
    private alertCtrl;
    constructor(loadingCtrl: LoadingController, alertCtrl: AlertController);
    alert(title: string, message: string): void;
    loading(content: string): Loading;
}
