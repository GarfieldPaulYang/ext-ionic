import { EventEmitter, ElementRef, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';
import { Platform, DomController } from 'ionic-angular';
import { SuperTabsConfig } from '../super-tabs/super-tabs';
export declare class SuperTabsToolbar implements AfterViewInit, OnDestroy {
    private el;
    private plt;
    private rnd;
    private domCtrl;
    color: string;
    tabsColor: string;
    badgeColor: string;
    scrollTabs: boolean;
    indicatorColor: string;
    selectedTab: number;
    config: SuperTabsConfig;
    tabsPlacement: string;
    indicatorPosition: number;
    indicatorWidth: number;
    tabSelect: EventEmitter<any>;
    private segmentButtons;
    private tabButtonsContainer;
    private indicator;
    private segment;
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
    private gesture;
    constructor(el: ElementRef, plt: Platform, rnd: Renderer2, domCtrl: DomController);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    onTabSelect(index: number): void;
    alignIndicator(position: number, width: number, animate?: boolean): void;
    setIndicatorPosition(position: number, animate?: boolean): void;
    setIndicatorWidth(width: number, animate?: boolean): void;
    setSegmentPosition(position: number, animate?: boolean): void;
    /**
     * Enables/disables animation
     * @param el
     * @param animate
     */
    private toggleAnimation(el, animate);
    /**
     * Indexes the segment button widths
     */
    private indexSegmentButtonWidths();
}
