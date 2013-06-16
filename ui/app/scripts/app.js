'use strict';

// TODO: Where to put this?
this.App = {}
App.helpers = {
  humanReadableFileSize: function(bytes) {
    if (bytes == 0) {
      return "0 bytes";
    }
    var s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
    var e = Math.floor(Math.log(bytes) / Math.log(1024));
    return (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + " " + s[e];
  }
}

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
