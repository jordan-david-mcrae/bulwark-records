'use strict';

/**
 * @ngdoc service
 * @name bulwarkApp.blogService
 * @description
 * # blogService
 * Factory in the bulwarkApp.
 */
angular.module('bulwarkApp')
  .factory('blogService', function($http, $q, user, $location, ENV) {
    // Service logic
    // ...

    var blogs = '';

    // Public API here
    return {
      blogList: function() {
        return blogs;
      },
      getBlogs: function() {
        var deferred = $q.defer();

        // $timeout(function() {
          // $http.get('http://159.203.25.157:5002/blogs/')
            // .then(function success(response) {
            //   blogs = response.data;
            //   console.log('RESPONSE: ', response);
            //   deferred.resolve(response.data);
            // }, function error(err) {
            //   deferred.reject(err);
            // });
        // }, 2000)

        $http.get(ENV.DEV + '/blogs/')
          .then(function success (response) {
            deferred.resolve(response.data);
          }, function err (response) {
            deferred.reject(response);
          });
        return deferred.promise;
      },
      sendBlog: function(blog) {
        var deferred = $q.defer();
        console.log('Sending blog... ', blog);
        user.checkToken()
          .then(function (response) {
            if (response.data.tokenFound) {
              $http.post(ENV.DEV + '/blogs/new/', blog)
                .then(function success(response) {
                  deferred.resolve(response);
                }, function error(err) {
                  deferred.reject(err);
                });
            } else {
              user.logout();
              $location.path('/main/');
            }
          }, function err(error) {
            deferred.resolve(error);
        });

          return deferred.promise;
      },
      deleteBlog: function(blog) {
          var deferred = $q.defer();

          user.checkToken()
            .then(function (response) {
              console.log('Token response: ', response.data.tokenFound);
              if (response.data.tokenFound) {
                $http.post(ENV.DEV + '/blogs/delete/', blog)
                  .then(function success(response) {
                    console.log('IN HERE');
                    console.log('DELETION Success: ', response);
                    deferred.resolve(response);
                    blogs = response.data.blogs;
                  }, function error(err) {
                    console.log('Error: ', err);
                    deferred.reject(err);
                  });
              } else {
                deferred.reject(response);
              }
              return deferred.promise;
            });
        }
      };
  });