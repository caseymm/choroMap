//var data; // loaded asynchronously
window.onload=function(){
    hope();
}


function hope() {


var width = 450;
var height = 600;

var projection = d3.geo.albers()
                     //.center([-84.36322, 32.397649]);
                   .translate([-860,-130])
                   .scale([5000]);

var path = d3.geo.path()
             .projection(projection);

var svg = d3.select("#chart")
  .append("svg:svg");

var counties = svg.append("svg:g")
    .attr("id", "counties")
    .attr("class", "hope");
    
var newDict = {};
var newName = {};


d3.json("data/myData/lotteryMapNum.json", function(data) {
    data.forEach(function(d) { newDict[d.id] = +d.hopeDollars;})
    data.forEach(function(d) { newDict[d.COUNTY] = +d.COUNTY;});
    
});

d3.json("data/myData/simpleGA.json", function(json) {
   counties.selectAll("path")
  .data(json.features)
  .enter().append("svg:path")
  .attr("class", function(d) { return quantize(newDict[d.id]);})
  .attr("d", path)
  .call(d3.helper.tooltip()
                //.attr({class: function(d, i) { return d + ' ' +  i + ' A'; }})
                .text(function(d){ return 'value: '+newDict[d.id]+newDict[d.COUNTY]; })
            )
            .on('mouseover', function(d){ d3.select(this).style({fill: 'green', stroke: 'red'}); })
            .on('mouseout', function(d){ d3.select(this).style({fill: '', stroke: ''}); });

});
var quantize = d3.scale.quantize()
  //.domain([611850, 627698760])
  .domain([0, 700000000])
  .range(d3.range(11).map(function(i) { return "q" + i + "-11"; }));
  
  
  };
  
