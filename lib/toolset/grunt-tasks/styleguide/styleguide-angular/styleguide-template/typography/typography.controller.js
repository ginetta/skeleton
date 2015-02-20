angular
  .module('styleguide.typography', ['styleguide.common'])
  .controller('TypographyCtrl', function ($scope, StyleguideData) {

    $scope.ready = false;

    StyleguideData.getTypographyData().then(function (typographyData) {
      $scope.ready          = true;
      $scope.typographyData = typographyData;
      console.log(typographyData)
    });

    var colors = {};
    StyleguideData.getColorsData().then(function (colorsData) {
      _.each(colorsData, function (paletteColors, paletteName) {
        _.each(paletteColors, function (value, name) {
          colors[name] = value;
        })
      });
      console.log('colors', colors);
    });

    $scope.getCssStyleFor = function (specs) {
      return _.map(specs, function (value, property) {
        if (property === 'value') {
          return "";
        }


        var transformedProperty = property;
        var trasnformedValue    = value;
        if (property === 'fontSize') {
          transformedProperty = 'font-size';
        } else if (property === 'lineHeight') {
          transformedProperty = 'line-height';
        } else if (property === 'fontFamily') {
          transformedProperty = 'font-family';
        } else if (property === 'textTransform') {
          transformedProperty = 'text-transform';
        } else if (property === 'fontWeight') {
          transformedProperty = 'font-weight';
        } else if (property === 'color') {
          trasnformedValue = colors[value];
        }
        return transformedProperty + ": " + trasnformedValue + ";"
      }).join("");
    }
  });
