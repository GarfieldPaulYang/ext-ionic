import { EventEmitter } from '@angular/core';
import { Page } from 'ionic-angular/navigation/nav-util';
export interface NavButton {
    label: string;
    page?: Page | string;
    params?: any;
    icon?: string;
    iconColor?: string;
    number?: number;
}
export declare class NavButtonBar {
    type: string;
    items: Array<NavButton>;
    itemClick: EventEmitter<NavButton>;
    onClick(item: NavButton): void;
}
