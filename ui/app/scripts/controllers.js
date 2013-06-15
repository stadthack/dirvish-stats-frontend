'use strict';

var hosts = [
  {name: "Host-A", images: [{name: "2013-01-01"}, {name: "2013-02-01"}, {name: "2013-03-01"}]},
  {name: "Host-B", images: [{name: "2012-01-01"}, {name: "2012-02-01"}, {name: "2012-03-01"}]},
  {name: "Host-C", images: [{name: "2011-01-01"}, {name: "2011-02-01"}, {name: "2011-03-01"}]}
]

angular.module('dirvishStatsApp')
  .controller('MainCtrl', function($scope) {
  })
  .controller('HostsNavCtrl', function($scope) {
    $scope.hosts = hosts;
  })
  .controller('ImagesCtrl', function($scope, $routeParams) {
    var hostId = $routeParams.hostId;
    $scope.hosts = hosts;
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
