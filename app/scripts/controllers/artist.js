'use strict';

/**
 * @ngdoc function
 * @name bulwarkApp.controller:ArtistCtrl
 * @description
 * # ArtistCtrl
 * Controller of the bulwarkApp
 */
angular.module('bulwarkApp')
  .controller('ArtistCtrl', function(artistService, $location, $routeParams) {
    var vm = this;
    vm.current = artistService.searchArtists($routeParams.id);
    console.log('CURRENT: ', vm.current);
  });
