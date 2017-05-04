import { EventEmitter } from '@angular/core';
import { Page } from 'ionic-angular/navigation/nav-util';
export interface NavButton {
    page?: Page | string;
    params?: any;
    notLog?: boolean;
    icon: string;
    label: string;
    iconColor?: string;
}
export declare class NavButtonBar {
    items: Array<NavButton>;
    navClick: EventEmitter<NavButton>;
    onClick(item: NavButton): void;
}
