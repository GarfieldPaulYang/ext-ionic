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
var core_1 = require('@angular/core');
var util_1 = require('../../utils/util');
var Ribbon = (function () {
    function Ribbon(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    Ribbon.prototype.ngOnInit = function () {
        if (!util_1.isPresent(this.ribbonOption.backgroundColor)) {
            this.ribbonOption.backgroundColor = 'white';
        }
        if (!util_1.isPresent(this.ribbonOption.ribbonColor)) {
            this.ribbonOption.ribbonColor = 'red';
        }
        if (!util_1.isPresent(this.ribbonOption.heightAmend)) {
            this.ribbonOption.heightAmend = 0;
        }
        this.renderer.setElementClass(this.elementRef.nativeElement, 'ribbon-bar', true);
        var height = this.elementRef.nativeElement.offsetHeight + this.ribbonOption.heightAmend;
        this.riangleStyleOne = { borderTop: height * 0.52 + 'px solid ' + this.ribbonOption.ribbonColor, borderLeft: height * 0.52 + 'px solid transparent' };
        this.triangleStyleTwo = { borderTop: height * 0.2 + 'px solid ' + this.ribbonOption.backgroundColor, borderLeft: height * 0.2 + 'px solid transparent' };
        this.textStyle = { width: height * 0.52 + 'px', height: height * 0.23 + 'px', top: height * 0.07 + 'px', right: '-' + height * 0.09 + 'px' };
        if (util_1.isPresent(this.ribbonOption.fontSize)) {
            this.textStyle['font-size'] = this.ribbonOption.fontSize;
        }
    };
    __decorate([
        core_1.Input('ribbon-option'), 
        __metadata('design:type', Object)
    ], Ribbon.prototype, "ribbonOption", void 0);
    Ribbon = __decorate([
        core_1.Component({
            selector: '[ribbon]',
            template: "\n    <div class=\"triangle\" [ngStyle]=\"riangleStyleOne\"></div>\n    <div class=\"triangle\" [ngStyle]=\"triangleStyleTwo\"></div>\n    <div class=\"ribbon-text-box\" [ngStyle]=\"textStyle\">\n      <div>{{ribbonOption.ribbonText}}</div>\n    </div>\n    <ng-content></ng-content>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.Renderer, core_1.ElementRef])
    ], Ribbon);
    return Ribbon;
}());
exports.Ribbon = Ribbon;
//# sourceMappingURL=ribbon.js.map