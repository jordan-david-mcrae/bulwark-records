'use strict';

/**
 * @ngdoc directive
 * @name bulwarkApp.directive:loadingSpinner
 * @description
 * # loadingSpinner
 */
angular.module('bulwarkApp')
  .directive('loadingSpinner', function() {
    return {
      templateUrl: 'views/directives/loading-spinner.html',
      restrict: 'E',
      scope: {
        type: '@'
      },
      link: function(scope, element, attrs) {
        var wrapper = angular.element('.loading-wrapper');
        var spinner = angular.element('.loading-spinner');
        if (scope.type === 'inline') {
          spinner.margin = '0 auto';
        }

        if (scope.type === 'absolute') {
          wrapper.position = 'absolute';
          wrapper.width = '100%';
          wrapper.height = '100%';
          spinner.position = 'absolute';
          spinner.left = '50%';
        }
      }
    };
  });
