'use strict';

/**
 * @ngdoc service
 * @name bulwarkApp.auth
 * @description
 * # auth
 * Factory in the bulwarkApp.
 */
angular.module('bulwarkApp')
  .factory('auth', function (localStorageService) {
    // Service logic
    var auth = false;

    // Public API here
    return {
      setToken: function(token) {
       localStorageService.set('token', token);
      },
      getToken: function() {
        return localStorageService.get('token');
      },
      setAuth: function(bool) {
        auth = bool;
      },
      isAuthorized: function() {
        return auth;
      }
    };
  });
