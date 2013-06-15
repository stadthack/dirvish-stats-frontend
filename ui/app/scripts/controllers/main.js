'use strict';

angular.module('dirvishStatsApp')
  .controller('MainCtrl', function($scope, $state, $routeParams, $http) {
    $scope.$routeParams = $routeParams;
    $scope.$state = $state;
    $scope.hosts = [];
    $http.get(API_SERVER + "/hosts").success(function(data) {
      $scope.hosts = data.hosts;
    });
  })
