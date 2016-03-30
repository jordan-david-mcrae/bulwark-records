'use strict';

/**
 * @ngdoc function
 * @name bulwarkApp.controller:GeneralContactCtrl
 * @description
 * # GeneralContactCtrl
 * Controller of the bulwarkApp
 */
angular.module('bulwarkApp')
  .controller('GeneralContactCtrl', function() {
    var vm = this;
    vm.query = {
      name: '',
      phone: '',
      email: '',
      message: ''
    };

    vm.submit = function() {
      console.log('SENDING... ', vm.query);
    };
  });
