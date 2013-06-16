'use strict';

angular.module('dirvishStatsApp')
  .controller('FilesCtrl', function($scope, $state, $http) {
    var hostId = $state.params.hostId;
    var imageId = $state.params.imageId;
    var size = $scope.size = 10;

    $http.get(API_SERVER + "/top?hostname=" + hostId + "&image=" + imageId + "&size=100").success(function(data) {
      $scope.files = data.files;
    });
  });
