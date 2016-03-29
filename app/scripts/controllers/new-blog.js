'use strict';

/**
 * @ngdoc function
 * @name bulwarkApp.controller:NewBlogCtrl
 * @description
 * # NewBlogCtrl
 * Controller of the bulwarkApp
 */
angular.module('bulwarkApp')
  .controller('NewBlogCtrl', function($http, blogService) {
    var vm = this;
    vm.loading = false;
    vm.html = '';

    vm.submitBlog = function() {
      vm.loading = true;
      blogService.sendBlog(vm.html)
        .then(function success(reponse) {
          // Add in toast message
          vm.html = '';
          vm.loading = false;

        }, function error(err) {
          vm.loading = false;
        });
    }
  });
