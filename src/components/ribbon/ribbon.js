import { Component, ElementRef, Input, ChangeDetectionStrategy, Renderer } from '@angular/core';
import { isPresent } from '../../utils/util';
var Ribbon = (function () {
    function Ribbon(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
    }
    Ribbon.prototype.ngOnInit = function () {
        if (!isPresent(this.ribbonOption.backgroundColor)) {
            this.ribbonOption.backgroundColor = 'white';
        }
        if (!isPresent(this.ribbonOption.ribbonColor)) {
            this.ribbonOption.ribbonColor = 'red';
        }
        if (!isPresent(this.ribbonOption.heightAmend)) {
            this.ribbonOption.heightAmend = 0;
        }
        this.renderer.setElementClass(this.elementRef.nativeElement, 'ribbon-bar', true);
        var height = this.elementRef.nativeElement.offsetHeight + this.ribbonOption.heightAmend;
        this.riangleStyleOne = { borderTop: height * 0.52 + 'px solid ' + this.ribbonOption.ribbonColor, borderLeft: height * 0.52 + 'px solid transparent' };
        this.triangleStyleTwo = { borderTop: height * 0.2 + 'px solid ' + this.ribbonOption.backgroundColor, borderLeft: height * 0.2 + 'px solid transparent' };
        this.textStyle = { width: height * 0.52 + 'px', height: height * 0.23 + 'px', top: height * 0.07 + 'px', right: '-' + height * 0.09 + 'px' };
        if (isPresent(this.ribbonOption.fontSize)) {
            this.textStyle['font-size'] = this.ribbonOption.fontSize;
        }
    };
    return Ribbon;
}());
export { Ribbon };
Ribbon.decorators = [
    { type: Component, args: [{
                selector: '[ribbon]',
                template: "\n    <div class=\"triangle\" [ngStyle]=\"riangleStyleOne\"></div>\n    <div class=\"triangle\" [ngStyle]=\"triangleStyleTwo\"></div>\n    <div class=\"ribbon-text-box\" [ngStyle]=\"textStyle\">\n      <div>{{ribbonOption.ribbonText}}</div>\n    </div>\n    <ng-content></ng-content>\n  ",
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
Ribbon.ctorParameters = function () { return [
    { type: Renderer, },
    { type: ElementRef, },
]; };
Ribbon.propDecorators = {
    'ribbonOption': [{ type: Input, args: ['ribbon-option',] },],
};
//# sourceMappingURL=ribbon.js.map