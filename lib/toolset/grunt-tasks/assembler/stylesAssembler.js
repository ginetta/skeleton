var HelperCons    = require("./helpers");
var _             = require("lodash");
var theo          = require('theo');


var colorsOriginal, typographyOriginal;

module.exports = function (grunt, options) {
  var Helper             = new HelperCons(grunt, options),
      // TEMPLATES
      templatesPath = "lib/toolset/grunt-tasks/assembler/styleguide-templates/s-pages/styles/",
      colorsTemplate     = templatesPath + "colors.jade",
      typographyTemplate = templatesPath + "typography.jade",
      iconsTemplate      = templatesPath + "icons.jade",


      colorsSourceFile   = "app/css/styles/colors/colors.json",
      colorsDestFile     = options.config.srcDir + '/css/styles/colors',

      typographySourceFile = "app/css/styles/typography/typography.json",
      typographyDestFile = options.config.srcDir + '/css/styles/typography',

      theoColorsAdapterPath = '.tmp/_colors-theo.json',
      theoTypographyAdapterPath = '.tmp/_typography-theo.json',
      customTheoTemplates = 'lib/toolset/grunt-tasks/assembler/theo-templates'
      ;

  grunt.registerTask("stylesAssembler", function () {

    // 1. Read components data
    componentsData = Helper.getcomponentsData();

    function generateTheoAdapter (originalFile, adapterFilePath) {
      var original = JSON.parse(grunt.file.read(originalFile));
      var adapter = { theme: { properties: original } };
      grunt.file.write(adapterFilePath, JSON.stringify(adapter, undefined, 2));
    }

    function generateColorAdapter () {
      colorsOriginal = JSON.parse(grunt.file.read(colorsSourceFile));
      var adapted  = []
      _.each(colorsOriginal, function (colors, palette) {
        var processedPalette = _.each(colors, function (color, name) {
          adapted.push({ palette: palette, name: name, value: color, category: "color", comment: "" });
        });

      });

      grunt.file.write(theoColorsAdapterPath, JSON.stringify(adapted, undefined, 2));
      generateTheoAdapter(theoColorsAdapterPath, theoColorsAdapterPath);
    }

    function generateColorsSass () {
      theo.convert(theoColorsAdapterPath, colorsDestFile, {
        templates: ['scss'],
        templatesDirectory: customTheoTemplates
      });
    }

    function generateColorsStyleguidePage () {
      // We are using Theo for now for the iframe
      theo.convert(
        theoColorsAdapterPath,
        'dist/styleguide/styles/theo',
        { templates: ['html'], templatesDirectory: customTheoTemplates }
      );

      // Styleguide page
      var colorsHtml = Helper.jadeRender(
        colorsTemplate,
        {
          "components": componentsData.allMetadata,
          "palettes": colorsOriginal,
          "relativePath": "../../"
        }
      );
      grunt.file.write("dist/styleguide/styles/colors.html", colorsHtml);
    }

    function generateTypographyAdapter () {
      var original = JSON.parse(grunt.file.read(typographySourceFile));
      var colors     = JSON.parse(grunt.file.read(colorsSourceFile));

      // We have palettes, let's merge them into one single object
      if (_.isObject(_.values(colors))) {
        var colorsTmp = {};
        _.each(_.values(colors), function (palette) {
          colorsTmp = _.merge(colorsTmp, palette);
        });
        colors = colorsTmp;
      }
      var adapted  = _.map(original, function (properties, name) {
        return _.merge({
          name: name,
          category: "typography",
          colorValue: colors[properties.color],
          value: "The quick brown fox jumps over the lazy dog"}, properties);
      });
      typographyOriginal = adapted;
      grunt.file.write(theoTypographyAdapterPath, JSON.stringify(adapted, undefined, 2));
      generateTheoAdapter(theoTypographyAdapterPath, theoTypographyAdapterPath);
    }

    function generateTypographySass () {
      theo.convert(theoTypographyAdapterPath, typographyDestFile, {
        templates: ['scss'],
        templatesDirectory: customTheoTemplates
      });
    }

    function generateTypographyStyleguidePage () {
      theo.convert(
        theoTypographyAdapterPath,
        'dist/styleguide/styles/theo',
        { templates: ['html'], templatesDirectory: customTheoTemplates }
      );

      var typographyHtml = Helper.jadeRender(
        typographyTemplate,
        {
          "typography": typographyOriginal,
          "components": componentsData.allMetadata,
          "relativePath": "../../"
        }
      );
      grunt.file.write("dist/styleguide/styles/typography.html", typographyHtml);
    }

    function generateIconsStyleguidePage () {
      var icons = grunt.file.expand( { cwd: options.config.srcDir + '/' + options.config.assetsDir + '/icons/' }, '*.svg');
      icons = _.map(icons, function (icon) { return icon.replace('.svg', ''); });

      var iconsHtml = Helper.jadeRender(
        iconsTemplate,
        {
          "icons": icons,
          "components": componentsData.allMetadata,
          "relativePath": "../../"
        }
      );
      grunt.file.write("dist/styleguide/styles/icons.html", iconsHtml);
    }

    generateColorAdapter();
    generateColorsSass();
    // generateColorsStyleguidePage();

    generateTypographyAdapter(typographySourceFile, theoTypographyAdapterPath)
    generateTypographySass();
    // generateTypographyStyleguidePage();


    // generateIconsStyleguidePage();
  });
};
