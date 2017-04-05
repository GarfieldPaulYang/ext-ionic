import {
  AfterViewInit, Component, ContentChildren, ElementRef, Input, OnDestroy, QueryList, Renderer,
  ViewChild
} from '@angular/core';
import { TabCmp } from './tab';
import { NavController, Slides, Toolbar } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'ion-slide-tabs',
  template: `
    <ion-toolbar [color]="toolbarColor" #toolbar mode="md">
      <ion-segment [color]="tabsColor" [(ngModel)]="selectedTabIndex" mode="md">
        <ion-segment-button *ngFor="let tab of tabs; let i = index" [value]="i" (ionSelect)="onTabSelect(i)">
          <ion-icon *ngIf="tab.icon" [name]="tab.icon"></ion-icon>
          {{tab.title}}
        </ion-segment-button>
      </ion-segment>
      <div class="slide" #slide [style.left]="slidePosition" [class.ease]="shouldSlideEase" [style.width]="slideWidth"></div>
    </ion-toolbar>
    <ion-slides [style.height]="slidesHeight + 'px'" (ionSlideDrag)="onDrag($event)" (ionSlideWillChange)="onSlideWillChange()" (ionSlideDidChange)="onSlideDidChange()" [initialSlide]="selectedTabIndex">
      <ion-slide *ngFor="let tab of tabs">
          <ion-nav [root]="tab.tabRoot" [rootParams]="tab.navParams"></ion-nav>
      </ion-slide>
    </ion-slides>
  `
})
export class TabsCmp implements OnDestroy, AfterViewInit {
  @Input()
  rootNavCtrl: NavController;

  @Input()
  toolbarColor: string;

  @Input()
  tabsColor: string;

  @Input()
  sliderColor: string = 'primary';

  @Input()
  set height(val: string) {
    this.render.setElementStyle(this.el.nativeElement, 'height', val);
  }

  @Input()
  set selectedTabIndex(val: number) {
    this._selectedTabIndex = val;
    this.alignSlidePosition();
  }

  get selectedTabIndex(): number {
    return this._selectedTabIndex;
  }

  @ContentChildren(TabCmp) slideTabs: QueryList<TabCmp>;

  tabs: TabCmp[] = [];

  @ViewChild(Slides) slides: Slides;

  @ViewChild('toolbar') toolbar: Toolbar;

  @ViewChild('slide') slider: ElementRef;

  slidesHeight: number = 0;
  maxSlidePosition: number;
  slidePosition = '0';
  slideWidth = '0';
  shouldSlideEase: boolean = false;

  private _selectedTabIndex = 0;

  private validSliderLocations: number[] = [];

  private screenOrientationWatch: any;

  constructor(private el: ElementRef, private render: Renderer) {
    this.screenOrientationWatch = Observable.fromEvent(window, 'orientationchange').subscribe(() => this.setHeights());
  }

  ngAfterViewInit() {
    this.slideTabs.forEach(tab => {
      tab.navParams = tab.navParams || {};
      tab.navParams.rootNavCtrl = this.rootNavCtrl;
      this.tabs.push(tab);
    });

    this.slideWidth = this.el.nativeElement.offsetWidth / this.tabs.length + 'px';
    this.maxSlidePosition = this.el.nativeElement.offsetWidth - (this.el.nativeElement.offsetWidth / this.tabs.length);
    this.slides.speed = 250;
    this.render.setElementClass(this.slider.nativeElement, 'button-md-' + this.sliderColor, true);

    setTimeout(this.setHeights.bind(this), 100);

    const segmentButtonWidth = this.slides.renderedWidth / this.tabs.length;
    this.validSliderLocations = [];
    for (let i = 0; i < this.tabs.length; i++) {
      this.validSliderLocations.push(i * segmentButtonWidth);
    }

    this.slides.ionSlideTouchEnd.subscribe(() => this.ensureSliderLocationIsValid());
  }

  ngOnDestroy() {
    if (this.screenOrientationWatch && this.screenOrientationWatch.unsubscribe) {
      this.screenOrientationWatch.unsubscribe();
    }
  }

  onDrag(ev: Slides) {
    if (ev._translate > 0 || ev._translate < -((this.tabs.length - 1) * this.slides.renderedWidth)) {
      return;
    }
    const percentage = Math.abs(ev._translate / ev._virtualSize);
    const singleSlideSize = ev._renderedSize;

    let slidePosition = percentage * singleSlideSize;

    if (slidePosition > this.maxSlidePosition) {
      slidePosition = this.maxSlidePosition;
    }

    this.slidePosition = slidePosition + 'px';
  }

  onSlideWillChange() {
    if (this.slides.getActiveIndex() <= this.tabs.length) {
      this.shouldSlideEase = true;
      this.selectedTabIndex = this.slides.getActiveIndex();
    }
  }

  onSlideDidChange() {
    this.shouldSlideEase = false;
  }

  onTabSelect(index: number) {
    if (index <= this.tabs.length) {
      this.slides.slideTo(index);
    }
  }

  private ensureSliderLocationIsValid() {
    if (this.validSliderLocations.indexOf(Number(this.slidePosition)) === -1) {
      this.shouldSlideEase = true;
      this.alignSlidePosition();
      setTimeout(() => this.shouldSlideEase = false, 250);
    }
  }

  private alignSlidePosition() {
    let slidePosition = this.selectedTabIndex * this.slides.renderedWidth / this.tabs.length;
    this.slidePosition = slidePosition <= this.maxSlidePosition ? slidePosition + 'px' : this.maxSlidePosition + 'px';
  }

  private setHeights() {
    this.slidesHeight = this.el.nativeElement.offsetHeight - this.toolbar.getNativeElement().offsetHeight;
  }
}