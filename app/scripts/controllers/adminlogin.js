'use strict';

/**
 * @ngdoc function
 * @name bulwarkApp.controller:AdminloginCtrl
 * @description
 * # AdminloginCtrl
 * Controller of the bulwarkApp
 */
angular.module('bulwarkApp')
  .controller('AdminloginCtrl', function(user, $location) {
    var vm = this;
    vm.username = {
      login: '',
      password: ''
    };

    vm.logout = function() {
      user.logout();
    };

    vm.login = function() {
      user.login(vm.username)
        .then(function success() {
          $location.path('/main')
        }, function error() {
          // Handle login error here
          console.log('ERROR');
        });
    };
  });
