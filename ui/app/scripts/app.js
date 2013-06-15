'use strict';

angular.module('dirvishStatsApp', [])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/images.html',
        controller: 'ImagesCtrl'
      })
      .when('/hosts/:hostId/images', {
        templateUrl: 'views/images.html',
        controller: 'ImagesCtrl'
      })
      .when('/hosts/:hostId/files/:imageId', {
        templateUrl: 'views/files.html',
        controller: 'FilesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function($httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = "";
  });
