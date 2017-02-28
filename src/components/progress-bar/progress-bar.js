"use strict";
var core_1 = require('@angular/core');
var ProgressBarCmp = (function () {
    function ProgressBarCmp() {
    }
    ProgressBarCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'progress-bar',
                    template: "\n    <div class=\"progress-outer\">\n      <div class=\"progress-inner\" [style.width]=\"progress + '%'\">\n        {{progress}}%\n      </div>\n    </div>\n  "
                },] },
    ];
    ProgressBarCmp.ctorParameters = [];
    ProgressBarCmp.propDecorators = {
        'progress': [{ type: core_1.Input, args: ['progress',] },],
    };
    return ProgressBarCmp;
}());
exports.ProgressBarCmp = ProgressBarCmp;
//# sourceMappingURL=progress-bar.js.map