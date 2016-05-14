'use strict';

describe('Service: ArtistService', function () {

  // load the service's module
  beforeEach(module('bulwarkApp'));

  // instantiate service
  var ArtistService;
  beforeEach(inject(function (_ArtistService_) {
    ArtistService = _ArtistService_;
  }));

  it('should do something', function () {
    expect(!!ArtistService).toBe(true);
  });

});
