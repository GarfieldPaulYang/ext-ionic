"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
class ConsoleErrorHandler extends core_1.ErrorHandler {
    constructor() {
        super(false);
    }
    handleError(err) {
        super.handleError(err);
    }
}
exports.ConsoleErrorHandler = ConsoleErrorHandler;
//# sourceMappingURL=console-error-handler.js.map