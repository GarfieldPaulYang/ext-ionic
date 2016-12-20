import { OnInit, OnChanges, ElementRef, SimpleChange } from '@angular/core';
import { Content } from 'ionic-angular';
export declare class AlphaScroll implements OnInit, OnChanges {
    private _content;
    private _elementRef;
    listData: any;
    key: string;
    itemTemplate: string;
    currentPageClass: any;
    triggerChange: any;
    private _scrollEle;
    sortedItems: any;
    alphabet: any;
    ionAlphaScrollRef: this;
    alphaScrollTemplate: string;
    constructor(_content: Content, _elementRef: ElementRef);
    ngOnInit(): void;
    ngOnChanges(changes: {
        [propertyName: string]: SimpleChange;
    }): void;
    calculateScrollDimensions(): {
        height: string;
        width: string;
    };
    calculateDimensionsForSidebar(): {
        top: string;
        height: string;
    };
    alphaScrollGoToList(letter: any): void;
    iterateAlphabet(alphabet: any): any[];
    setupHammerHandlers(): void;
    trackBySortedItems(index: number, item: any): number;
}
