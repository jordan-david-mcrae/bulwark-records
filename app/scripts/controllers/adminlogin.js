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
    vm.credentials = {
      username: '',
      password: ''
    };

    vm.registration = {
      username: '',
      password: ''
    };

    vm.logout = function() {
      user.logout();
    };

    vm.login = function() {
      user.login(vm.credentials)
        .then(function success(response) {
          console.log('Success: ', response);
          $location.path('/main');
        }, function error(response) {
          // Handle login error here
          console.log('Error', response);
        });
    };

    vm.register = function() {
      user.register(vm.registration)
        .then(function success (response) {
          console.log('Successful registration: ', response);
          $location.path('/main');
        }, function err (response) {
          console.log('Error while signing up: ', response);
        });
    };
  });
