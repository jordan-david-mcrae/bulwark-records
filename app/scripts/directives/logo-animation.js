'use strict';

/**
 * @ngdoc directive
 * @name bulwarkApp.directive:logoAnimation
 * @description
 * # logoAnimation
 */
angular.module('bulwarkApp')
  .directive('logoAnimation', function($timeout, $location) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        console.log('HELLO WORLD');
        // var wrapper = angular.element('.landing-wrapper')[0];
        element.bind('click', function() {
          element.addClass('magictime puffOut');
          $timeout(function() {
            $location.path('/main');
          }, 500);
        });
      }
    };
  });
