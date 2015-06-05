var data, csvData,svg2, g1,gData;
loadData();

var padding = {top: 100, right: 200, bottom: 0, left: 120},
    width = 960 - padding.left - padding.right,
    height = 500 - padding.top - padding.bottom;


var x2 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y2 = d3.scale.linear()
    .range([height, 0]);

var xAxis2 = d3.svg.axis()
    .scale(x2)
    .orient("bottom");

var yAxis2 = d3.svg.axis()
    .scale(y2)
    .orient("left")
    ;
    //.tickFormat(formatPercent);

var tip2 = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Frequency:</strong> <span style='color:red'>" + d.values['Cost'] + "</span>";
  })

 svg2 = d3.select("#j3").append("svg")
    .attr("width", width + padding.left + padding.right)
    .attr("height", height + padding.top + padding.bottom)
  .append("g")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")");


svg2.call(tip2);

function drawData(d) {
  var data = JSON.parse(JSON.stringify(d));
  // console.log(local_data.map(function (d){return d.values;}));

  x2.domain(data.map(function(d) { return d.key; }));

  y2.domain([0, d3.max(data, function (c){return c.values['Cost']})]);

  svg2.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis2)
      .append("text")
      .text("Year");

  svg2.append("g")
      .attr("class", "y axis")
      .call(yAxis2)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("LifeCycle Cost");
  //var dataplot = data.map(function (d){return d.values;});
  //console.log(dataplot);


  svg2.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function (d) { return x2(d.key); })
      .attr("width", x2.rangeBand())
      .attr("y",  function (d){
        return y2(d.values['Cost']);
      })
      .attr("height", function(d) { return height - y2(d.values['Cost']); })
      .on('mouseover', tip2.show)
      .on('mouseout', tip2.hide);

}


function loadData(){

   data = new Array();
   d3.csv("./data/proj1.csv", process);
}
function process(c) {
    csvData = c;
    gData = c;

    for (var i = 0; i < csvData.length; i++) {
        var e = csvData[i];

            data.push(e);
    }

    var local_data = d3.nest()
        .key(function (c) {
            return c["start"];
        })
        .rollup(function (leaves) {
            return {
                "Cost": d3.sum(leaves, function (d) {
                    return parseFloat(d["cost"]);
                }),
                "planned":d3.sum(leaves, function (d){
                    return parseFloat(d["planned"]);

                }),
                "actual": d3.sum(leaves, function (d) {
                    return parseFloat(d["actual"]);
                })
                
            }
        })
        .entries(data);

    console.log(local_data);
    
    drawData(local_data);

}


