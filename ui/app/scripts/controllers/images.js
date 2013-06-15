'use strict';

angular.module('dirvishStatsApp')
  .controller('ImagesCtrl', function($scope, $routeParams, $http, barChart) {
    var hostId = $routeParams.hostId;

    var findHost = function(hosts, hostId) {
      if (!hosts.length || hostId == null) {
        return;
      };

      for (var i = 0; i < hosts.length; i++) {
        var host = $scope.hosts[i];
        if (host.name == hostId) {
          return host;
        }
      };
    };

    $scope.trendImages = [];
    $http.get("/trends?hostname=" + hostId).success(function(data) {
      $scope.trendImages = data.images;
    });

    $scope.$watch('hosts', function() {
      $scope.host = findHost($scope.hosts, hostId);
      $scope.images = $scope.host ? $scope.host.images : [];
    });

    barChart.draw($scope, $routeParams, "#trend-images-graph");
  })
