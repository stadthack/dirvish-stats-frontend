'use strict';

angular.module('dirvishStatsApp', ['ui.state'])
  .config(function($stateProvider) {
    $stateProvider
      .state('index', {
        url: '',
        views: {
          'main': {
            templateUrl: 'views/images.html'
          }
        }
      })
      .state('images', {
        url: '/hosts/:hostId/images',
        views: {
          'main': {
            templateUrl: 'views/images.html'
          }
        }
      })
      .state('images.detail', {
        url: '/:imageId',
        views: {
          'imagesDetail': {
            templateUrl: 'views/files.html'
          }
        }
      });
  })
  .config(function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = '';
  });
