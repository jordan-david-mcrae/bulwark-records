'use strict';

/**
 * @ngdoc function
 * @name bulwarkApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bulwarkApp
 */
angular.module('bulwarkApp')
  .controller('MainCtrl', function(blogService, $scope, screensize, $window) {
    var vm = this;
    vm.blogs = [];
    vm.currentPageBlogs = [];
    vm.animateText = {};
    vm.loading = false;
    vm.currentPage = 1;
    vm.itemsPerPage = 5;
    vm.beginFrom = '';
    vm.editId = '';
    vm.edit = false;
    vm.message = '';
    vm.hasError = false;

    vm.init = function() {
      vm.loading = true;
      blogService.getBlogs()
        .then(function success(response) {
          vm.loading = false;
          vm.blogs = response.blogs;
        }, function err() {
          vm.loading = false;
        });

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

    vm.deleteBlog = function(blog) {
      if ($window.confirm('Are you sure you want to delete this blog post?')) {
        blogService.deleteBlog(blog);
      }
    };

    vm.editBlog = function (blog) {
      vm.edit = true;
      vm.message = '';
      vm.editId = blog.blogID;
      vm.hasError = false;
    };

    vm.save = function (blog) {
      vm.loading = true;
      blogService.sendBlog(blog)
        .then(function success (response) {
          vm.message = response.data.detail;
          vm.loading = false;
          vm.edit = false;
        }, function err (response) {
          vm.message = response.data.detail;
          vm.loading = false;
          vm.hasError = true;
        });
    };

    vm.pageChanged = function() {
      $('body').duScrollTo(0, 0, 500);
      // $window.scrollTo(0, 0, 500, 200);
      var changePage = (vm.currentPage * $scope.pageSize) - $scope.pageSize;
      vm.beginFrom = changePage;
    };

    $scope.$on('$routeChangeSuccess', function() {
      $window.scrollTo(0, 0);
    });

    $scope.$watch(function() {
      return blogService.blogList();
    }, function(newV) {
      vm.blogs = newV;
    }, true);

    vm.init();
  });
