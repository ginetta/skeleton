module.exports = function (grunt, options) {
    var   chalk = require('chalk')
        , srcDir = options.config.srcDir
        , targetDir = options.config.componentListDir
        ;



    function jadeRender(file, vars) {
        var tpl;
        try {
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

    function processModules() {
        var modules = [];

        grunt.log.writeln(chalk.yellow('\tProcessing modules:'));
        grunt.file.glob.sync(srcDir + '/modules/**/package.json').forEach(function (path) {
            var tplFile, modInfo = grunt.file.readJSON(path);


            tplFile = grunt.file.glob.sync(path.replace('package.json', '*.jade'))[0];

            modInfo.identifier = path.replace(srcDir + '/modules/', '').replace(/(\/[^\/]+|\.jade)$/, '');
            // override base html since it's broken in IE8/9
            modInfo.identifier = modInfo.identifier.replace(/\//g, '-');
            grunt.log.writeln(chalk.cyan('\t\t— ' + modInfo.identifier));

            modInfo.html = jadeRender(tplFile, modInfo);
            modules.push(modInfo);

            grunt.file.write(
                targetDir + '/components/' + modInfo.identifier + '.html',
                modInfo.html
            );
        });
        return modules;
    }

    function buildModulesPage(modulesData) {
        grunt.log.writeln('\t' + chalk.yellow('Building modules page: '));
        grunt.log.writeln('\t\t - ' +  chalk.cyan('TO BE IMPLEMENTED'))
    };


    grunt.registerTask('buildComponentList', function () {
        var modules = [];


        // 1. Read modules data and render their html
        modules = processModules();

        // 2. Build modules page
        buildModulesPage();




        // grunt.file.write(
        //     targetDir + '/html/components.html',
        //     jadeRender(srcDir + '/components/list.jade', {mods: mods, pages: pages})
        // );
    });
};