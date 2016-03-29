'use strict';

describe('Controller: MainCtrl', function() {

  // load the controller's module
  beforeEach(module('bulwarkApp'));

  // Provide will help us create fake implementations for our dependencies
  module(function($provide) {
    // Fake blogService Implementation to return a promise

    $provide.factory('blogService', [function() {
      return {
        getBlogs: function() {
          [{ "entry": "Hello World" }, { "entry": "Foo Bar" }];
        }
      }
    }]);
  });

  var MainCtrl,
    scope,
    vm,
    mockBlogService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, blogService) {
    scope = $rootScope.$new();
    // Declare vm to access controller as scope
    vm = $controller('MainCtrl', { $scope: scope });
    mockBlogService = blogService;
    console.log('BLOG SERVICE: ', mockBlogService);
    spyOn(mockBlogService, 'getBlogs').andCallThrough();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      blogService: mockBlogService
    });
  }));

  it('should delete a blog when an admin clicks the delete button', function() {
    console.log('BLOGS? ', vm.blogs);
  });
});
