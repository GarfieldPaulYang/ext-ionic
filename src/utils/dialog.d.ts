import { Loading, LoadingController, AlertController, ToastController } from 'ionic-angular';
export declare class Dialog {
    private loadingCtrl;
    private alertCtrl;
    private toastCtrl;
    constructor(loadingCtrl: LoadingController, alertCtrl: AlertController, toastCtrl: ToastController);
    alert(title: string, message: string): void;
    confirm(title: string, message: string, handler: Function): void;
    loading(content: string): Loading;
    toast(message: string, position?: string): void;
}
