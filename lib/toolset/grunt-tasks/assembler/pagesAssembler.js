module.exports = function(grunt, options) {
    var _ = require('lodash'),
        chalk = require('chalk'),
        path = require('path'),
        srcDir = options.config.srcDir,
        targetDir = options.config.targetDir,
        changeCase = require('change-case'),
        Helper = new(require('./helpers'))(grunt, options);

    grunt.registerTask('pagesAssembler', function(environment) {

        var componentsData = {},
            locales = {},
            pages = {},
            env = environment || false;

        // 1. Read components data and render their html
        componentsData = Helper.getcomponentsData();

        // 2. Get locales object
        locales = Helper.getLocales();
        pages = Helper.getPageFiles();

        function compute(from, to) {
            return (path.relative(path.dirname(from), to) || '.') + '/';
        }

        _.each(locales, function(data, localeName) {
            var dataOptions = _.merge({
                "data": data
            }, componentsData.allMetadata);

            grunt.log.writeln(chalk.green('\tAdding data to pages: ') + chalk.yellow(localeName));

            _.each(pages, function(page) {
                var translatedPageHtml,
                    pageName = _.last(page.split('/')).replace('.jade', ''),
                    pagePathFolders = page.split('/'),
                    pagePath = _.without(pagePathFolders, 'app', 'pages', _.last(pagePathFolders)).join('/'),
                    fileDest = targetDir + '/' + localeName + '/' + pagePath + '/' + pageName + '.html',
                    relativePath = compute(fileDest, targetDir + '/');

                dataOptions = _.merge(dataOptions, {
                    "relativePath": relativePath,
                    "environment": env
                });
                translatedPageHtml = Helper.jadeRender(page, dataOptions);

                grunt.log.writeln(
                    chalk.cyan(
                        '\t\t— Translating '
                    ) +
                    chalk.yellow(
                        (pagePath ? pagePath + '/' : '') + pageName
                    )
                );

                // Creates component page (for developement);
                grunt.file.write(fileDest, translatedPageHtml);
            });
        });
    });
};
