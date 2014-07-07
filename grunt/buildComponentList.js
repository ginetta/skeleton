/**
 * The way this plugins works as follows:
 *
 *    - It first looks for components in the project (a component being a sub-folder
 *      of /frontend/modules containing a package.json file describing the component)
 *      and generates an object with the components information. In this object is also
 *      included a namespaced object with all the components metadata ( see getModulesData()
 *      for more details)
 *
 *    - It then generates two .html files (for the components itself and for the styleguide)
 *
 *    - It then generates the .html file for the pages (.jade files inside /frontend/pages).
 *      This works because of the namespaced object generated in the beginning.
 *
 */


module.exports = function (grunt, options) {
    var   chalk         = require('chalk')
        , srcDir        = options.config.srcDir
        , targetDir     = options.config.targetDir
        , styleguideDir = options.config.componentListDir
        , changeCase    = require('change-case');
        ;


    /**
     * Utility function that receives a filepath and an object and returns the compiled
     * Jade html in a string
     * @param  {String} filepath
     * @param  {Object} arguments
     * @return {String} file's html compiled with jade
     */
    function jadeRender(file, vars) {
        var tpl;
        try {
            tpl = require('jade').compile(grunt.file.read(file), {
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
    }

    /**
     * Searchs for components (folders that contain package.json files)
     * and returns an object containing the following properties:
     *
     *      modules {Array}: an array of {Object} describing a module that with the following:
     *                          > identifier  {String} - name of the module
     *                          > tplFilePath {String} - component template filepath
     *
     *      allMetadata {Object}: a namedspaced (the module identifier is used as key )
     *                            object with the components metadata.
     *
     * For instance, if we have the modules "foo", "bar" and "foo-dark" the
     * returning object would be something like:
     *
     *     {
     *          modules: [
     *              { identifier: 'foo',      tplFilePath: 'modules/foo'},
     *              { identifier: 'bar',      tplFilePath: 'modules/bar'},
     *              { identifier: 'foo-dark', tplFilePath: 'modules/foo-dark'}
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
     * @return {Object} { modules: [] , allMetadata: {} }
     *
     */
    function getModulesData() {
        var modules = [],
            allMetadata = {};

        grunt.log.writeln(chalk.red('\tLooking for modules and merging metadata:'));
        grunt.file.glob.sync(srcDir + '/modules/**/package.json').forEach(function (path) {
            var tplFile, modInfo = grunt.file.readJSON(path);

            modInfo.tplFilePath = grunt.file.glob.sync(path.replace('package.json', '*.jade'))[0];


            modInfo.identifier = path.replace(srcDir + '/modules/', '').replace(/(\/[^\/]+|\.jade)$/, '');
            // override base html since it's broken in IE8/9
            modInfo.identifier = modInfo.identifier.replace(/\//g, '-');
            grunt.log.writeln(chalk.cyan('\t\t— Found ') + chalk.yellow(modInfo.identifier));

            modules.push(modInfo);
            allMetadata[changeCase.camelCase(modInfo.identifier)] = modInfo;
        });
        return { modules: modules, allMetadata: allMetadata };
    }

    /**
     * Builds modules' html pages based on their templates and the generated namespaced metadata
     * @param  {Object} modulesData generated namespaced metadata (see getModulesData for more information)
     *
     */
    function buildModulesPage(modulesData) {
        grunt.log.writeln(chalk.red('\tBuilding modules page:'));

        modulesData.modules.forEach(function (module) {
            grunt.log.writeln(chalk.cyan('\t\t— Building ') + chalk.yellow(module.identifier + ".html"));
            var html = jadeRender(module.tplFilePath, modulesData.allMetadata);

            //  Creates styleguide page
            grunt.file.write(
                styleguideDir + '/components/' + module.identifier + '.html',
                html
            );

            // Creates component page (for developement);
            grunt.file.write(
                targetDir + '/components-html/' + module.identifier + '.html',
                html
            );
        })
    };

    /**
     * Builds pages' html pages based on their templates and the generated namespaced metadata
     * @param  {Object} modulesData generated namespaced metadata
     * (see getModulesData for more information about the metadata structure)
     *
     */
    function buildPages(allMetadata) {
        grunt.log.writeln(chalk.red('\tBuilding individual page:'));
        grunt.file.glob.sync(srcDir + '/pages/**/*.jade').forEach(function (path) {
            var pageName = path.replace(srcDir + '/pages/', '').replace(/(\/[^\/]+|\.jade)$/, '') + ".html"
                html     = jadeRender(path, allMetadata)
                ;
            grunt.log.writeln(chalk.cyan('\t\t— Building ') + chalk.yellow(pageName));

            grunt.file.write(
                targetDir + "/pages-html/" + pageName,
                html
            )
        });
    }



    grunt.registerTask('buildComponentList', function () {
        var modulesData = {};


        // 1. Read modules data and render their html
        modulesData = getModulesData();

        // 2. Build modules pages (both components and styleguide)
        buildModulesPage(modulesData);

        // 3. Build pages (components metadata will be available and pages can include components)
        buildPages(modulesData.allMetadata);
    });
};