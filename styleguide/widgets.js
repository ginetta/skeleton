angular
  .module('app.widgets.templates', []);
angular
  .module('app.widgets', ["app.widgets.templates","app.widgets.hello-world"]);

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

angular.module('app.widgets.templates').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('widgets/hello-world/template.html',
    "\n" +
    "<div data-ng-class=\"{ 'is-active': options.isActive }\" class=\"hello-world\">\n" +
    "  <h1 style=\"color: {{ options.color }}\"> {{ data.greeting }}</h1>\n" +
    "  <h2> {{ data.name }}</h2>\n" +
    "</div>"
  );

}]);
