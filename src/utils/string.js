"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = {
    startsWith: function (str, searchStrings) {
        for (var i = 0; i < searchStrings.length; i++) {
            var searchString = searchStrings[i];
            if (str.startsWith(searchString)) {
                return true;
            }
        }
        return false;
    },
    hash: function (str) {
        var hash = 0;
        if (str.length === 0)
            return hash;
        for (var i = 0; i < str.length; i++) {
            var char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }
};
//# sourceMappingURL=string.js.map