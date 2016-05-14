'use strict';

/**
 * @ngdoc directive
 * @name bulwarkApp.directive:navigation
 * @description
 * # navigation
 */
angular.module('bulwarkApp')
  .directive('navigationBar', function($timeout, $document, $parse, $window, $location, $rootScope, $uibModal) {
    return {
      templateUrl: 'views/directives/navigation.html',
      restrict: 'E',
      controllerAs: 'navbar',
      controller: function($window) {
        var vm = this;

        vm.home = function () {
          $window.location.href = '/';
        };

        vm.openSignUp = function () {
          $uibModal.open({
            animation: true,
            templateUrl: 'views/newsletter.html',
            controller: 'NewsletterCtrl',
            size: 'lg'
          });
        };
      },
      link: function() {
        var height = '';
        // var body = angular.element('body');
        var mainContainer = angular.element('.main-container')[0];

        function init() {
          rebuild();
        }

        function rebuild() {
          if ($location.path() !== '/') { 
            height = angular.element('#bul-title')[0].offsetHeight;
            mainContainer.style.minHeight = (window.innerHeight - (angular.element('#navigationWrapper')[0].offsetHeight + angular.element('.footer-bar')[0].offsetHeight)) + 'px';
          }
        }

        angular.element($window).bind('resize', function() {
          rebuild();
        });

        $rootScope.$on('$routeChangeSuccess', function() {
          $timeout(function() {
            rebuild();            
          });
        });

        $timeout(init, false);
      }
    };
  });
