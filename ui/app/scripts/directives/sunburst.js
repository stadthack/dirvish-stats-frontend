'use strict';

angular.module('dirvishStatsApp')
  .directive('sunburst', function($state) {
    return {
      link: function(scope, el, attr) {
        scope.$watch(attr.data, function(data) {
          if(data) {
            buildSunburst(el, data);
          }
        });
      }
    };
  });

function buildSunburst(el, data) {
  // var data = [data];

// Based on:
// Coffee Flavour Wheel by Jason Davies,
// http://www.jasondavies.com/coffee-wheel/
// License: http://www.jasondavies.com/coffee-wheel/LICENSE.txt
var width = 800,
    height = width,
    radius = width / 2,
    x = d3.scale.linear().range([0, 2 * Math.PI]),
    y = d3.scale.pow().exponent(1.3).domain([0, 1]).range([0, radius]),
    padding = 0,
    duration = 1000;

var div = d3.select(el[0]);

div.select("img").remove();

var vis = div.append("svg")
    .attr("width", width + padding * 2)
    .attr("height", height + padding * 2)
    .append("g")
    .attr("transform", "translate(" + [radius + padding, radius + padding] + ")");

// div.append("p")
//     .text("Click to zoom!");

var tooltip = div
  .append("div")
  .attr("class", "sunburst-tooltip")
  .style("position", "absolute")
  .style("z-index", "10")
  .style("visibility", "hidden");

tooltip.path = tooltip.append("div")
tooltip.size = tooltip.append("div")


  vis
  .on("mouseover", function(){return tooltip.style("visibility", "visible");})
  .on("mousemove", function(){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
  .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

var partition = d3.layout.partition()
    .sort(null)
    .value(function(d) { return 5.8 - d.depth; })
    .children(function(d) { return d.childs; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, d.y ? y(d.y) : d.y); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

(function(json) {
  var nodes = partition.nodes(json);

  var path = vis.selectAll("path").data(nodes);
  path.enter().append("path")
    .attr("class", "sunburst-segment")
    .attr("id", function(d, i) { return "path-" + i; })
    .attr("d", arc)
    .attr("fill-rule", "evenodd")
    .style("fill", colour)
    .on("click", click)
    .on("mouseover", function(d){ tooltip.path.text(d.path); tooltip.size.text(App.helpers.humanReadableFileSize(d.size)); });

  function click(d) {
    path.transition()
      .duration(duration)
      .attrTween("d", arcTween(d));
  }
})(data);

function isParentOf(p, c) {
  if (p === c) return true;
  if (p.children) {
    return p.children.some(function(d) {
      return isParentOf(d, c);
    });
  }
  return false;
}

function colour(d) {
  if (d.children) {
    // There is a maximum of two children!
    var colours = d.children.map(colour),
        a = d3.hsl(colours[0]),
        b = d3.hsl(colours[1]);
    // L*a*b* might be better here...
    return d3.hsl((a.h + b.h) / 2, a.s * 1.2, a.l / 1.2);
  }
  return "#ff84ff"; // Was: d.colour || "#666"
}

// Interpolate the scales!
function arcTween(d) {
  var my = maxY(d),
      xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, my]),
      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
  return function(d) {
    return function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
  };
}

function maxY(d) {
  return d.children ? Math.max.apply(Math, d.children.map(maxY)) : d.y + d.dy;
}

// http://www.w3.org/WAI/ER/WD-AERT/#color-contrast
function brightness(rgb) {
  return rgb.r * .299 + rgb.g * .587 + rgb.b * .114;
}

}
