'use strict';

/**
 * @ngdoc function
 * @name bulwarkApp.controller:LandingCtrl
 * @description
 * # LandingCtrl
 * Controller of the bulwarkApp
 */
angular.module('bulwarkApp')
  .controller('LandingCtrl', function($location, screensize) {
    var vm = this;
    vm.location = $location;
    vm.screensize = screensize;

    vm.init = function() {
      if (screensize === 'mobile') {
        vm.logo = '/images/logo-highlight.png';
      }
    };

    vm.init();
  });
