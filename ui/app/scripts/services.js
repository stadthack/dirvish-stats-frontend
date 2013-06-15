'use strict';

angular.module('dirvishStatsApp')
  .service('barChart', function() {
    this.draw = function($scope, $routeParams, container) {
      var margin = {top: 20, right: 20, bottom: 80, left: 80},
          width = 720 - margin.left - margin.right,
          height = 320 - margin.top - margin.bottom;

      var formatHumanReadable = function(bytes) {
        if (bytes == 0) {
          return "0 bytes";
        }
        var s = ['bytes', 'kB', 'MB', 'GB', 'TB', 'PB'];
        var e = Math.floor(Math.log(bytes) / Math.log(1024));
        return (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + " " + s[e];
      };

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
          .tickFormat(formatHumanReadable);

      var svg = d3.select(container).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      $scope.$watch("trendImages", function(data) {
        var onBarClick = function(image) {
          location.hash = '#/hosts/' + $routeParams.hostId + '/files/' + image.id
        };

        x.domain(data.map(function(d) { return (new Date(d.time)).toLocaleDateString(); }));
        y.domain([0, d3.max(data, function(d) { return d.sum; })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll('text')
            .attr("transform", " translate(-13, 40) rotate(-90)");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        svg.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.time); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.sum); })
            .attr("height", function(d) { return height - y(d.sum); })
            .on("click", onBarClick);
      });
    }
  });