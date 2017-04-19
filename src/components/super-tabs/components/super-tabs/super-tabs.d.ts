import { AfterViewInit, ElementRef, OnInit, OnDestroy, Renderer2, AfterContentInit, EventEmitter } from '@angular/core';
import { SuperTab } from '../super-tab/super-tab';
import { NavController, RootNode, NavControllerBase, ViewController, App } from 'ionic-angular';
import { SuperTabsController } from '../../providers/super-tabs-controller';
export interface SuperTabsConfig {
    /**
     * Defaults to 40
     */
    maxDragAngle?: number;
    /**
     * Defaults to 20
     */
    dragThreshold?: number;
    /**
     * Defaults to ease-in-out
     */
    transitionEase?: string;
    /**
     * Defaults to 150
     */
    transitionDuration?: number;
    /**
     * Defaults to none
     */
    sideMenu?: 'left' | 'right' | 'both';
    /**
     * Defaults to 50
     */
    sideMenuThreshold?: number;
    /**
     * Defaults to 300
     */
    shortSwipeDuration?: number;
}
export declare class SuperTabs implements OnInit, AfterContentInit, AfterViewInit, OnDestroy, RootNode {
    viewCtrl: ViewController;
    private _app;
    private el;
    private rnd;
    private superTabsCtrl;
    /**
     * Color of the toolbar behind the tab buttons
     */
    toolbarBackground: string;
    /**
     * Color of the tab buttons' text and/or icon
     */
    toolbarColor: string;
    /**
     * Color of the slider that moves based on what tab is selected
     */
    indicatorColor: string;
    /**
     * Badge color
     */
    badgeColor: string;
    /**
     * Configuration
     */
    config: SuperTabsConfig;
    /**
     * Tabs instance ID
     */
    id: string;
    /**
     * Height of the tabs
     */
    height: number;
    /**
     * The initial selected tab index
     * @param val {number} tab index
     */
    selectedTabIndex: number;
    scrollTabs: boolean;
    tabsPlacement: string;
    tabSelect: EventEmitter<any>;
    isToolbarVisible: boolean;
    /**
     * @private
     */
    tabs: SuperTab[];
    private toolbar;
    private tabsContainer;
    private maxIndicatorPosition;
    private _scrollTabs;
    private _selectedTabIndex;
    private watches;
    private hasIcons;
    private hasTitles;
    parent: NavControllerBase;
    constructor(parent: NavController, viewCtrl: ViewController, _app: App, el: ElementRef, rnd: Renderer2, superTabsCtrl: SuperTabsController);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    setBadge(tabId: string, value: number): void;
    clearBadge(tabId: string): void;
    increaseBadge(tabId: string, increaseBy: number): void;
    decreaseBadge(tabId: string, decreaseBy: number): void;
    enableTabsSwipe(enable: boolean): void;
    enableTabSwipe(tabId: string, enable: boolean): void;
    showToolbar(show: boolean): void;
    slideTo(indexOrId: string | number): void;
    getActiveChildNav(): SuperTab;
    addTab(tab: SuperTab): void;
    /**
     * We listen to drag events to move the "slide" thingy along with the slides
     * @param ev
     */
    onDrag(ev: TouchEvent): void;
    /**
     * We need to disable animation after the slide is done changing
     * Any further movement should happen instantly as the user swipes through the tabs
     */
    onSlideDidChange(): void;
    /**
     * Runs when the user clicks on a segment button
     * @param index
     */
    onTabSelect(index: number): void;
    onTabEnter(index: number): void;
    private updateTabWidth();
    private refreshContainerHeight();
    private refreshTabWidths();
    private alignTabButtonsContainer(ease?);
    private getRelativeIndicatorPosition(index?);
    private getAbsoluteIndicatorPosition();
    /**
     * Gets the width of a tab button when `scrollTabs` is set to `true`
     */
    private getSegmentButtonWidth(index?);
    private setFixedIndicatorWidth();
    /**
     * Aligns slide position with selected tab
     */
    private alignIndicatorPosition(ease?);
    private getTabIndexById(tabId);
    private getTabById(tabId);
    getElementRef(): ElementRef;
    initPane(): boolean;
    paneChanged(): void;
}
