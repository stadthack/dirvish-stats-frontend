'use strict';

angular.module('dirvishStatsApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/images.html',
        controller: 'ImagesCtrl'
      })
      .when('/hosts/:hostId/images', {
        templateUrl: 'views/images.html',
        controller: 'ImagesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
