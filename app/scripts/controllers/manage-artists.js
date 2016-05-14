'use strict';

/**
 * @ngdoc function
 * @name bulwarkApp.controller:ManageartistsCtrl
 * @description
 * # ManageartistsCtrl
 * Controller of the bulwarkApp
 */
angular.module('bulwarkApp')
  .controller('ManageArtistsCtrl', function (ArtistService) {
  	var vm = this;
  	vm.selectedArtist = '';
  	vm.newDetails = {
			name: '',
			description: '',
			website: '',
			image: '',
			artistID: Math.floor((Math.random() * (1000 * 1000 * 10000)) + 1)
  	};
  	vm.loading = true;
  	vm.artists = [];
  	vm.hasError = false;
  	vm.message = '';

  	vm.init = function () {
  		console.log('INIT')
  		ArtistService.getArtists()
  			.then(function success (response) {
  				console.log('SUCCESS: ', response);
  				vm.artists = response.data.artists;
  				vm.loading = false;
  			}, function err (response) {
  				console.log('ERROR: ', response);
  				vm.loading = false;
  				vm.hasError = true;
  			});
  	};

  	vm.addArtist = function () {
  		vm.hasError = false;
  		vm.message = '';
  		vm.loading = true;
  		if (vm.selectedArtist!=='') {
  			vm.newDetails = vm.selectedArtist;
  		}
  		ArtistService.sendArtist(vm.newDetails)
  			.then(function success(response) {
  				console.log('SUCCESS: ', response);
  				vm.artists = response.data.artists;
  				vm.loading = false;
  				vm.message = response.data.detail;
  				vm.selectedArtist = '';
  				vm.resetNew();
  			}, function err(response) {
  				console.log('ERROR: ', response);
  				vm.loading = false;
  				vm.hasError = true;
  				vm.message = response.data.detail;
  			});
  	};

  	vm.setActiveArtist = function (artist) {
  		vm.selectedArtist = angular.copy(artist);
  	};

  	vm.back = function () {
  		vm.selectedArtist = '';
  	};

  	vm.resetNew = function () {
			vm.newDetails = {
				name: '',
				description: '',
				website: '',
				image: '',
				artistID: Math.floor((Math.random() * (1000 * 1000 * 10000)) + 1)
	  	};
  	}

  	vm.init();
  });
