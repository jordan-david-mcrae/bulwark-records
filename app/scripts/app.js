'use strict';

/**
 * @ngdoc overview
 * @name bulwarkApp
 * @description
 * # bulwarkApp
 *
 * Main module of the application.
 */
angular
  .module('bulwarkApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'sticky',
    'gilbox.sparkScroll',
    'btford.socket-io',
    'ui.bootstrap',
    'textAngular',
    'angularFileUpload'

  ])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/landing.html',
        controller: 'LandingCtrl',
        controllerAs: 'landing'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/label', {
        templateUrl: 'views/label.html',
        controller: 'LabelCtrl',
        controllerAs: 'label'
      })
      .when('/artists', {
        templateUrl: 'views/artists.html',
        controller: 'ArtistsCtrl',
        controllerAs: 'artists'
      })
      .when('/artists/:id', {
        templateUrl: 'views/artist.html',
        controller: 'ArtistCtrl',
        controllerAs: 'artist'
      })
      .when('/prospective-contact', {
        templateUrl: 'views/prospective-contact.html',
        controller: 'ProspectiveContactCtrl',
        controllerAs: 'prospectiveContact'
      })
      .when('/contact-general', {
        templateUrl: 'views/contact-general.html',
        controller: 'ContactGeneralCtrl',
        controllerAs: 'contactGeneral'
      })
      .when('/general-contact', {
        templateUrl: 'views/general-contact.html',
        controller: 'GeneralContactCtrl',
        controllerAs: 'generalContact'
      })
      .when('/new-blog', {
        templateUrl: 'views/new-blog.html',
        controller: 'NewBlogCtrl',
        controllerAs: 'newBlog'
      })
      .when('/adminlogin', {
        templateUrl: 'views/adminlogin.html',
        controller: 'AdminloginCtrl',
        controllerAs: 'adminlogin'
      })
      .when('/media', {
        templateUrl: 'views/media.html',
        controller: 'MediaCtrl',
        controllerAs: 'media'
      })
      .when('/image-manager', {
        templateUrl: 'views/image-manager.html',
        controller: 'ImageManagerCtrl',
        controllerAs: 'imageManager'
      })
      .when('/general-admin', {
        templateUrl: 'views/general-admin.html',
        controller: 'GeneralAdminCtrl',
        controllerAs: 'generalAdmin'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true).hashPrefix('!');
  })
  .run( function($rootScope, $location) {
    // register listener to watch route changes
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        // Temporary while site is under construction
        $location.path('/');        
      });         
    })
  .config(function($httpProvider) {
    $httpProvider.defaults.headers.common.Accept = 'application/json';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
    $httpProvider.defaults.withCredentials = false;
  });
