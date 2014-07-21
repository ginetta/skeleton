var _          = require('lodash'),
    chalk      = require('chalk'),
    changeCase = require('change-case'),
    Helper;

Helper = (function() {
  var grunt, options, srcDir, targetDir, localesDir;

  function Helper(gruntArg, optionsArg) {
    grunt = gruntArg;
    options = optionsArg;

    srcDir     = options.config.srcDir;
    targetDir  = options.config.targetDir;
    localesDir = options.config.localesDir;
  }

  Helper.prototype.title = function() {
    return 'world';
  };

  /**
   * Utility function that receives a filepath and an object and returns the compiled
   * Jade html in a string
   * @param  {String} filepath
   * @param  {Object} arguments
   * @return {String} file's html compiled with jade
   */
  Helper.prototype.jadeRender = function (file, vars, extraTpl) {
    var tpl;

    try {
        tpl = require('jade').compile(grunt.file.read(file) + extraTpl, {
            filename    : file,
            pretty      : true,
            basedir     : srcDir,
            compileDebug: true
        });
    } catch (e) {
        grunt.fail.fatal('Build error in ' + file + "\n" + e);
    }

    try {
        return tpl(vars || {});
    } catch (e) {
        grunt.fail.fatal('Render error in ' + file + "\n" + e);
    }
  };

  /**
   * Searchs for components (folders that contain package.json files)
   * and returns an object containing the following properties:
   *
   *      components {Array}: an array of {Object} describing a component that with the following:
   *                          > identifier  {String} - name of the component
   *                          > tplFilePath {String} - component template filepath
   *
   *      allMetadata {Object}: a namedspaced (the component identifier is used as key )
   *                            object with the components metadata.
   *
   * For instance, if we have the components "foo", "bar" and "foo-dark" the
   * returning object would be something like:
   *
   *     {
   *          components: [
   *              { identifier: 'foo',      tplFilePath: 'components/foo'},
   *              { identifier: 'bar',      tplFilePath: 'components/bar'},
   *              { identifier: 'foo-dark', tplFilePath: 'components/foo-dark'}
   *          ],
   *          allMetadata: {
   *              foo: {
   *                  ...
   *                  data: { someArg: 1 }
   *                  ...
   *              },
   *              bar: {
   *                  ...
   *                  data: { someotherData: 2 }
   *                  ...
   *              },
   *              fooDark: { ... } --> note the "camelCase-lization"
   *          }
   *     }
   *
   * @return {Object} { components: [] , allMetadata: {} }
   *
   */
  Helper.prototype.getcomponentsData = function () {
    var components     = [],
        allMetadata = {};

    grunt.log.writeln(chalk.green('\tLooking for components and merging metadata:'));
    grunt.file.glob.sync(srcDir + '/components/**/package.json').forEach(function (path) {
        var tplFile, modInfo = grunt.file.readJSON(path);

        modInfo.tplFilePath = grunt.file.glob.sync(path.replace('package.json', '*.jade'))[0];


        modInfo.identifier = path.replace(srcDir + '/components/', '').replace(/(\/[^\/]+|\.jade)$/, '');
        // override base html since it's broken in IE8/9
        modInfo.identifier = modInfo.identifier.replace(/\//g, '-');
        grunt.log.writeln(chalk.cyan('\t\t— Found ') + chalk.yellow(modInfo.identifier));

        components.push(modInfo);
        allMetadata[changeCase.camelCase(modInfo.identifier)] = modInfo;
    });
    return { components: components, allMetadata: allMetadata };

  };

  Helper.prototype.getPageFiles = function () {
    return grunt.file.glob.sync(srcDir + '/pages/**/*.jade');
  };

  Helper.prototype.getLocales = function () {
    var locales = {};
    grunt.file.glob.sync(srcDir + '/' + localesDir + '/*.json').forEach(function (localePath) {
      var localeName = _.last(localePath.split('/')).replace('.json', '');
      locales[localeName] = grunt.file.readJSON(localePath);
    });
    return locales;
  };

  return Helper;

})();

module.exports = Helper;