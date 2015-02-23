angular.module('styleguide.layout.sidebar', [ 'styleguide.common' ])
  .controller('SidebarCtrl', function ($scope, StyleguideData) {

    StyleguideData.getComponentsData().then(function (components) {
      console.log('components-data', components);
      $scope.components = components;
    })
  });
