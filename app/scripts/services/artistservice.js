'use strict';

/**
 * @ngdoc service
 * @name bulwarkApp.ArtistService
 * @description
 * # ArtistService
 * Factory in the bulwarkApp.
 */
angular.module('bulwarkApp')
  .factory('ArtistService', function ($http, $q, ENV) {

    // Public API here
    return {
      getArtists: function () {
        var deferred = $q.defer();
        console.log('Getting...');
        $http.get(ENV.DEV + '/artists/')
          .then(function success (response) {
            deferred.resolve(response);
          }, function err (response) {
            deferred.reject(response);
          });
        return deferred.promise;
      },
      sendArtist: function (info) {
        var deferred = $q.defer();

        $http.post(ENV.DEV + '/artists/send', info)
          .then(function success (response) {
            deferred.resolve(response);
          }, function err (response){
            deferred.reject(response);
          });
        return deferred.promise;
      }
    };
  });
