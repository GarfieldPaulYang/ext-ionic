import { OnInit, OnChanges, OnDestroy, ElementRef } from '@angular/core';
import { Content } from 'ionic-angular';
import { OrderBy } from '../../pipes/order-by';
export declare class AlphaScroll implements OnInit, OnChanges, OnDestroy {
    private _content;
    private _elementRef;
    private orderBy;
    listData: any;
    key: string;
    itemTemplate: string;
    currentPageClass: any;
    private _letterIndicatorEle;
    private _indicatorHeight;
    private _indicatorWidth;
    private _hammer;
    sortedItems: any;
    alphabet: any;
    constructor(_content: Content, _elementRef: ElementRef, orderBy: OrderBy);
    ngOnInit(): void;
    ngOnChanges(): void;
    ngOnDestroy(): void;
    setAlphaClass(alpha: any): string;
    calculateDimensionsForSidebar(): {
        top: string;
        height: string;
    };
    alphaScrollGoToList(letter: any): void;
    private setupHammerHandlers();
    private unwindGroup(groupItems);
    private iterateAlphabet(alphabet);
    private groupItems(sortedListData);
}
