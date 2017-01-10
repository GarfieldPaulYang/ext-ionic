import { Component, Input, ElementRef, Renderer, OnInit } from '@angular/core';
import { isTrueProperty } from 'ionic-angular/util/util';
import * as _ from 'lodash';

import { ImageLoaderController } from "./image-loader";
import { ConfigManager } from "../../config/config";

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
    private config: ConfigManager
  ) { }

  ngOnInit(): void {
    if (!this.spinner && this.config.imageLoader.spinnerEnabled) {
      this.spinner = true;
    }

    if (!this.fallbackUrl) {
      this.fallbackUrl = this.config.imageLoader.fallbackUrl;
    }

    if (_.isUndefined(this.useImg)) {
      this.useImg = this.config.imageLoader.useImg;
    }
    this.useImg = isTrueProperty(this.useImg);

    if (!this.width) {
      this.width = this.config.imageLoader.width;
    }

    if (!this.height) {
      this.height = this.config.imageLoader.height;
    }

    if (!this.display) {
      this.display = this.config.imageLoader.display;
    }

    if (!this.backgroundSize) {
      this.backgroundSize = this.config.imageLoader.backgroundSize;
    }

    if (!this.backgroundRepeat) {
      this.backgroundRepeat = this.config.imageLoader.backgroundRepeat;
    }

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