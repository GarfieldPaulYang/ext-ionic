import { ElementRef, OnInit, Renderer2 } from '@angular/core';
export interface RibbnOptions {
    backgroundColor: string;
    ribbonColor: string;
    ribbonText: string;
    fontSize: string;
    heightAmend: number;
}
export declare class Ribbon implements OnInit {
    private renderer;
    private elementRef;
    riangleStyleOne: any;
    triangleStyleTwo: any;
    textStyle: any;
    ribbonOption: RibbnOptions;
    constructor(renderer: Renderer2, elementRef: ElementRef);
    ngOnInit(): void;
}
