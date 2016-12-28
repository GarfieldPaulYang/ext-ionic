import { ElementRef, Renderer, OnInit } from '@angular/core';
import { ImageLoaderController } from "./image-loader";
import { ImageLoaderConfig } from "./image-loader-config";
export declare class ImageLoaderCmp implements OnInit {
    private element;
    private renderer;
    private imageLoader;
    private config;
    imageUrl: string;
    fallbackUrl: string;
    spinner: boolean;
    useImg: boolean;
    width: string;
    height: string;
    display: string;
    backgroundSize: string;
    backgroundRepeat: string;
    isLoading: boolean;
    constructor(element: ElementRef, renderer: Renderer, imageLoader: ImageLoaderController, config: ImageLoaderConfig);
    ngOnInit(): void;
    private setImage(imageUrl);
}
