'use strict';

/**
 * @ngdoc directive
 * @name bulwarkApp.directive:dragDetector
 * @description
 * # dragDetector
 */
angular.module('bulwarkApp')
  .directive('dragDetector', function ($location) {
    return {
      restrict: 'A',
      link: function postLink(scope, element) {
	  		if ($location.path() === '/prospective-contact') {
          var fader = angular.element('.window-fader');
          var faderInfo = angular.element('.fader-info');
          element.on('dragover', function() {
  	  			// console.log('IN HERE');
  	  			angular.element('body').addClass('no-scroll');
  	  			fader.addClass('show-fader');
  	  			faderInfo.addClass('show-fader');
          });

          fader.on('dragleave', function() {
            toggleOff();
          });

          faderInfo.on('dragleave', function() {
            toggleOff();
          });

          function toggleOff() {
            if ($location.path() === '/prospective-contact') {
            angular.element('body').removeClass('no-scroll');
            fader.removeClass('show-fader');
            faderInfo.removeClass('show-fader');
            }
          }

          fader.on('drop', function(e) {
            // angular.element('.window-fader').style.visibility = 'hidden';
            console.log('EVENT fader: ', e);
            e.preventDefault();
            e.stopPropagation();
            scope.showFader = false;
            angular.element('body').removeClass('no-scroll');
            fader.removeClass('show-fader');
            faderInfo.removeClass('show-fader');
          });

          faderInfo.on('drop', function(e) {
            // angular.element('.window-fader').style.visibility = 'hidden';
            console.log('EVENT faderInfo: ', e);
            e.preventDefault();
            e.stopPropagation();
            scope.showFader = false;
            angular.element('body').removeClass('no-scroll');
            fader.removeClass('show-fader');
            faderInfo.removeClass('show-fader');
          });
          
          element.on('drop', function(e) {
            console.log('EVENT element: ', e);
            // angular.element('.window-fader').style.visibility = 'hidden';
            e.preventDefault();
            e.stopPropagation();
            scope.showFader = false;
            angular.element('body').removeClass('no-scroll');
            fader.removeClass('show-fader');
            faderInfo.removeClass('show-fader');
          });
	  		}
      }
    };
  });
