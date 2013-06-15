'use strict';

angular.module('dirvishStatsApp')
  .controller('MainCtrl', function($scope, $http) {
    $scope.hosts = [];
    $http({method: "GET", url: "hosts.json"}).success(function(data) {
      $scope.hosts = data.hosts;
    });
  })
  .controller('HostsNavCtrl', function($scope) {
  })
  .controller('ImagesCtrl', function($scope, $routeParams) {
    var hostId = $routeParams.hostId;
    if (hostId) {
      for (var i = 0; i < $scope.hosts.length; i++) {
        var host = $scope.hosts[i];
        if (host.name == hostId) {
          $scope.images = host.images;
          break;
        }
      };
    }
  });
