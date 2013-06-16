'use strict';

angular.module('dirvishStatsApp')
  .controller('FilesCtrl', function($scope, $state, $http) {
    var hostId = $state.params.hostId;
    var imageId = $state.params.imageId;
    var size = $scope.size = 10;

    if($scope.trendImages && imageId) {
      $scope.trendImages.forEach(function(image) {
        if(imageId == image.id) {
          return $scope.currentImage = image;
        }
      })
    }

    $http.get(API_SERVER + "/top?hostname=" + hostId + "&image=" + imageId + "&size=100").success(function(data) {
      $scope.files = data.files;
    });

    $http.get(API_SERVER + "/details?hostname=" + hostId + "&image=" + imageId).success(function(data) {
      $scope.treeData = data;
    });

  });
