angular.module('styleguide.dashboard', [])
  .controller('DashboardCtrl', function ($scope, ComponentsData) {
    console.log('dashboardCtrl ');

    ComponentsData.getData().then(function (components) {
      console.log('components-data', components);
      $scope.components = components;
    })
  });
