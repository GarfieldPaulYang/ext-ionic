"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const ionic_angular_1 = require("ionic-angular");
const transition_controller_1 = require("ionic-angular/transitions/transition-controller");
const super_tabs_1 = require("../super-tabs/super-tabs");
let SuperTab = class SuperTab extends ionic_angular_1.NavControllerBase {
    constructor(parent, app, config, plt, keyboard, el, zone, rnd, cfr, gestureCtrl, transCtrl, linker, _dom, cd) {
        super(parent, app, config, plt, keyboard, el, zone, rnd, cfr, gestureCtrl, transCtrl, linker, _dom);
        this.linker = linker;
        this._dom = _dom;
        this.cd = cd;
        this.badge = 0;
        this.loaded = false;
    }
    get tabTitle() {
        return this.title;
    }
    get index() {
        return this.parent.getTabIndexById(this.tabId);
    }
    get _tabId() {
        return this.tabId;
    }
    get swipeBackEnabled() {
        return this._sbEnabled;
    }
    set swipeBackEnabled(val) {
        this._sbEnabled = !!val;
        this._swipeBackCheck();
    }
    /**
     * @hidden
     */
    set _vp(val) {
        this.setViewport(val);
    }
    ngOnInit() {
        this.parent.addTab(this);
    }
    load() {
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
    setActive(active) {
        let viewCtrl = this.getActive();
        if (active) {
            this.cd.reattach();
            if (this.loaded)
                viewCtrl._cmp.changeDetectorRef.reattach();
            return;
        }
        this.cd.detach();
        if (this.loaded)
            viewCtrl._cmp.changeDetectorRef.detach();
    }
    setBadge(value) {
        this.badge = value;
    }
    clearBadge() {
        this.badge = 0;
    }
    increaseBadge(increaseBy) {
        this.badge += increaseBy;
    }
    decreaseBadge(decreaseBy) {
        this.badge = Math.max(0, this.badge - decreaseBy);
    }
    setWidth(width) {
        this.setElementStyle('width', width + 'px');
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SuperTab.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SuperTab.prototype, "icon", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SuperTab.prototype, "root", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SuperTab.prototype, "rootParams", void 0);
__decorate([
    core_1.Input('id'),
    __metadata("design:type", String)
], SuperTab.prototype, "tabId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SuperTab.prototype, "badge", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], SuperTab.prototype, "swipeBackEnabled", null);
__decorate([
    core_1.ViewChild('viewport', { read: core_1.ViewContainerRef }),
    __metadata("design:type", core_1.ViewContainerRef),
    __metadata("design:paramtypes", [core_1.ViewContainerRef])
], SuperTab.prototype, "_vp", null);
SuperTab = __decorate([
    core_1.Component({
        selector: 'ion-super-tab',
        template: '<div #viewport></div><div class="nav-decor"></div>',
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __param(11, core_1.Optional()),
    __metadata("design:paramtypes", [super_tabs_1.SuperTabs,
        ionic_angular_1.App,
        ionic_angular_1.Config,
        ionic_angular_1.Platform,
        ionic_angular_1.Keyboard,
        core_1.ElementRef,
        core_1.NgZone,
        core_1.Renderer,
        core_1.ComponentFactoryResolver,
        ionic_angular_1.GestureController,
        transition_controller_1.TransitionController,
        ionic_angular_1.DeepLinker,
        ionic_angular_1.DomController,
        core_1.ChangeDetectorRef])
], SuperTab);
exports.SuperTab = SuperTab;
//# sourceMappingURL=super-tab.js.map