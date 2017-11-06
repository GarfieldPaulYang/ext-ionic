declare var require: any;

export class SignaturePad {
  private signaturePad: any;

  constructor(canvas: any) {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const SPad: any = require('signature_pad').default;
    this.signaturePad = new SPad(canvas);
  }

  clear(): void {
    this.signaturePad.clear();
  }

  toDataURL(): any {
    return this.signaturePad.toDataURL();
  }

  toBlob(): Blob {
    const urlData = this.toDataURL();
    return this.convertBase64UrlToBlob(urlData);
  }

  convertBase64UrlToBlob(urlData): Blob {
    let bsStr = atob(urlData.split(',')[1]);
    var ab = new ArrayBuffer(bsStr.length);
    let u8Array = new Uint8Array(ab);
    for (let i = 0; i < bsStr.length; i++) {
      u8Array[i] = bsStr.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
  }

  isEmpty() {
    return this.signaturePad.isEmpty();
  }
}