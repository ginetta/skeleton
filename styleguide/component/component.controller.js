angular.module('styleguide.component', ['styleguide.common'])
  .controller('ComponentCtrl', function ($scope, $stateParams, StyleguideData) {
    var componentName = $stateParams.name;
    console.log('ComponentCtrl');

    $scope.ready = false;

    StyleguideData.getComponentsData(componentName).then(function (component) {
      $scope.ready     = true;
      $scope.component = component;
      $scope.data      = component.data;
      $scope.options   = { };
      _.each(component.options, function (optionData, name) {
        $scope.options[name] = optionData.default;
      });
    });



    $scope.tabs   = [ 'view', 'source', 'html'];
    $scope.tabIdx = 0;
    $scope.selectTab = function (index) {
      $scope.tabIdx = index;
    }
  });
