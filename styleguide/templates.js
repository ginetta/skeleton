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
