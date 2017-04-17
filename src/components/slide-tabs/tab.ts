import { Component, Input } from '@angular/core';

@Component({
  selector: 'ion-slide-tab',
  template: ''
})
export class SlideTab {
  @Input()
  tabRoot: any;

  @Input()
  navParams: any;

  @Input()
  title: string;

  @Input()
  icon: string;
}