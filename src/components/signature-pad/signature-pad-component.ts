import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SignaturePad } from './signature-pad';
import { AlertController, NavParams, ViewController } from 'ionic-angular';
import { SignaturePadOptions } from './signature-pad-controller';

@Component({
  selector: 'signature-pad',
  styles: [`
  .signature-pad-body {
    position: absolute;
    top: 5px;
    left: 5px;
    bottom: 40px;
    right: 5px;
    border: 1px solid #f4f4f4;
  }
  .signature-pad-body canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.02) inset;
  }
  .signature-pad-footer {
    position: absolute;
    left: 5px;
    bottom: 0px;
    right: 5px;
  }
`],
  template: `
  <div class='signature-pad-body'>
    <canvas #signature_pad_canvas></canvas>
  </div>
  <div class='signature-pad-footer'>
    <ion-buttons left>
      <button ion-button (click)="clear()">清空</button>
      <button ion-button (click)="confirm()">确定</button>
      <button ion-button (click)="close()">关闭</button>
    </ion-buttons>
  </div>
`,
})
export class SignaturePadCmp implements AfterViewInit {
  @ViewChild('signature_pad_canvas') spadCanvas;
  spad: SignaturePad;
  options: SignaturePadOptions;

  constructor(
    navParams: NavParams,
    private alertCtrl: AlertController,
    private viewCtrl: ViewController
  ) {
    this.options = navParams.get('options');
  }

  ngAfterViewInit(): void {
    this.spad = new SignaturePad(this.spadCanvas.nativeElement);
  }

  close() {
    this.viewCtrl.dismiss();
  }

  clear() {
    this.spad.clear();
  }

  confirm() {
    if (this.spad.isEmpty()) {
      const alert = this.alertCtrl.create({
        title: '请绘制内容',
        buttons: [{
          text: '确认',
          role: 'cancel'
        }]
      });
      alert.present();
      return;
    }
    const dataUrl = this.spad.toDataURL();
    const formData = new FormData();
    const blob = this.spad.convertBase64UrlToBlob(dataUrl);
    formData.append('signature', blob, 'signature.png');
    this.viewCtrl.dismiss({
      dataUrl: dataUrl,
      formData: formData
    });
  }
}