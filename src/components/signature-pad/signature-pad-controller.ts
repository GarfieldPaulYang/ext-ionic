import { Injectable } from '@angular/core';
import { Popover, PopoverController } from 'ionic-angular';
import { SignaturePadCmp } from './signature-pad-component';

export interface Signature {
  dataUrl: any;
  formData: FormData;
}

export interface SignaturePadOptions {
  onDidDismiss: (data: Signature) => void;
}

@Injectable()
export class SignaturePadController {

  pop: Popover;

  constructor(
    private popoverCtrl: PopoverController
  ) {
  }

  show(options: SignaturePadOptions) {
    this.pop = this.popoverCtrl.create(SignaturePadCmp, { options: options }, { cssClass: 'signature-popover' });
    this.pop.present();
    this.pop.onDidDismiss((signature: Signature) => {
      if (signature) {
        options.onDidDismiss(signature);
      }
    });
    return this;
  }
}