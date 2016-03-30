'use strict';

/**
 * @ngdoc directive
 * @name bulwarkApp.directive:navigation
 * @description
 * # navigation
 */
angular.module('bulwarkApp')
  .directive('navigationBar', function($timeout, $document, $parse, $window) {
    return {
      templateUrl: 'views/directives/navigation.html',
      restrict: 'E',
      controllerAs: 'navbar',
      controller: function($window) {
        var vm = this;
        vm.isSticky = false;

        $window.onscroll = _.debounce(function() {
          var classes = body.attr('class');

          if (classes.search('is-sticky') === -1) {
            vm.isSticky = false;
          } else {
            vm.isSticky = true;
          }
        }, 20);
      },
      link: function(scope) {
        var height = '';
        // var title = angular.element('#bul-title')[0];
        // var maincontainer = angular.element('.main-container')[0];
        var body = angular.element('body');
        // var isLoaded = false;
        scope.isSticky = false;

        function init() {
          rebuild();
        }

        function rebuild() {
          height = angular.element('#bul-title')[0].offsetHeight;
        }

        $window.onscroll = _.debounce(function() {
          var classes = body.attr('class');

          if (classes.search('is-sticky') === -1) {
            scope.isSticky = false;
          } else {
            scope.isSticky = true;
          }
        }, 20);


        angular.element($window).bind('resize', function() {
          rebuild();
        });

        $timeout(init, false);
      }
    };
  });
