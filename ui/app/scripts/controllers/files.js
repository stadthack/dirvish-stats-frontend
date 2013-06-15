'use strict';

angular.module('dirvishStatsApp')
  .controller('FilesCtrl', function($scope, $routeParams, $http) {
    var hostId = $routeParams.hostId;
    var imageId = $routeParams.imageId;
    var size = $scope.size = 10;
    $http.get("http://fs1.phimobile.com:8000/top?hostname=" + hostId + "&image=" + imageId + "&size=100").success(function(data) {
      $scope.files = data.files;
    });
  });
