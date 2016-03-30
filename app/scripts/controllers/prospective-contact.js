'use strict';

/**
 * @ngdoc function
 * @name bulwarkApp.controller:ProspectiveContactCtrl
 * @description
 * # ProspectiveContactCtrl
 * Controller of the bulwarkApp
 */
angular.module('bulwarkApp')
  .controller('ProspectiveContactCtrl', function() {
    var vm = this;
    vm.query = {
      name: '',
      phone: '',
      email: '',
      about: ''
    };

    vm.submit = function() {
      console.log('POST: ', vm.query);
    };
  });
