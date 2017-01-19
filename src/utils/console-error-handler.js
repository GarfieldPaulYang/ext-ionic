"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var ConsoleErrorHandler = (function (_super) {
    __extends(ConsoleErrorHandler, _super);
    function ConsoleErrorHandler() {
        _super.call(this, false);
    }
    ConsoleErrorHandler.prototype.handleError = function (err) {
        _super.prototype.handleError.call(this, err);
    };
    return ConsoleErrorHandler;
}(core_1.ErrorHandler));
exports.ConsoleErrorHandler = ConsoleErrorHandler;
//# sourceMappingURL=console-error-handler.js.map