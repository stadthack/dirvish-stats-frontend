'use strict';

angular.module('dirvishStatsApp')
  .controller('MainCtrl', function($scope, $routeParams, $http) {
    $scope.$routeParams = $routeParams;
    $scope.hosts = [];
    $http({method: "GET", url: "hosts.json"}).success(function(data) {
      $scope.hosts = data.hosts;
    });
  })
  .controller('HostsNavCtrl', function($scope) {
  })
  .controller('ImagesCtrl', function($scope, $routeParams, $http) {
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

    $scope.trendImages = []
    $http({method: "GET", url: "trends.json"}).success(function(data) {
      $scope.trendImages = data.images;
    });

    //
    // D3
    //

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var formatPercent = d3.format(".0%");

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(formatPercent);

    var svg = d3.select("#trend-images-graph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    $scope.$watch("trendImages", function(data) {
      data.forEach(function(d) {
        d.sum = +d.sum;
      });

      x.domain(data.map(function(d, i) { return i; }));
      y.domain([0, d3.max(data, function(d) { return d.sum; })]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("sum");

      svg.selectAll(".bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.time); })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.sum); })
          .attr("height", function(d) { return height - y(d.sum); });
    });
  });
