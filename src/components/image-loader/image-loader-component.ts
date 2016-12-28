import { Component, Input, ElementRef, Renderer, OnInit } from '@angular/core';
import { ImageLoaderController } from "./image-loader";
import { ImageLoaderConfig } from "./image-loader-config";

@Component({
  selector: 'ion-image-loader',
  template: '<ion-image-loader-spinner *ngIf="spinner && isLoading"></ion-image-loader-spinner>'
})
export class ImageLoaderCmp implements OnInit {
  @Input('src') imageUrl: string;
  @Input('fallback') fallbackUrl: string;
  @Input() spinner: boolean;
  @Input() useImg: boolean;
  @Input() width: string;
  @Input() height: string;
  @Input() display: string;
  @Input() backgroundSize: string;
  @Input() backgroundRepeat: string;

  isLoading: boolean = true;

  constructor(
    private element: ElementRef,
    private renderer: Renderer,
    private imageLoader: ImageLoaderController,
    private config: ImageLoaderConfig
  ) {
    if (!this.spinner && config.spinnerEnabled) {
      this.spinner = true;
    }

    if (!this.fallbackUrl) {
      this.fallbackUrl = config.fallbackUrl;
    }

    if (!this.useImg) {
      this.useImg = config.useImg;
    }

    if (!this.width) {
      this.width = config.width;
    }

    if (!this.height) {
      this.height = config.height;
    }

    if (!this.display) {
      this.display = config.display;
    }

    if (!this.backgroundSize) {
      this.backgroundSize = config.backgroundSize;
    }

    if (!this.backgroundRepeat) {
      this.backgroundRepeat = config.backgroundRepeat;
    }
  }

  ngOnInit(): void {
    if (!this.imageUrl) {
      if (this.fallbackUrl) {
        this.setImage(this.fallbackUrl);
      }
      this.isLoading = false;
      return;
    }

    this.imageLoader.getImagePath(this.imageUrl).then((imageUrl: string) => {
      this.setImage(imageUrl);
    });
  }

  private setImage(imageUrl: string): void {
    let element;
    this.isLoading = false;

    if (this.useImg) {
      this.renderer.createElement(this.element.nativeElement, 'img');
      element = <HTMLImageElement>this.element.nativeElement.getElementsByTagName('IMG')[0];
      this.renderer.setElementAttribute(element, 'src', imageUrl);
      this.renderer.listen(element, 'error', (event) => {
        this.imageLoader.removeCacheFile(imageUrl);
        if (this.fallbackUrl) {
          this.renderer.setElementAttribute(element, 'src', this.fallbackUrl);
        }
      });
      return;
    }

    element = this.element.nativeElement;
    if (this.display) {
      this.renderer.setElementStyle(element, 'display', this.display);
    }

    if (this.height) {
      this.renderer.setElementStyle(element, 'height', this.height);
    }

    if (this.width) {
      this.renderer.setElementStyle(element, 'width', this.width);
    }

    if (this.backgroundSize) {
      this.renderer.setElementStyle(element, 'background-size', this.backgroundSize);
    }

    if (this.backgroundRepeat) {
      this.renderer.setElementStyle(element, 'background-repeat', this.backgroundRepeat);
    }

    this.renderer.setElementStyle(element, 'background-image', 'url(\'' + imageUrl + '\')');
  }
}