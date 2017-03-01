"use strict";
var core_1 = require('@angular/core');
var ProgressBarCmp = (function () {
    function ProgressBarCmp() {
        this.innerColor = '#387ef5';
    }
    ProgressBarCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ion-progress-bar',
                    template: "\n    <div class=\"ion-progress-outer\">\n      <div class=\"ion-progress-inner\" [style.width]=\"progress + '%'\" [style.background-color]=\"innerColor\">\n        {{progress}}%\n      </div>\n    </div>\n  ",
                    styles: ["\n    .ion-progress-outer {\n      width: 96%;\n      margin: 10px 2%;\n      padding: 3px;\n      text-align: center;\n      background-color: #f4f4f4;\n      border: 1px solid #dcdcdc;\n      color: #fff;\n      border-radius: 20px;\n    }\n    .ion-progress-inner {\n      min-width: 15%;\n      white-space: nowrap;\n      overflow: hidden;\n      padding: 5px;\n      border-radius: 20px;\n    }\n  "]
                },] },
    ];
    ProgressBarCmp.ctorParameters = [];
    ProgressBarCmp.propDecorators = {
        'progress': [{ type: core_1.Input },],
        'innerColor': [{ type: core_1.Input },],
    };
    return ProgressBarCmp;
}());
exports.ProgressBarCmp = ProgressBarCmp;
//# sourceMappingURL=progress-bar.js.map