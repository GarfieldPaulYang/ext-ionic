"use strict";
var core_1 = require('@angular/core');
var util_1 = require('../../utils/util');
var Ribbon = (function () {
    function Ribbon(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    Ribbon.prototype.ngOnInit = function () {
        this.ribbonOption.backgroundColor = util_1.isPresent(this.ribbonOption.backgroundColor) ? this.ribbonOption.backgroundColor : 'white';
        this.ribbonOption.ribbonColor = util_1.isPresent(this.ribbonOption.ribbonColor) ? this.ribbonOption.ribbonColor : 'red';
        this.ribbonOption.heightAmend = util_1.isPresent(this.ribbonOption.heightAmend) ? this.ribbonOption.heightAmend : 0;
        this.renderer.setElementClass(this.elementRef.nativeElement, 'ribbon-bar', true);
        var height = this.elementRef.nativeElement.offsetHeight + this.ribbonOption.heightAmend;
        this.riangleStyleOne = { borderTop: height * 0.52 + 'px solid ' + this.ribbonOption.ribbonColor, borderLeft: height * 0.52 + 'px solid transparent' };
        this.triangleStyleTwo = { borderTop: height * 0.2 + 'px solid ' + this.ribbonOption.backgroundColor, borderLeft: height * 0.2 + 'px solid transparent' };
        this.textStyle = { width: height * 0.52 + 'px', height: height * 0.23 + 'px', top: height * 0.07 + 'px', right: '-' + height * 0.09 + 'px' };
        if (util_1.isPresent(this.ribbonOption.fontSize)) {
            this.textStyle['font-size'] = this.ribbonOption.fontSize;
        }
    };
    Ribbon.decorators = [
        { type: core_1.Component, args: [{
                    selector: '[ribbon]',
                    template: "\n    <div class=\"triangle\" [ngStyle]=\"riangleStyleOne\"></div>\n    <div class=\"triangle\" [ngStyle]=\"triangleStyleTwo\"></div>\n    <div class=\"ribbon-text-box\" [ngStyle]=\"textStyle\">\n      <div>{{ribbonOption.ribbonText}}</div>\n    </div>\n    <ng-content></ng-content>\n  "
                },] },
    ];
    Ribbon.ctorParameters = [
        { type: core_1.Renderer, },
        { type: core_1.ElementRef, },
    ];
    Ribbon.propDecorators = {
        'ribbonOption': [{ type: core_1.Input, args: ['ribbon-option',] },],
    };
    return Ribbon;
}());
exports.Ribbon = Ribbon;
//# sourceMappingURL=ribbon.js.map