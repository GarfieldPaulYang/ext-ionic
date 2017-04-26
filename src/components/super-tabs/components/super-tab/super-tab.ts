import {
  Component, Input, Renderer, ElementRef, ViewEncapsulation, Optional, ComponentFactoryResolver,
  NgZone, ViewContainerRef, ViewChild, OnInit, OnDestroy, ChangeDetectorRef
} from '@angular/core';
import { NavControllerBase, App, Config, Platform, Keyboard, GestureController, DeepLinker, DomController } from 'ionic-angular';
import { TransitionController } from 'ionic-angular/transitions/transition-controller';
import { SuperTabs } from '../super-tabs/super-tabs';
import { ErrorHandler } from '@angular/core';

@Component({
  selector: 'ion-super-tab',
  template: '<div #viewport></div><div class="nav-decor"></div>',
  encapsulation: ViewEncapsulation.None
})
export class SuperTab extends NavControllerBase implements OnInit, OnDestroy {
  @Input()
  title: string;

  get tabTitle() {
    return this.title;
  }

  get index() {
    return this.parent.getTabIndexById(this.tabId);
  }

  @Input()
  icon: string;

  /**
   * @input {Page} Set the root page for this tab.
   */
  @Input() root: any;

  /**
   * @input {object} Any nav-params to pass to the root page of this tab.
   */
  @Input() rootParams: any;

  @Input('id')
  tabId: string;

  get _tabId() {
    return this.tabId;
  }

  @Input()
  badge: number = 0;

  @Input()
  get swipeBackEnabled(): boolean {
    return this._sbEnabled;
  }

  set swipeBackEnabled(val: boolean) {
    this._sbEnabled = !!val;
    this._swipeBackCheck();
  }

  loaded: boolean = false;

  /**
   * @hidden
   */
  @ViewChild('viewport', { read: ViewContainerRef })
  set _vp(val: ViewContainerRef) {
    this.setViewport(val);
  }

  constructor(
    parent: SuperTabs,
    app: App,
    config: Config,
    plt: Platform,
    keyboard: Keyboard,
    el: ElementRef,
    zone: NgZone,
    rnd: Renderer,
    cfr: ComponentFactoryResolver,
    gestureCtrl: GestureController,
    transCtrl: TransitionController,
    @Optional() private linker: DeepLinker,
    private _dom: DomController,
    private errHandler: ErrorHandler,
    private cd: ChangeDetectorRef
  ) {
    super(parent, app, config, plt, keyboard, el, zone, rnd, cfr, gestureCtrl, transCtrl, linker, _dom, errHandler);
  }

  ngOnInit() {
    this.parent.addTab(this);
  }

  load(): Promise<void> {
    if (this.loaded) {
      this._dom.read(() => {
        this.resize();
      });
      return Promise.resolve();
    }

    return this.push(this.root, this.rootParams, { animate: false }).then(() => {
      this.loaded = true;
      this._dom.read(() => {
        this.resize();
      });
    });
  }

  ngOnDestroy() {
    this.destroy();
  }

  setActive(active: boolean) {
    let viewCtrl = this.getActive();
    if (active) {
      this.cd.reattach();
      if (this.loaded && viewCtrl) viewCtrl._cmp.changeDetectorRef.reattach();
      return;
    }

    this.cd.detach();
    if (this.loaded && viewCtrl) viewCtrl._cmp.changeDetectorRef.detach();
  }

  setBadge(value: number) {
    this.badge = value;
  }

  clearBadge() {
    this.badge = 0;
  }

  increaseBadge(increaseBy: number) {
    this.badge += increaseBy;
  }

  decreaseBadge(decreaseBy: number) {
    this.badge = Math.max(0, this.badge - decreaseBy);
  }

  setWidth(width: number) {
    this.setElementStyle('width', width + 'px');
  }
}
