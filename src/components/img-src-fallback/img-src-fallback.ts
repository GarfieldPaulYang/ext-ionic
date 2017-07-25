import { Directive, ElementRef, Input, Renderer } from '@angular/core';

@Directive({
  selector: 'img[fallbackUrl]',
  host: {
    '[src]': 'checkSrc(src)',
    '(error)': 'onError()'
  }
})
export class ImgFallbackDirective {
  @Input() fallbackUrl: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer) { }

  onError() {
    this.renderer.setElementAttribute(this.elementRef.nativeElement, 'src', this.fallbackUrl);
  }

  checkSrc(src) {
    return src ? src : this.fallbackUrl;
  }
}