angular
  .module('styleguide.typography', ['styleguide.common'])
  .controller('TypographyCtrl', function ($scope, StyleguideData) {

    $scope.ready = false;

    StyleguideData.getColorsData().then(function (colorsData) {
      $scope.ready      = true;
      $scope.colorsData = colorsData;
      console.log(colorsData);
    });
  });
