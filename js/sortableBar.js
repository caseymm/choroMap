var margin = {top: 20, right: 0, bottom: 30, left: 0},
    width = 490,
    height = 350 - margin.top - margin.bottom;

var chart = $("#inGraph"),
    aspect = chart.width() / chart.height(),
    graph = chart.parent();
$(window).on("resize", function() {
    var targetWidth = graph.width();
    chart.attr("width", targetWidth);
    chart.attr("height", Math.round(targetWidth / aspect));
}).trigger("resize");

var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1, 1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

var svg = d3.select("#graph").append("svg")
    .attr("id", "#inGraph")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("data/myData/rankedData.json", function(error, data) {

  data.forEach(function(d) { newDict[d.id] = [d.COUNTY, d.hopeDollars, d.hopeRank, d.hopeStudents, d.hopeStudentRank, d.sales, d.salesRank];});

  x.domain(data.map(function(d) { return newDict[d.id][0]; }));
  y.domain([0, d3.max(data, function(d) { return newDict[d.id][1]; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  /*svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");*/

  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(newDict[d.id][0]); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(newDict[d.id][1]); })
      .attr("height", function(d) { return height - y(newDict[d.id][1]); });

 /* d3.select("input").on("change", change);

  var sortTimeout = setTimeout(function() {
    d3.select("input").property("checked", true).each(change);
  }, 2000);

  function change() {
    clearTimeout(sortTimeout);

    // Copy-on-write since tweens are evaluated after a delay.
    var x0 = x.domain(data.sort(this.checked
        ? function(a, b) { return b.frequency - a.frequency; }
        : function(a, b) { return d3.ascending(a.letter, b.letter); })
        .map(function(d) { return d.letter; }))
        .copy();

    var transition = svg.transition().duration(750),
        delay = function(d, i) { return i * 50; };

    transition.selectAll(".bar")
        .delay(delay)
        .attr("x", function(d) { return x0(d.letter); });

    transition.select(".x.axis")
        .call(xAxis)
      .selectAll("g")
        .delay(delay);
  }*/
});
