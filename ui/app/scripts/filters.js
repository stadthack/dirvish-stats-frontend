'use strict';

angular.module('dirvishStatsApp')
  .filter('humanReadableBytes', function() {
    return function(bytes) {
      if (bytes == 0) {
        return "0 bytes";
      }
      var s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
      var e = Math.floor(Math.log(bytes) / Math.log(1024));
      return (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + " " + s[e];
    }
  });