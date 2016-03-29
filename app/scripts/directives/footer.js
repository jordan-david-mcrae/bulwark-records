'use strict';

/**
 * @ngdoc directive
 * @name bulwarkApp.directive:footer
 * @description
 * # footer
 */
angular.module('bulwarkApp')
  .directive('footer', function($window, $timeout) {
    return {
      templateUrl: 'views/directives/footer.html',
      restrict: 'E',
      controllerAs: 'footer',
      controller: function($location) {
        var vm = this;
        vm.path = $location.path();
      },
      link: function(scope, element, attrs) {

        var bodyheight = '';
        var windowheight = '';

        function init() {
          bodyheight = angular.element('html')[0].offsetHeight;
          windowheight = $(window).height();

          if (angular.element('.footer-bar')[0] !== undefined) {
            if (angular.element('html')[0].offsetHeight < $(window).height()) {
              angular.element('.footer-bar')[0].style.position = 'fixed';
              angular.element('.footer-bar')[0].style.left = '0';
              angular.element('.footer-bar')[0].style.bottom = '0';
            }
          }
        }

        function checkFixed() {
          if (angular.element('html')[0].offsetHeight < $(window).height()) {
            angular.element('.footer-bar')[0].style.position = 'fixed';
            angular.element('.footer-bar')[0].style.left = '0';
            angular.element('.footer-bar')[0].style.bottom = '0';
          } else {
            angular.element('.footer-bar')[0].style.position = 'relative';
          }
        }

        scope.$watch(function() {
          return angular.element('html')[0].offsetHeight
        }, function(newV) {
          bodyheight = newV;
          if (angular.element('.footer-bar')[0] !== undefined) {
            checkFixed();
          }
        });

        $timeout(init, false);

      }
    };
  });
