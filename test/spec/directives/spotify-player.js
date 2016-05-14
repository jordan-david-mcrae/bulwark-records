'use strict';

describe('Directive: spotifyPlayer', function () {

  // load the directive's module
  beforeEach(module('bulwarkApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<spotify-player></spotify-player>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the spotifyPlayer directive');
  }));
});
