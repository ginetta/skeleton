module.exports = function (grunt, options) {
    var   chalk         = require('chalk')
        , srcDir        = options.config.srcDir
        , targetDir     = options.config.targetDir
        , styleguideDir = options.config.componentListDir
        , changeCase    = require('change-case');
        ;



    function jadeRender(file, vars) {
        var tpl;
        try {
            grunt.log.writeln('rendering ' + file + " with vars: " + JSON.stringify(vars));
            tpl = require('jade').compile(grunt.file.read(file), {
                filename: file,
                compileDebug: true,
                pretty: true,
                basedir: srcDir
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

    // Looks for /modules/**/package.json files and groups 
    // their data in a namespaced object
    function getModulesData() {
        var modules = [],
            allMetadata = {};

        grunt.log.writeln(chalk.yellow('\tProcessing modules:'));
        grunt.file.glob.sync(srcDir + '/modules/**/package.json').forEach(function (path) {
            var tplFile, modInfo = grunt.file.readJSON(path);

            modInfo.tplFile = grunt.file.glob.sync(path.replace('package.json', '*.jade'))[0];


            modInfo.identifier = path.replace(srcDir + '/modules/', '').replace(/(\/[^\/]+|\.jade)$/, '');
            // override base html since it's broken in IE8/9
            modInfo.identifier = modInfo.identifier.replace(/\//g, '-');
            grunt.log.writeln(chalk.cyan('\t\t— ' + modInfo.identifier) + ' (' + styleguideDir + '/components/' + modInfo.identifier + '.html' + ' )');

            modules.push(modInfo);
            allMetadata[changeCase.camelCase(modInfo.identifier)] = modInfo;
        });
        return { modules: modules, allMetadata: allMetadata };
    }

    function buildModulesPage(modulesData) {
        grunt.log.writeln('\t' + chalk.yellow('Building modules page: '));
        grunt.log.writeln('\t\t - ' +  chalk.cyan('TO BE IMPLEMENTED'));

        modulesData.modules.forEach(function (module) {
            var html = jadeRender(module.tplFile, modulesData.allMetadata);

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

    function buildPages(allMetadata) {
        grunt.file.glob.sync(srcDir + '/pages/**/*.jade').forEach(function (path) {
            grunt.log.writeln('rendering  with vars: ' + JSON.stringify(allMetadata));
            var pageName = path.replace(srcDir + '/pages/', '').replace(/(\/[^\/]+|\.jade)$/, '')
                html     = jadeRender(path, allMetadata)
                ;


            grunt.log.writeln('creating page ' + targetDir + "/pages-html/" + pageName + ".html with " + html);
            grunt.file.write(
                targetDir + "/pages-html/" + pageName + ".html",
                html
            )
        });
    }



    grunt.registerTask('buildComponentList', function () {
        var modulesData = {};


        // 1. Read modules data and render their html
        modulesData = getModulesData();

        // 2. Build modules pages (both components)
        buildModulesPage(modulesData);

        buildPages(modulesData.allMetadata);

        GLOBAL.david = function (module) {
            return  modules[0].html;
        }
    });
};