'use strict';

/**
 * @ngdoc function
 * @name bulwarkApp.controller:BulwarkCtrl
 * @description
 * # BulwarkCtrl
 * Controller of the bulwarkApp
 */
angular.module('bulwarkApp')
  .controller('BulwarkCtrl', function($location, $scope, user, $log, screensize, $rootScope) {
    var vm = this;
    vm.auth = '';
    vm.path = '';
    vm.animateText = {};
    vm.screensize = screensize;

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

    vm.logout = function() {
      $log.debug('Logging out...');
      user.logout().then(function success() {
        vm.auth = false;
      });
    };

    $rootScope.$on('imageHeight', function(event, height) {
      vm.additionalHeight = height;
      console.log('height: ', height);
    });

    $scope.$watch(function() {
      return user.isAuthenticated();
    }, function(newV) {
      vm.auth = newV;
    });

    $scope.$on('$locationChangeStart', function() {
      vm.auth = user.isAuthenticated();
      vm.path = $location.path();

      // Forbidden
      if (vm.path === ('/new-blog' || '/image-manager')) {
        if (!vm.auth) {
          $location.path('/adminlogin');
        }
      }
    });

    vm.init();
  });
