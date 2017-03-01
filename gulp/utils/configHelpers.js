const glob = require('glob');

module.exports = {
  getAvailableLanguages: (config) => {
    const entryPath = config.entryPaths.content;
    return glob.sync('*', { cwd: entryPath });
  },

  // Put the default language at the root
  getLanguagePath: (language, languages) => {
    if (languages.lenght === 1) {
      return '';
    }
    return `${language}/`;
  }
};
