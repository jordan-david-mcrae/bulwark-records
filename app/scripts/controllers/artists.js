'use strict';

/**
 * @ngdoc function
 * @name bulwarkApp.controller:ArtistsCtrl
 * @description
 * # ArtistsCtrl
 * Controller of the bulwarkApp
 */
angular.module('bulwarkApp')
  .controller('ArtistsCtrl', function(artistService, $location) {
    var vm = this;

    vm.viewArtist = function(id) {
      artistService.setCurrentArtist(id);
      $location.path('/artists/' + id);
    };

    vm.artistList = artistService.getArtists();
  });
