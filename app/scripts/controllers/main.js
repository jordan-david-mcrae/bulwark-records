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
    vm.blogs = blogService.getBlogs();
    vm.currentPageBlogs = [];
    vm.animateText = {};
    vm.loading = false;
    vm.currentPage = 1;
    vm.itemsPerPage = 5;
    vm.beginFrom = '';

    vm.init = function() {
      vm.loading = true;
      blogService.getBlogs()
        .then(function success() {
          vm.loading = false;
        }, function error() {
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

    vm.pageChanged = function() {
      $window.scrollTo(0, 0);

      var changePage = (vm.currentPage * vm.itemsPerPage) - vm.itemsPerPage;

      var changePage = (vm.currentPage * $scope.pageSize) - $scope.pageSize;
      vm.beginFrom = changePage;
    };

    // socket.on('updateBlogs', function(blogs) {
    //   vm.blogs = blogs;
    // });


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
