'use strict';

angular.module('dirvishStatsApp')
  .controller('MainCtrl', function($scope, $routeParams, $http) {
    $scope.$routeParams = $routeParams;
    $scope.hosts = [];
    $http.get("http://fs1.phimobile.com:8000/hosts").success(function(data) {
      $scope.hosts = data.hosts;
    });
  })
