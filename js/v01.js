

//var idwidth =document.getElementById("j4").style.width;
//console.log(idwidth);
var idwidth;
$(document).ready(function(){
	 idwidth = $("div #j4").width();
	 idwidth2 = $("div #j3").width();
var margin = {top: idwidth*0.15, right:idwidth*0.02, bottom: idwidth*0.15, left: idwidth*0.08};

var width1 = idwidth - margin.left - margin.right,
    height1 = idwidth*0.7 - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width1]);

var y = d3.scale.linear()
    .range([height1, 80]);

var color = d3.scale.category20();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .tickFormat(d3.format('.1f'))
    .orient("left");
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<b>"+d.name+"</b></br></br><strong>The Actual Cost in </strong> <span>" + d.start + "is about"+d.actual+
    			"</br></br>on project"+d.title+"</span>";
  })
//drawBar();

var svg = d3.select("#j4").append("svg")
    .attr("width", width1 + margin.left + margin.right)
    .attr("height", height1 + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.call(tip);
d3.csv("./data/proj1.csv", drawScatter);

function drawScatter (d){
	data = d;

  data.forEach(function(d) {
    d.planned = +d.planned;
    d.actual = +d.actual;
  });

  //svg.call(tip);

   x.domain([0,d3.max(data, function(d) { return d.planned; })]);
   y.domain([0,d3.max(data, function(d) { return d.actual; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height1 + ")")
      .call(xAxis)
    .append("text")
      .attr("class", "label")
      .attr("x", width1)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Planned Cost");

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("class", "label")
      .attr("transform", "rotate(-90)")
      .attr("x",-100)
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Actual Cost")

  svg.selectAll(".dot")
      .data(data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", function(d) { return x(d.planned); })
      .attr("cy", function(d) { return y(d.actual); })
      .attr("r",10)
      .style("fill", function(d) { return color(d.name); })
      .on("mouseover",tip.show)
      .on("mouseout",tip.hide);




  var legend = svg.selectAll(".legend")
      .data(color.domain())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(" +(235*parseInt(i/7)-width1+100)+"," +-(i-(parseInt(i/7))*7)*20 + ")"; });

  legend.append("rect")
  		.attr("id","legend-rect")
		.attr("x", width1 - 18)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", color)
		//.style("opacity", .5)
		.on("click",ClickLegend);
		// .on("mouseover",function(d){
		// 	d3.select(this).style('opacity',1)
		// });
      // .on("click",function () {
      //   svg.selectAll(".dot")
      //     .remove()

      // });

  legend.append("text")
      .attr("x", width1 - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .attr("id","mux")
      .style("font-size","0.7em")
      .style("text-anchor", "end")
      .text(function(d) { return d; })
      

}

function ClickLegend (d)
{
  var nData = data.filter(function (c){
          console.log(d);
          return c.name == d;
        });
  console.log(nData);
  
  UpdateBar(nData);
  UpdateScatter(nData);
}



function UpdateScatter (d)
{
	var dataplot = d;

  

  dataplot.forEach(function(d) {
    d.planned = +d.planned;
    d.actual = +d.actual;
  });
      
      x.domain([0,d3.max(dataplot, function(d) { return d.planned; })]);
      y.domain([0,d3.max(dataplot, function(d) { return d.actual; })]);

        
      svg.selectAll(".dot").remove();
        svg.selectAll(".dot")
      .data(dataplot)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("cx", function(d) { return x(d.planned); })
      .attr("cy", function(d) { return y(d.actual); })
      .on("mouseover",tip.show)
      .on("mouseout",tip.hide)
      .attr("r",10)
      .style("fill", function(d) { return color(d.name); });



      

      svg.select(".y.axis")
        .transition()
        .duration(1000)
        .call(yAxis);

      svg.select(".x.axis")
        .transition()
        .duration(1000)
        .call(xAxis);

}



  var csvData,ncsvData,svg2, g1,gData,gUpdate;
loadData();

var padding = {top: idwidth2*0.1, right: idwidth2*0.1, bottom: idwidth2*0.08, left: idwidth2*0.1},
    width = idwidth2 - padding.left - padding.right,
    height = idwidth2*0.5 - padding.top - padding.bottom;

var format = d3.format(".0%");


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
  .style("opacity",0.5)
  .html(function(d) {
    return "<strong>The Total lifecycle in:</strong> <span>" + d.key + "</br></br></br>"+"<strong>is about:  </strong>"+d.values['Cost']+"</span>"
    		;
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
      .attr("x",width)
      .style("text-anchor", "end")
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
      .on('mouseover', tip2.show)
      .on('mouseout', tip2.hide)
      .on('click',youqingkuang1)
      .attr("fill","teal")
      .attr("height",height-y2(10))
      .transition()
      .duration(1000)
      .attr("x", function (d) { return x2(d.key); })
      .attr("width", x2.rangeBand())
      .attr("y",  function (d){
        return y2(d.values['Cost']);
      })
      .attr("height", function(d) { return height - y2(d.values['Cost']); });
      
      

}




function youqingkuang1 (d)
{
  console.log(d);
  console.log(gData);
  console.log(d.key);
  var nData = gData.filter(function (c){
    return c.start == d.key;
  })
  UpdateScatter(nData);
}

function youqingkuang2 (d)
{
  console.log(d);
  console.log(gData);
  console.log(d.key);
  var nData = ncsvData.filter(function (c){
    return c.start == d.key;
  })
  UpdateScatter(nData);
}


function loadData(){

   data = new Array();
   d3.csv("./data/proj1.csv", getRawData);
}

function getRawData (d)
{
  gData = d;
  process(gData);
}
function process(c) {
    csvData = c;

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

function UpdateBar(c) {
  ncsvData = c;
  var Update_data = new Array();
    for (var i = 0; i < ncsvData.length; i++) {
        var e = ncsvData[i];

            Update_data.push(e);

    }

    var newdata = d3.nest()
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
       .entries(Update_data);


    DrawNewBar(newdata);    
}

function DrawNewBar(d) {
  console.log(d);
  var data = JSON.parse(JSON.stringify(d));
  // console.log(local_data.map(function (d){return d.values;}));
  console.log(data);

  x2.domain(data.map(function(d) {return d.key; }));

  y2.domain([0, d3.max(data, function (c){console.log(c.values['Cost']);return c.values['Cost']})]);
  svg2.selectAll(".bar").remove();

  svg2.selectAll(".bar")
      .data(d)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function (d) {return x2(d.key); })
      .attr("width", x2.rangeBand())
      .attr("y",  function (d){
        return y2(d.values['Cost']);
      })
      .attr("height", function(d) { return height - y2(d.values['Cost']); })
      .on('mouseover', tip2.show)
      .on('mouseout', tip2.hide)
      .on('click',youqingkuang2);
      svg2.select(".y.axis")
        .transition()
        .duration(1000)
        .call(yAxis2);

      svg2.select(".x.axis")
        .transition()
        .duration(1000)
        .call(xAxis2);

  //     svg2.selectAll(".x.axis").remove();
  //     svg2.selectAll(".y.axis").remove();

  //     svg2.append("g")
  //     .attr("class", "x axis")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(xAxis2)
  //     .append("text")
  //     .text("Year");

  // svg2.append("g")
  //     .attr("class", "y axis")

  //     .call(yAxis2)
  //   .append("text")
  //     .attr("transform", "rotate(-90)")
  //     .attr("y", 6)
  //     .attr("dy", ".71em")
  //     .style("text-anchor", "end")
  //     .text("LifeCycle Cost");

  // svg2.select("class", ".x.axis")
  //     .transition()
  //     .duration(1000)
  //     .call(xAxis2)


  svg2.select("class", ".y.axis")
      .transition()
      .duration(1000)
      .call(yAxis2)

}

});






