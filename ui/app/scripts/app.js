'use strict';

angular.module('dirvishStatsApp', ['ui.state'])
  .config(function($stateProvider) {
    $stateProvider
    .state('index', {
      url: '',
      templateUrl: 'views/images.html'
    })
    .state('images', {
      url: '/hosts/:hostId/images',
      templateUrl: 'views/images.html'
    })
    .state('images.detail', {
      url: '/:imageId',
      views: {
        'imagesDetail': {
          templateUrl: 'views/files.html'
        }
      }
    })
  })
  .config(function($httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = '';
  });
