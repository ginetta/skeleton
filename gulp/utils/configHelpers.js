const glob = require('glob');

module.exports = {
  getAvailableLanguages: (config) => {
    const entry = config.entryGlobs.content;
    const entryPath = config.entryPaths.content;
    return entry.map(e => glob.sync(e))
      .reduce((a, b) => a.concat(b), [])
      .map((path) => {
        const withoutBase = path.replace(entryPath, '');
        return withoutBase.slice(0, withoutBase.indexOf('/'));
      });
  },

  // Put the default language at the root
  getLanguagePath: (language, languages) => {
    if (language === languages[0]) {
      return '';
    }
    return `${language}/`;
  }
};
