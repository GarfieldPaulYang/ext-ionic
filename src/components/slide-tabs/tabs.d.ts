import { AfterViewInit, ElementRef, OnDestroy, Renderer, AfterContentInit } from '@angular/core';
import { SlideTab } from './tab';
import { NavController, Slides, Platform } from 'ionic-angular';
export declare class SlideTabs implements AfterContentInit, AfterViewInit, OnDestroy {
    private el;
    private rnd;
    private plt;
    /**
     * The parent page NavController.
     * This can be used to push a new view from the parent page.
     */
    rootNavCtrl: NavController;
    /**
     * Color of the toolbar behind the tab buttons
     */
    toolbarColor: string;
    /**
     * Color of the tab buttons' text and/or icon
     */
    tabsColor: string;
    /**
     * Color of the slider that moves based on what tab is selected
     */
    indicatorColor: string;
    /**
     * Height of the tabs
     */
    height: string;
    /**
     * The initial selected tab index
     * @param val {number} tab index
     */
    selectedTabIndex: number;
    private _scrollTabs;
    scrollTabs: boolean;
    private superTabs;
    /**
     * The tabs
     */
    tabs: SlideTab[];
    private slides;
    private toolbar;
    /**
     * @private
     */
    maxIndicatorPosition: number;
    private _selectedTabIndex;
    private screenOrientationWatch;
    private hasIcons;
    private hasTitles;
    private validSlideLocations;
    private isTouchingSlides;
    private lastTranslate;
    constructor(el: ElementRef, rnd: Renderer, plt: Platform);
    ngAfterContentInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * We listen to drag events to move the "slide" thingy along with the slides
     * @param ev
     */
    onDrag(ev: Slides): void;
    /**
     * The slide will change because the user stopped dragging, or clicked on a segment button
     * Let's make sure the segment button is in alignment with the slides
     * Also, lets animate the "slide" element
     */
    onSlideWillChange(): void;
    /**
     * We need to disable animation after the slide is done changing
     * Any further movement should happen instantly as the user swipes through the tabs
     */
    onSlideDidChange(ev: any): void;
    /**
     * Runs when the user clicks on a segment button
     * @param index
     */
    onTabSelect(index: number): void;
    setIsTouchingSlides(val: boolean): void;
    private indexValidSlideLocations();
    private validateSlideLocation(ev);
    private lockSwipes();
    private alignTabButtonsContainer();
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
    /**
     * Sets the height of ion-slides
     */
    private setSlidesHeight();
}
