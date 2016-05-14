'use strict';

/**
 * @ngdoc function
 * @name bulwarkApp.controller:LandingCtrl
 * @description
 * # LandingCtrl
 * Controller of the bulwarkApp
 */
angular.module('bulwarkApp')
  .controller('LandingCtrl', function($location, screensize, $http, landingService) {
    var vm = this;
    vm.location = $location;
    vm.screensize = screensize;
    vm.loading = true;
    vm.info = {};
    vm.message = '';
    vm.hasError = false;
    vm.isOpen = false;

    vm.init = function() {
      // Load server config...

      landingService.getLandingInfo()
        .then(function success(response) {
          vm.info = response.data.info[0];
        }, function err () {
          vm.info = {landingType: 'default', promoVideo: ''};
        });

      $http.get('/images/logo-highlight.png')
      .then(function success() {
        vm.loading = false;
      });
      if (screensize === 'mobile') {
        vm.logo = '/images/logo-highlight.png';
      }
    };

    vm.save = function () {
      vm.loading = true;
      vm.hasError = false;
      vm.isOpen = false;

      landingService.updateLandingInfo(vm.info)
        .then(function success (response) {
          vm.loading = false;
          vm.info = response.data.info[0];
          vm.message = response.data.detail;
        }, function err (response) {
          vm.loading = false;
          vm.hasError = true;
          vm.message = response.data.detail;
        });
    };

    // vm.preview = function () {
    //   vm.info.promoVideo = $sce.trustAsResourceUrl(vm.updatedUrl);
    // };

    vm.init();
  });
