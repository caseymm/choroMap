//var data; // loaded asynchronously
window.onload=function(){
    hope();
}


function hope() {


var width = 450;
var height = 600;
//var active;

var projection = d3.geo.albersUsa()
                     //.center([-84.36322, 32.397649]);
                   .scale(5000)
                   .translate([-875,-180]);
                   

var path = d3.geo.path()
             .projection(projection);

var svg = d3.select("#chart").append("svg")
    .attr("width", width)
    .attr("height", height);

/*svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .on("click", reset);*/

var counties = svg.append("g")
    .attr("id", "counties")
    .attr("class", "hope");
    
var newDict = {};
var commasFormatter = d3.format(",.0f");

d3.json("data/myData/rankedData.json", function(data) {
    data.forEach(function(d) { newDict[d.id] = [d.COUNTY, d.hopeDollars, d.hopeRank, d.hopeStudents, d.hopeStudentRank, d.sales, d.salesRank];});

    d3.json("data/myData/simpleGA.json", function(json) {
        counties.selectAll("path")
        //.data(topojson.feature(json, json.features).features)
        .data(json.features)
        .enter().append("path")
        .attr("class", function(d) { return quantize(newDict[d.id][1]);})
        .attr("d", path)
        .call(d3.helper.tooltip()
            //.attr({class: function(d, i) { return d + ' ' +  i + ' A'; }})
            .text(function(d){ return 'County: '+ newDict[d.id][0] + '<br />HOPE Dollars: $' +commasFormatter(newDict[d.id][1]); })
        )
        .on('mouseover', function(d){ d3.select(this).style({fill: '#FAAE0A', stroke: '#F08C00', opacity:'0.5', 'stroke-width':'3px'}); })
        .on('mouseout', function(d){ d3.select(this).style({fill: '', stroke: '', opacity:'1', 'stroke-width':''}); })
        .on("click", function(d) {
            $('#hopeCounty').html(''+ newDict[d.id][0] +'')
            $('#hopeInfo').html('$'+commasFormatter(newDict[d.id][1])+'')
            $('#hopeInfoRank').html(''+newDict[d.id][2]+'')
            $('#hopeStudentInfo').html(''+commasFormatter(newDict[d.id][3])+'')
            $('#hopeStudentInfoRank').html(''+newDict[d.id][4]+'')
            $('#lotteryInfo').html('$'+commasFormatter(newDict[d.id][5]+''))
            $('#lotteryInfoRank').html(''+newDict[d.id][6]+'')
            });
        /*.on("click", function(d) {
            $('#chartInfo').append(''+ newDict[d.id][1] + newDict[d.id][0]+'')});*/

    /*counties.append("path")
      .datum(topojson.mesh(json, json.features, function(a, b) { return a !== b; }))
      .attr("class", "mesh")
      .attr("d", path);
    var baseWidth = 500;
    var scaleFactor = 4;*/

//This does zoom but is a bit off    
/*d3.selectAll('#counties path')
    .on('click', function(d) {
        // getBBox() is a native SVG element method
        var bbox = this.getBBox(),
            centroid = [bbox.x + bbox.width/2, bbox.y + bbox.height/2],
            zoomScaleFactor = baseWidth / bbox.width,
            zoomX = -centroid[0],
            zoomY = -centroid[1];

        // set a transform on the parent group element
        d3.select('#counties')
            .attr("transform", "scale(" + scaleFactor + ")" +
                "translate(" + zoomX + "," + zoomY + ")");
    });*/

    //End of working section
    });

});
var quantize = d3.scale.quantize()
  //.domain([611850, 627698760])
  .domain([600000, 700000000])
  .range(d3.range(23).map(function(i) { return "q" + i + "-20"; }));
 
/*function click(d) {
  if (active === d) return reset();
  counties.selectAll(".active").classed("active", false);
  d3.select(this).classed("active", active = d);

  var b = path.bounds(d);
  counties.transition().duration(750).attr("transform",
      "translate(" + projection.translate() + ")"
      + "scale(" + .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height) + ")"
      + "translate(" + -(b[1][0] + b[0][0]) / 2 + "," + -(b[1][1] + b[0][1]) / 2 + ")");
}

function reset() {
  counties.selectAll(".active").classed("active", active = false);
  counties.transition().duration(750).attr("transform", "");
}  */
  
  
  };
  
