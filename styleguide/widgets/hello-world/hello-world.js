angular
  .module('app.widgets.hello-world', [])
  .directive('helloWorld', function () {
    return {
      restrict: 'E',
      templateUrl: 'widgets/hello-world/template.html',
      scope: {
        data   : '=',
        options: '='
      }
    }
  })
