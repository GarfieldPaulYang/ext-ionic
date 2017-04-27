var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, Input, Renderer, ElementRef, ViewEncapsulation, Optional, ComponentFactoryResolver, NgZone, ViewContainerRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavControllerBase, App, Config, Platform, Keyboard, GestureController, DeepLinker, DomController } from 'ionic-angular';
import { TransitionController } from 'ionic-angular/transitions/transition-controller';
import { SuperTabs } from '../super-tabs/super-tabs';
import { ErrorHandler } from '@angular/core';
var SuperTab = (function (_super) {
    __extends(SuperTab, _super);
    function SuperTab(parent, app, config, plt, keyboard, el, zone, rnd, cfr, gestureCtrl, transCtrl, linker, _dom, errHandler, cd) {
        var _this = _super.call(this, parent, app, config, plt, keyboard, el, zone, rnd, cfr, gestureCtrl, transCtrl, linker, _dom, errHandler) || this;
        _this.linker = linker;
        _this._dom = _dom;
        _this.errHandler = errHandler;
        _this.cd = cd;
        _this.badge = 0;
        _this.loaded = false;
        return _this;
    }
    Object.defineProperty(SuperTab.prototype, "tabTitle", {
        get: function () {
            return this.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuperTab.prototype, "index", {
        get: function () {
            return this.parent.getTabIndexById(this.tabId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuperTab.prototype, "_tabId", {
        get: function () {
            return this.tabId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuperTab.prototype, "swipeBackEnabled", {
        get: function () {
            return this._sbEnabled;
        },
        set: function (val) {
            this._sbEnabled = !!val;
            this._swipeBackCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuperTab.prototype, "_vp", {
        /**
         * @hidden
         */
        set: function (val) {
            this.setViewport(val);
        },
        enumerable: true,
        configurable: true
    });
    SuperTab.prototype.ngOnInit = function () {
        this.parent.addTab(this);
    };
    SuperTab.prototype.load = function () {
        var _this = this;
        if (this.loaded) {
            this._dom.read(function () {
                _this.resize();
            });
            return Promise.resolve();
        }
        return this.push(this.root, this.rootParams, { animate: false }).then(function () {
            _this.loaded = true;
            _this._dom.read(function () {
                _this.resize();
            });
        });
    };
    SuperTab.prototype.ngOnDestroy = function () {
        this.destroy();
    };
    SuperTab.prototype.setActive = function (active) {
        var viewCtrl = this.getActive();
        if (active) {
            this.cd.reattach();
            if (this.loaded && viewCtrl)
                viewCtrl._cmp.changeDetectorRef.reattach();
            return;
        }
        this.cd.detach();
        if (this.loaded && viewCtrl)
            viewCtrl._cmp.changeDetectorRef.detach();
    };
    SuperTab.prototype.setBadge = function (value) {
        this.badge = value;
    };
    SuperTab.prototype.clearBadge = function () {
        this.badge = 0;
    };
    SuperTab.prototype.increaseBadge = function (increaseBy) {
        this.badge += increaseBy;
    };
    SuperTab.prototype.decreaseBadge = function (decreaseBy) {
        this.badge = Math.max(0, this.badge - decreaseBy);
    };
    SuperTab.prototype.setWidth = function (width) {
        this.setElementStyle('width', width + 'px');
    };
    return SuperTab;
}(NavControllerBase));
export { SuperTab };
SuperTab.decorators = [
    { type: Component, args: [{
                selector: 'ion-super-tab',
                template: '<div #viewport></div><div class="nav-decor"></div>',
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
SuperTab.ctorParameters = function () { return [
    { type: SuperTabs, },
    { type: App, },
    { type: Config, },
    { type: Platform, },
    { type: Keyboard, },
    { type: ElementRef, },
    { type: NgZone, },
    { type: Renderer, },
    { type: ComponentFactoryResolver, },
    { type: GestureController, },
    { type: TransitionController, },
    { type: DeepLinker, decorators: [{ type: Optional },] },
    { type: DomController, },
    { type: ErrorHandler, },
    { type: ChangeDetectorRef, },
]; };
SuperTab.propDecorators = {
    'title': [{ type: Input },],
    'icon': [{ type: Input },],
    'root': [{ type: Input },],
    'rootParams': [{ type: Input },],
    'tabId': [{ type: Input, args: ['id',] },],
    'badge': [{ type: Input },],
    'swipeBackEnabled': [{ type: Input },],
    '_vp': [{ type: ViewChild, args: ['viewport', { read: ViewContainerRef },] },],
};
//# sourceMappingURL=super-tab.js.map