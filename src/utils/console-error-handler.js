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
import { ErrorHandler } from '@angular/core';
var ConsoleErrorHandler = (function (_super) {
    __extends(ConsoleErrorHandler, _super);
    function ConsoleErrorHandler() {
        return _super.call(this, false) || this;
    }
    ConsoleErrorHandler.prototype.handleError = function (err) {
        _super.prototype.handleError.call(this, err);
    };
    return ConsoleErrorHandler;
}(ErrorHandler));
export { ConsoleErrorHandler };
//# sourceMappingURL=console-error-handler.js.map