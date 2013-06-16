'use strict';

angular.module('dirvishStatsApp')
  .directive('barChart', function($state, $filter) {
    return {
      link: function(scope, el, attr) {
        var margin = {top: 20, right: 20, bottom: 80, left: 80},
            width = 720 - margin.left - margin.right,
            height = 260 - margin.top - margin.bottom;

        var isValidDate = function(d) {
          if ( Object.prototype.toString.call(d) !== "[object Date]" )
            return false;
          return !isNaN(d.getTime());
        }

        var formatDate = function(date) {
          var d;
          try {
            d = new Date(date);
            // Firefox 22 crashes on (new Date(date))
          } catch(e) {}
          if (isValidDate(d)) {
            return d.toLocaleDateString();
          } else {
            return date.substring(0, 10);
          }
        };

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom")
            .tickFormat(formatDate);

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat($filter('humanReadableBytes'));

        var svg = d3.select(el[0]).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var onBarClick = function(image) {
          // TODO: Move somewhere else. This does not support deep-linking.
          svg.selectAll(".bar")
            .classed("active", function(d) { return d.id == image.id })

          location.hash = '#/hosts/'+$state.params.hostId+'/images/'+image.id
        };

      scope.$watch(attr.barChart, function(data) {

          x.domain(data.map(function(d) { return d.time; }));
          y.domain([0, d3.max(data, function(d) { return d.sum; })]);

          svg.append("g")
              .attr("class", "x axis")
              .attr("transform", "translate(0," + height + ")")
              .call(xAxis)
              .selectAll('text')
              .attr("transform", " translate(-33, 26) rotate(-45)");

          svg.append("g")
              .attr("class", "y axis")
              .call(yAxis)

          svg.selectAll(".bar")
              .data(data)
              .enter().append("rect")
              .classed("bar", true)
              .attr("x", function(d) { return x(d.time); })
              .attr("width", x.rangeBand())
              .attr("y", function(d) { return y(d.sum); })
              .attr("height", function(d) { return height - y(d.sum); })
              .on("click", onBarClick);
        });
      }
    };
  });
