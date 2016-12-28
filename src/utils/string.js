"use strict";
exports.StringUtils = {
    startsWith: function (str, searchStrings) {
        for (var i = 0; i < searchStrings.length; i++) {
            var searchString = searchStrings[i];
            if (str.startsWith(searchString)) {
                return true;
            }
        }
        return false;
    }
};
//# sourceMappingURL=string.js.map