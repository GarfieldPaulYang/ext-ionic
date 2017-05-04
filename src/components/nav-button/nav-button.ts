import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Page } from 'ionic-angular/navigation/nav-util';

export interface NavButton {
  page?: Page | string;
  params?: any;
  notLog?: boolean;
  icon: string;
  label: string;
  iconColor?: string;
}

@Component({
  selector: 'nav-button-bar',
  styles: [`
    .btn-group {
      display: flex;
      flex-flow: row wrap;
      width: 100%;
    }

    .btn-group>.btn-box {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25vmin;
      height: 25vmin;
    }

    .btn-box>.btn-box-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 20vmin;
      height: 20vmin;
    }

    .btn-box-content>.btn-text {
      width: 100%;
      bottom: 1vmin;
      text-align: center;
      color: black;
      font-size: 0.8em;
    }
  `],
  template: `
    <div class="btn-group">
      <a class="btn-box" *ngFor="let item of items" (buttonClick)="onClick(item)">
        <div class="btn-box-content">
          <ion-icon name="{{item.icon}}" style="font-size: 2.5em" [style.color]="item.iconColor"></ion-icon>
          <div class="btn-text">{{item.label}}</div>
        </div>
        <div class="button-effect"></div>
      </a>
    </div>
  `
})
export class NavButtonBar {
  @Input()
  items: Array<NavButton>;

  @Output()
  navClick: EventEmitter<NavButton> = new EventEmitter<NavButton>();

  onClick(item: NavButton) {
    this.navClick.emit(item);
  }
}