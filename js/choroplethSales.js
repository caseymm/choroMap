var width = 450;
var height = 600;
//var active;

var projection = d3.geo.mercator()
                     //.center([-84.36322, 32.397649]);
                   .scale(25000)
                   .translate([5950,2600]);
                   

var path = d3.geo.path()
             .projection(projection);

var svg = d3.select("#chart2").append("svg")
    .attr("width", width)
    .attr("height", height);

var counties = svg.append("g")
    .attr("id", "counties")
    .attr("class", "sales");
    
var newDict = {};
var commasFormatter = d3.format(",.0f");

d3.json("data/myData/rankedData.json", function(data) {
    data.forEach(function(d) { newDict[d.id] = [d.COUNTY, d.hopeDollars, d.hopeRank, d.hopeStudents, d.hopeStudentRank, d.sales, d.salesRank, d.id];});

    d3.json("data/myData/simpleGA.json", function(json) {
        counties.selectAll("path")
        //.data(topojson.feature(json, json.features).features)
        .data(json.features)
        .enter().append("path")
        .attr("id", function(d) { return (newDict[d.id][7]);})
        .attr("class", function(d) { return quantize(newDict[d.id][5]);})
        .attr("d", path)
        .call(d3.helper.tooltip()
            //.attr({class: function(d, i) { return d + ' ' +  i + ' A'; }})
            .text(function(d){ return 'County: '+ newDict[d.id][0] + '<br />Lottery Ticket Sales: $' +commasFormatter(newDict[d.id][5]); })
        )
        .on('mouseover', function(d){ d3.select(this).style({fill: '#0FDB42', stroke: '#0FDB42', opacity:'0.5', 'stroke-width':'3px'}); })
        .on('mouseout', function(d){ d3.select(this).style({fill: '', stroke: '', opacity:'1', 'stroke-width':''}); })
        .on("click", function(d) {
            $('#hopeCountyB').html(''+ newDict[d.id][0])
            $('#hopeInfoB').html('$'+commasFormatter(newDict[d.id][1])+'')
            $('#hopeInfoRankB').html(''+newDict[d.id][2]+'')
            $('#hopeStudentInfoB').html(''+commasFormatter(newDict[d.id][3])+'')
            $('#hopeStudentInfoRankB').html(''+newDict[d.id][4]+'')
            $('#lotteryInfoB').html('$'+commasFormatter(newDict[d.id][5]+''))
            $('#lotteryInfoRankB').html(''+newDict[d.id][6]+'')
            d3.select(this).style({fill: '#0A800A', stroke: '', opacity:'1', 'stroke-width':''});
            //$('#'+newDict[d.id][7]).toggleClass('.clicker')
            });

    });

});
var quantize = d3.scale.quantize()
  //.domain([611850, 627698760])
  .domain([5500000, 5500000000])
  .range(d3.range(23).map(function(i) { return "q" + i + "-20"; }));
 

  
  

  

