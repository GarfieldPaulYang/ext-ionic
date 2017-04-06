"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = {
    startsWith: (str, searchStrings) => {
        for (let i = 0; i < searchStrings.length; i++) {
            let searchString = searchStrings[i];
            if (str.startsWith(searchString)) {
                return true;
            }
        }
        return false;
    },
    hash: (str) => {
        let hash = 0;
        if (str.length === 0)
            return hash;
        for (let i = 0; i < str.length; i++) {
            let char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash;
    }
};
//# sourceMappingURL=string.js.map