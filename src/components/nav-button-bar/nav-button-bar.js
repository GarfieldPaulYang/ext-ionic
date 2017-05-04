import { Component, Input, Output, EventEmitter } from '@angular/core';
var NavButtonBar = (function () {
    function NavButtonBar() {
        this.itemClick = new EventEmitter();
    }
    NavButtonBar.prototype.onClick = function (item) {
        this.itemClick.emit(item);
    };
    return NavButtonBar;
}());
export { NavButtonBar };
NavButtonBar.decorators = [
    { type: Component, args: [{
                selector: 'nav-button-bar',
                styles: ["\n    .btn-group {\n      display: flex;\n      flex-flow: row wrap;\n      width: 100%;\n    }\n\n    .btn-group>.btn-box {\n      position: relative;\n      display: flex;\n      justify-content: center;\n      align-items: center;\n      width: 25vmin;\n      height: 25vmin;\n    }\n\n    .btn-box>.btn-box-content {\n      display: flex;\n      flex-direction: column;\n      justify-content: center;\n      align-items: center;\n      width: 20vmin;\n      height: 20vmin;\n    }\n\n    .btn-box-content>.btn-text {\n      width: 100%;\n      bottom: 1vmin;\n      text-align: center;\n      color: black;\n      font-size: 0.8em;\n    }\n  "],
                template: "\n    <div class=\"btn-group\">\n      <a class=\"btn-box\" *ngFor=\"let item of items\" (click)=\"onClick(item)\">\n        <div class=\"btn-box-content\">\n          <ion-icon name=\"{{item.icon}}\" style=\"font-size: 2.5em\" [style.color]=\"item.iconColor\"></ion-icon>\n          <div class=\"btn-text\">{{item.label}}</div>\n        </div>\n        <div class=\"button-effect\"></div>\n      </a>\n    </div>\n  "
            },] },
];
/** @nocollapse */
NavButtonBar.ctorParameters = function () { return []; };
NavButtonBar.propDecorators = {
    'items': [{ type: Input },],
    'itemClick': [{ type: Output },],
};
//# sourceMappingURL=nav-button-bar.js.map