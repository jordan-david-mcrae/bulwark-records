'use strict';

/**
 * @ngdoc directive
 * @name bulwarkApp.directive:mobileScrollButton
 * @description
 * # mobileScrollButton
 */
angular.module('bulwarkApp')
  .directive('mobileScrollButton', function($window, $location) {
    return {
      templateUrl: 'views/directives/scroll-button.html',
      restrict: 'E',
      link: function postLink(scope, element) {

        element.on('click', function() {
          $('body').duScrollTo(0, 0, 500);
        });

        // $window.onscroll = function() {
        //   if ($window.scrollY > 10 && $location.path() === '/main') {
        //     element[0].style.display = 'initial';
        //   } else {
        //     element[0].style.display = 'none';
        //   }
        // }

        scope.$watch(function() {
          return $location.path();
        }, function() {
          if ($location.path() !== '/main') {
            element[0].style.display = 'none';
          } else {
            element[0].style.display = 'initial';
          }
        }, true);

      }
    };
  });
