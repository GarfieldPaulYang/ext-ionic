import { Renderer, ElementRef, ComponentFactoryResolver, NgZone, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { NavControllerBase, App, Config, Platform, Keyboard, GestureController, DeepLinker, DomController } from 'ionic-angular';
import { TransitionController } from 'ionic-angular/transitions/transition-controller';
import { SuperTabs } from '../super-tabs/super-tabs';
export declare class SuperTab extends NavControllerBase implements OnInit, OnDestroy {
    private linker;
    private _dom;
    title: string;
    readonly tabTitle: string;
    readonly index: any;
    icon: string;
    /**
     * @input {Page} Set the root page for this tab.
     */
    root: any;
    /**
     * @input {object} Any nav-params to pass to the root page of this tab.
     */
    rootParams: any;
    tabId: string;
    readonly _tabId: string;
    badge: number;
    loaded: boolean;
    /**
     * @hidden
     */
    _vp: ViewContainerRef;
    constructor(parent: SuperTabs, app: App, config: Config, plt: Platform, keyboard: Keyboard, el: ElementRef, zone: NgZone, rnd: Renderer, cfr: ComponentFactoryResolver, gestureCtrl: GestureController, transCtrl: TransitionController, linker: DeepLinker, _dom: DomController);
    ngOnInit(): void;
    load(): Promise<void>;
    ngOnDestroy(): void;
    setBadge(value: number): void;
    clearBadge(): void;
    increaseBadge(increaseBy: number): void;
    decreaseBadge(decreaseBy: number): void;
    setWidth(width: number): void;
}
