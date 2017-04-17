export declare class SlideTabsController {
    setBadge(tabId: string, value: number): void;
    clearBadge(tabId: string): void;
    increaseBadge(tabId: string, increaseBy?: number): void;
    decreaseBadge(tabId: string, decreaseBy?: number): void;
    enableSwipe(tabsId: string, enable: boolean): void;
    enableSwipePerTab(tabsId: string, tabId: string, enable: boolean): void;
    /**
     * Enable or disable a tab. This will add/remove the tab from DOM.
     * @param tabsId
     * @param tabId
     * @param enable
     */
    enableTab(tabsId: string, tabId: string, enable: boolean): void;
}
