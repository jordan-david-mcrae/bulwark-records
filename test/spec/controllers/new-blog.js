'use strict';

describe('Controller: NewBlogCtrl', function () {

  // load the controller's module
  beforeEach(module('bulwarkApp'));

  var NewBlogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewBlogCtrl = $controller('NewBlogCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {

  });
});
