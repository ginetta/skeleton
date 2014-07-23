module.exports = function(grunt, options) {
    var srcDir = options.config.srcDir,
        targetDir = options.config.targetDir,
        Helper = new(require('./helpers'))(grunt, options),
        componentsFolder = srcDir + "/components/",
        fs = require('fs'),
        write = grunt.file.write,
        _ = require('lodash');

    grunt.registerTask('addComponent', function() {
        var componentName = grunt.option("name"),
            parentComponentName = grunt.option("parent");

        if (!componentName) {
            grunt.fail.fatal("component name is required\ne.g.: grunt addComponent --name=<component-name>");
        }

        var jsContent = "define(function(){\n  'use strict';\n  console.log('BIP BOOP! [" + componentName + " is running]');\n});";
        var scssContent = "." + componentName + " {\n\n}";
        var jadeContent = "mixin " + componentName + " ()\n  ." + componentName + "\n    h1 hello component";
        var packageContent = '{\n  "name": "mycomponent",\n  "version":"0.0.1",\n  "description":"Example component",\n  "author":"Ginetta",\n  "data": {\n    "title":"Component title",\n    "age":12\n  }\n}'.replace('mycomponent', componentName);

        if (parentComponentName) {
            write(componentsFolder + parentComponentName + "/" + componentName + '/' + componentName + ".js", jsContent);
            write(componentsFolder + parentComponentName + "/" + componentName + '/' + componentName + ".scss", scssContent);
            write(componentsFolder + parentComponentName + "/" + componentName + '/' + componentName + ".jade", jadeContent);
            write(componentsFolder + parentComponentName + "/" + componentName + '/' + "package.json", packageContent);

            // if parentComponents is already a prentComponent
            //  i.e.: it has the components.jade and components.scss file
            var parentComponentsScss = componentsFolder + parentComponentName + "/" + "components.scss";
            var parentComponentsJade = componentsFolder + parentComponentName + "/" + "components.jade";
            if (grunt.file.exists(parentComponentsScss) && grunt.file.exists(parentComponentsJade)) {
                replaceLastLine(parentComponentsScss, "  , \"" + componentName + "/" + componentName + "\"\n  ;");
                appendLine(parentComponentsJade, "include /components/" + parentComponentName + "/" + componentName + "/" + componentName);
            } else {

                // create parent/components.scss
                var componentsScssContents = "@import\n    \"" + parentComponentName + "\"\n  , \"" + componentName + "/" + componentName + "\"\n  ;"
                write(componentsFolder + parentComponentName + "/" + "components.scss", componentsScssContents);

                // create parent/components.jade
                var componentsJadeContents = "include /components/" + parentComponentName + "/" + parentComponentName + "\ninclude /components/" + parentComponentName + "/" + componentName + "/" + componentName;
                write(componentsFolder + parentComponentName + "/" + "components.jade", componentsJadeContents);

                // change main components.scss to import new file instead
                replaceLine(
                    componentsFolder + "components.scss",
                    "  , \"" + parentComponentName + "/" + parentComponentName + "\"",
                    "  , \"" + parentComponentName + "/components\""
                );
                // change main components.jade to import new file instead
                replaceLine(componentsFolder + "components.jade", "include /components/" + parentComponentName + "/" + parentComponentName, "include /components/" + parentComponentName + "/components");
            }

        } else {

            write(componentsFolder + componentName + '/' + componentName + ".js", jsContent);
            write(componentsFolder + componentName + '/' + componentName + ".scss", scssContent);
            write(componentsFolder + componentName + '/' + componentName + ".jade", jadeContent);
            write(componentsFolder + componentName + '/' + "package.json", packageContent);

            replaceLastLine(componentsFolder + "components.scss", "  , \"" + componentName + "/" + componentName + "\"\n  ;");
            appendLine(componentsFolder + "components.jade", "include /components/" + componentName + "/" + componentName);
        }

    });



    function replaceLastLine(filePath, newLine) {
        var data = grunt.file.read(filePath);
        var fileLinesContent = data.toString().split('\n');
        fileLinesContent[fileLinesContent.length - 1] = newLine;
        write(filePath, fileLinesContent.join('\n'));
    }

    function appendLine(filePath, newLine) {
        var data = grunt.file.read(filePath);
        write(filePath, data + "\n" + newLine);
    }

    function replaceLine(filePath, oldLine, newLine) {
        var contents = grunt.file.read(filePath).split('\n');
        var lineToReplace;
        _.each(contents, function(line, index) {
            if (line === oldLine) {
                lineToReplace = index;
            }
        });
        contents[lineToReplace] = newLine;
        write(filePath, contents.join('\n'));
    }
};