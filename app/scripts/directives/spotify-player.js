'use strict';

/**
 * @ngdoc directive
 * @name bulwarkApp.directive:spotifyPlayer
 * @description
 * # spotifyPlayer
 */
angular.module('bulwarkApp')
  .directive('spotifyPlayer', function ($timeout, $location) {
    return {
      templateUrl: 'views/directives/spotify-player.html',
      restrict: 'E',
      transclude: true,
      link: function postLink(scope, element) {
	    var slideout = new Slideout({
	      'panel': document.getElementById('panel'),
	      'menu': document.getElementById('menu'),
	      'padding': 0,
	      'duration': 250
	    });
	   	scope.isActive = false;
	   	scope.loading = true;

	    var menu = element[0].querySelector('#menu');
	    var body = angular.element('#panel');
	    var closer = element[0].querySelector('.spotify-closer');

	    var init = function () {
	    	$timeout(function () {
	    		scope.loading = false;
	    	}, 4000);
	    };

		scope.toggleSideNav = function() {
			closer.style.top = ($(window).height() / 2) + 'px';
			var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();

			if ($(document).scrollTop() >= angular.element('#bul-title')[0].offsetHeight) {
		    	menu.style.position = 'fixed';
		    	menu.style.top = 50 + 'px';
		    } else {
		    	menu.style.position = 'fixed';
		    	menu.style.top = (angular.element('.navigation-wrapper')[0].offsetHeight - $(document).scrollTop()) + 'px';
		    }
		    if (scrollBottom <= angular.element('.footer-bar')[0].offsetHeight) {
		    	menu.style.bottom = (61 - scrollBottom) + 'px';
		    } else {
		    	menu.style.bottom = 0;
		    }
		    if (scope.isActive) {
			    $timeout(function () {
				    scope.isActive = !scope.isActive;
			    }, 0);
		    } else {
			    scope.isActive = !scope.isActive;
		    }

			slideout.toggle();
		};

		scope.checkLocation = function () {
			if ($location.path() === '/') {
				return true;
			} else {
				return false;
			}
		};

		body.on('click', function () {
			if (scope.isActive) {
				scope.toggleSideNav();
			}
		});

		init();
      }
    };
  });
