import { ElementRef, Renderer, OnInit, EventEmitter } from '@angular/core';
import { ImageLoaderController } from './image-loader';
import { ConfigProvider } from '../../config/config';
export declare class ImageLoaderCmp implements OnInit {
    private elementRef;
    private renderer;
    private imageLoader;
    private config;
    private _src;
    src: string;
    cache: boolean;
    fallbackUrl: string;
    spinner: boolean;
    useImg: boolean;
    width: string;
    height: string;
    display: string;
    backgroundSize: string;
    backgroundRepeat: string;
    load: EventEmitter<ImageLoaderCmp>;
    isLoading: boolean;
    private element;
    constructor(elementRef: ElementRef, renderer: Renderer, imageLoader: ImageLoaderController, config: ConfigProvider);
    ngOnInit(): void;
    private processImageUrl(imageUrl);
    private updateImage(imageUrl);
    private setImage(imageUrl);
}
