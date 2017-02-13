"use strict";
function isTrueProperty(val) {
    if (typeof val === 'string') {
        val = val.toLowerCase().trim();
        return (val === 'true' || val === 'on' || val === '');
    }
    return !!val;
}
exports.isTrueProperty = isTrueProperty;
;
function isPresent(val) {
    return val !== undefined && val !== null;
}
exports.isPresent = isPresent;
var ASSERT_ENABLED = true;
function assert(actual, reason) {
    if (!actual && ASSERT_ENABLED === true) {
        var message = 'EXT-IONIC ASSERT: ' + reason;
        console.error(message);
        debugger;
        throw new Error(message);
    }
}
exports.assert = assert;
//# sourceMappingURL=util.js.map