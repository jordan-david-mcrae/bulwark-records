'use strict';

/**
 * @ngdoc function
 * @name bulwarkApp.controller:BulwarkCtrl
 * @description
 * # BulwarkCtrl
 * Controller of the bulwarkApp
 */
angular.module('bulwarkApp')
  .controller('BulwarkCtrl', function($location, $scope, user, $log, screensize, $rootScope, $window) {
    var vm = this;
    vm.auth = '';
    vm.path = '';
    vm.animateText = {};
    vm.screensize = screensize;
    vm.files = '';
    vm.adminEdit = false;

    vm.init = function() {
      if (screensize === 'mobile') {
        vm.animateText = {
          topTop: { opacity: 1 },
          'centerTop-50': { opacity: 1 },
          // 'bottomCenter-70': { opacity: 1 },
          'bottomTop-60': { opacity: 0.2 }
        };
      } else {
        vm.animateText = {
          topTop: { opacity: 1 },
          'centerTop-70': { opacity: 1 },
          'bottomTop-60': { opacity: 0.3 },
        };
      }
    };

    vm.filesSelected = function () {
      $rootScope.$emit('dropFiles', vm.files);
    };

    vm.logout = function() {
      user.logout().then(function success() {
        vm.auth = false;
      }, function error() {
        vm.auth = false;
      });
    };

    vm.toggleAdminSettings = function () {
      vm.adminEdit = true;
    };

    $rootScope.$on('imageHeight', function(event, height) {
      vm.additionalHeight = height;
      console.log('height: ', height);
    });

    $scope.$on('$locationChangeStart', function() {
      // localStorageService.set('token', null);
      // localStorageService.set('username', null);
      user.checkToken()
        .then(function success (response) {
          if (response.data.tokenFound) {
            vm.auth = true;
          } else {
            vm.auth = false;
          }
        }, function err () {
          vm.auth = false;
        });
      vm.path = $location.path();

      // Forbidden
      if (vm.path === ('/new-blog' || '/image-manager')) {
        if (!vm.auth) {
          $location.path('/main');
        }
      }
    });

    $scope.$on('$routeChangeSuccess', function() {
      window.scrollTo(0, 0);
    });

    $scope.$on('$viewContentLoaded', function() {
      $window.ga('send', 'pageview', { page: $location.url() });
    });

    vm.init();
  });
