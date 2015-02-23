angular
  .module('styleguide.colors', ['styleguide.common'])
  .controller('ColorsCtrl', function ($scope, StyleguideData) {

    $scope.ready = false;

    StyleguideData.getColorsData().then(function (colorsData) {
      $scope.ready      = true;
      $scope.colorsData = colorsData;
      console.log(colorsData);
    });
  });
