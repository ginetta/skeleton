'use strict';

angular
  .module('styleguide.common', [
    'ui.router',
  ])
  .service('ComponentsData', function ($http, $q) {
    var componentsData = [];
    return {
      getData: getData
    }

    function filterComponents (components, componentName) {
      if (!componentName) {
        return components;
      }
      return _.find(components, function (c) { return c.name === componentName });
    }

    function getData (componentName) {
      var deferred = $q.defer();
      if (componentsData.length) {
        deferred.resolve(filterComponents(componentsData, componentName));
      } else {
        $http
          .get('data/components.json')
          .success(function (result) {
            deferred.resolve(filterComponents(result, componentName));
            componentsData = result;
          });
      }

      return deferred.promise;
    }
  });


angular
  .module('styleguide', [
    'styleguide.common',

    'styleguide.dashboard',
    'styleguide.component',
    'app.widgets'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .state('component', {
        url: 'component/:name',
        templateUrl: 'component/component.html',
        controller: 'ComponentCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
  .controller('MainCtrl', function ($scope) {
    console.log('main controller loaded');
  });
