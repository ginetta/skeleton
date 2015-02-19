angular.module('styleguide.component', ['styleguide.common'])
  .controller('ComponentCtrl', function ($scope, $stateParams, ComponentsData) {
    var componentName = $stateParams.name;
    console.log('ComponentCtrl');

    $scope.ready = false;

    ComponentsData.getData(componentName).then(function (component) {
      $scope.ready     = true;
      $scope.component = component;
      $scope.data      = component.data;
      $scope.options   = { };
    })




  });
