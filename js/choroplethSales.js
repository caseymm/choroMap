//var data; // loaded asynchronously


var width = 450;
var height = 600;

var projection = d3.geo.albers()
                     //.center([-84.36322, 32.397649]);
                   .translate([-860,-130])
                   .scale([5000]);

var path = d3.geo.path()
             .projection(projection);

var svg = d3.select("#chart2")
  .append("svg:svg");

var counties = svg.append("svg:g")
    .attr("id", "counties")
    .attr("class", "Reds");
    
var newDict = {};

d3.json("data/myData/lotteryMapNum.json", function(data) {
    data.forEach(function(d) { newDict[d.id] = +d.sales; }); 
});

d3.json("data/myData/simpleGA.json", function(json) {
   counties.selectAll("path")
  .data(json.features)
  .enter().append("svg:path")
  .attr("class", function(d) { return quantize(newDict[d.id]); })
  .attr("d", path);
});


var quantize = d3.scale.quantize()
  //.domain([611850, 627698760])
  .domain([0, 5500000000])
  .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));
