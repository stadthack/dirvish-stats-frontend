'use strict';

angular.module('dirvishStatsApp')
  .controller('MainCtrl', function($scope, $routeParams, $http) {
    $scope.$routeParams = $routeParams;
    $scope.hosts = [];
    $http.get("/hosts").success(function(data) {
      $scope.hosts = data.hosts;
    });
  })
