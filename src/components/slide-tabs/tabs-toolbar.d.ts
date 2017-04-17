import { EventEmitter, ElementRef, Renderer } from '@angular/core';
import { Platform } from 'ionic-angular';
export declare class SlideTabsToolbar {
    private rnd;
    private el;
    private plt;
    color: string;
    tabsColor: string;
    scrollTabs: boolean;
    ease: boolean;
    indicatorPosition: number;
    indicatorWidth: number;
    indicatorColor: string;
    selectedTab: number;
    tabSelect: EventEmitter<any>;
    private segmentButtons;
    private segment;
    private indicator;
    /**
     * @private
     */
    segmentPosition: number;
    /**
     * The width of each button
     */
    segmentButtonWidths: number[];
    /**
     * The segment width
     */
    segmentWidth: number;
    tabs: any[];
    private _indicatorColor;
    /**
     * Used to handle manual tab buttons container scrolling. Tracks the last touch position to determine how much to scroll by.
     */
    private lastTouchPositionX;
    /**
     * Indicates whether this component is initialized
     */
    private init;
    constructor(rnd: Renderer, el: ElementRef, plt: Platform);
    ngAfterViewInit(): void;
    initToolbar(): void;
    onTabButtonsContainerTouch(name: string, ev: any): void;
    onTabSelect(index: number): void;
    setIndicatorProperties(position: number, width: number, shouldEase?: boolean): void;
    setIndicatorPosition(position?: number, shouldEase?: boolean): void;
    setIndicatorWidth(width: number, shouldEase?: boolean): void;
    setSegmentPosition(position: number): void;
    private toggleEase();
    /**
     * Indexes the segment button widths
     */
    private indexSegmentButtonWidths();
    /**
     * Sets the color of the indicator
     */
    private setIndicatorColor(color);
}
