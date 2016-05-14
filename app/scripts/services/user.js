'use strict';

/**
 * @ngdoc service
 * @name bulwarkApp.user
 * @description
 * # user
 * Factory in the bulwarkApp.
 */
angular.module('bulwarkApp')
  .factory('user', function($http, $q, $log, auth, localStorageService, ENV) {

    // Public API here
    return {
      login: function(user) {
        var deferred = $q.defer();
        $http.post(ENV.DEV + '/user/login/', user)
          .then(function success(response) {
          localStorageService.set('username', user.username);
          localStorageService.set('token', response.data.token);
            deferred.resolve(response.data);
          }, function error(err) {
            localStorageService.set('username', '');
            localStorageService.set('token', null);
            deferred.reject(err);
          });
        return deferred.promise;
      },
      logout: function() {
        var deferred = $q.defer();
        $http.post(ENV.DEV + '/user/logout/', { username: localStorageService.get('username')})
          .then(function success(response) {
            localStorageService.set('username', '');
            localStorageService.set('token', null);
            deferred.resolve(response.data);
          }, function error(err) {
            localStorageService.set('username', '');
            localStorageService.set('token', null);
            deferred.reject(err);
          });
        return deferred.promise;
      },
      register: function (credentials) {
        var deferred = $q.defer();
        $http.post(ENV.DEV + '/user/register', credentials)
          .then(function success (response) {
            localStorageService.set('username', credentials.username);
            localStorageService.set('token', response.data.token);
            deferred.resolve(response.data);
          }, function error (err) {
            localStorageService.set('username', '');
            localStorageService.set('token', null);
            deferred.reject(err);
          });
        return deferred.promise;
      },
      checkToken: function () {
        var deferred = $q.defer();
        var userInfo = {
          username: localStorageService.get('username'),
          token: localStorageService.get('token')
        };

        $http.post(ENV.DEV + '/auth/is-authorized', userInfo)
          .then(function success (response) {
            deferred.resolve(response);
          }, function err (response) {
            deferred.reject(response);
            localStorageService.set('token', null);

          });
          return deferred.promise;
      },
      getUserName: function () {
        return localStorageService.get('username');
      }
    };
  });
