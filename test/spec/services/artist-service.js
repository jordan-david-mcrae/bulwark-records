'use strict';

describe('Service: artistService', function () {

  // load the service's module
  beforeEach(module('bulwarkApp'));

  // instantiate service
  var artistService;
  beforeEach(inject(function (_artistService_) {
    artistService = _artistService_;
  }));

  it('should do something', function () {
    expect(!!artistService).toBe(true);
  });

});
