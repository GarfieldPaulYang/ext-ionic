export const StringUtils = {
  startsWith: (str: string, searchStrings: Array<string>) => {
    for (var i = 0; i < searchStrings.length; i++) {
      var searchString = searchStrings[i];
      if (str.startsWith(searchString)) {
        return true;
      }
    }
    return false;
  }
};