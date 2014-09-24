module.exports = function(grunt, options) {
    var srcDir = options.config.srcDir,
        targetDir = options.config.targetDir,
        Helper = new(require('./helpers'))(grunt, options),
        componentsFolder = srcDir + "/components/",
        fs = require('fs'),
        write = grunt.file.write,
        _ = require('lodash');

    var jsTemplate      = grunt.file.read("lib/toolset/grunt-tasks/assembler/component-templates/component-js.tpl");
    var jadeTemplate    = grunt.file.read("lib/toolset/grunt-tasks/assembler/component-templates/component-jade.tpl");
    var scssTemplate    = grunt.file.read("lib/toolset/grunt-tasks/assembler/component-templates/component-scss.tpl");
    var packageTemplate = grunt.file.read("lib/toolset/grunt-tasks/assembler/component-templates/component-package.tpl");


    grunt.registerTask('addComponent', function() {
        var componentName = grunt.option("name"),
            parentComponentName = grunt.option("parent");

        if (!componentName) {
            grunt.fail.fatal("component name is required\ne.g.: grunt addComponent --name=<component-name>");
        }


        var jsContent      = jsTemplate.split("{{componentName}}").join(componentName);
        var scssContent    = scssTemplate.split("{{componentName}}").join(componentName);
        var jadeContent    = jadeTemplate.split("{{componentName}}").join(componentName);
        var packageContent = packageTemplate.split("{{componentName}}").join(componentName);

        // It has parent component
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
                replaceLine(
                  componentsFolder + "components.scss",
                  "  ;",
                  "  , \"" + componentName + "/" + componentName + "\"\n  ;\n"
                )
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

            replaceLine(
              componentsFolder + "components.scss",
              "  ;",
              "  , \"" + componentName + "/" + componentName + "\"\n  ;"
            )
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
