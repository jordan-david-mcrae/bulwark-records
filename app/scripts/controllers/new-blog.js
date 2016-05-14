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
    vm.blogInfo = {
      html: '',
      blogID: Math.floor((Math.random() * (1000 * 1000 * 10000)) + 1)
    };
    vm.hasError = false;

    vm.newBlog = function() {
      vm.message = '';
      vm.hasError = false;
      vm.loading = true;
      blogService.sendBlog(vm.blogInfo)
        .then(function success(response) {
          vm.html = '';
          vm.message = response.data.detail;
          vm.resetBlogInfo();
          vm.loading = false;
        }, function error(response) {
          vm.message = response.data.detail;
          vm.loading = false;
          vm.hasError = true;
        });
    };

    vm.resetBlogInfo = function () {
      vm.blogInfo.html = '';
      vm.blogInfo.blogID = Math.floor((Math.random() * (1000 * 1000 * 10000)) + 1);
    };
  });
