function truncate(str, maxLength, suffix) {
if(str.length > maxLength) {
str = str.substring(0, maxLength + 1);
str = str.substring(0, Math.min(str.length, str.lastIndexOf(" ")));
str = str + suffix;
}
return str;
}
 
var margin = {top: 50, right: 200, bottom: 0, left: 20},
width = 350,
height = 650;
 
var start_year = 2004,
end_year = 2014;
 
var c = d3.scale.category20c();
 
var x = d3.scale.linear()
.range([0, width]);
 
var xAxis = d3.svg.axis()
.scale(x)
.orient("top");
 
var formatYears = d3.format("0000");
xAxis.tickFormat(formatYears);
 
var svg = d3.select("#data2").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.style("margin-left", margin.left + "px")
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
d3.json("./data/data.json", function(data) {
x.domain([start_year, end_year]);
var xScale = d3.scale.linear()
.domain([start_year, end_year])
.range([0, width]);
 
svg.append("g")
.attr("class", "x axis")
.attr("transform", "translate(0," + 0 + ")")
.call(xAxis);
 
for (var j = 0; j < data.length; j++) {
var g = svg.append("g").attr("class","journal");
 
var circles = g.selectAll("circle")
.data(data[j]['articles'])
.enter()
.append("circle");
 
var text = g.selectAll("text")
.data(data[j]['articles'])
.enter()
.append("text");
 
var rScale = d3.scale.linear()
.domain([0, d3.max(data[j]['articles'], function(d) { return d[1]; })])
.range([2, 9]);
 
circles
.attr("cx", function(d, i) { return xScale(d[0]); })
.attr("cy", j*20+20)
.attr("r", function(d) { return rScale(d[1]); })
.style("fill", function(d) { return c(j); });
 
text
.attr("y", j*20+30)
.attr("x",function(d, i) { return xScale(d[0])-5; })
.attr("class","value")
.text(function(d){ return d[1]; })
.style("fill", function(d) { return c(j); })
.style("display","none");
 
g.append("text")
.attr("y", j*20+25)
.attr("x",width+20)
.attr("class","label")
.text(truncate(data[j]['name'],30,"..."))
.style("fill", function(d) { return c(j); })
.on("click", mouseover)
.on("mouseout", mouseout);


};
});






var padding = {top: 10, right: 20, bottom: 20, left: 100},
    width2 = 800 - padding.left - padding.right,
    height2 = 500 - padding.top - padding.bottom;

    var formatPercent = d3.format(".0f%");

    var x2 = d3.scale.ordinal()
    .rangeRoundBands([0, width2], .1);

    var y2 = d3.scale.linear()
    .range([height2, 0]);

    var xAxis2 = d3.svg.axis()
    .scale(x2)
    .orient("bottom");

    var yAxis2 = d3.svg.axis()
    .scale(y2)
    .orient("left")
   // .tickFormat(formatPercent);
   var gData;
   var DepName;
    var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Total_LifeCost</strong> <span style='color:blue'>" + d.values.total_life + "</span>";
  })

    var svg1 = d3.select("#data1").append("svg")
    .attr("width", width2 + padding.left + padding.right)
    .attr("height", height2 + padding.top + padding.bottom)
  .append("g")
    .attr("transform", "translate(" + padding.left + "," + padding.top + ")");  


      svg1.call(tip);
      
      d3.csv("./data/proj1.csv",function(error,csv_data){
          gData = csv_data;
        
          var data=d3.nest()
          .key(function(d){return d.start;})
          .rollup(function(leaves){
          return{
          "total_life": d3.sum(leaves,function(d){return parseFloat(d.cost);})
          }})
          .entries(csv_data);
          //console.log(data);
          x2.domain(data.map(function(d){return d.key;}));
          y2.domain([0,d3.max(data,function(d){return d.values.total_life;})]);
          
            svg1.append("g")
            .attr("class","x axis")
            .attr("transform","translate(0,"+height2+")")
            .call(xAxis2);
           
          
           svg1.append("g")
           .attr("class", "y axis")
            .call(yAxis2)
           .append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 6)
           .attr("dy", ".71em")
           .style("text-anchor", "end")
           .text("Total_Cost");
            console.log(data);

            svg1.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x2(parseInt(d.key)); })
            .attr("width", x2.rangeBand())
            .attr("y", function(d) { return y2(d.values.total_life); })
            .attr("height", function(d) { return height2 - y2(d.values.total_life); })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
      });         
      
    


 
function mouseover(p) {

  var newData = new Array();

var g = d3.select(this).node().parentNode;
d3.select(g).selectAll("circle").style("display","none");
d3.select(g).selectAll("text.value").style("display","block");
 // console.log(g);
  DepName=d3.select(g).selectAll("text.label").text();
   console.log(DepName);
var label_data = gData.filter(function (d){
  return d.name ==DepName;
})

console.log(label_data);

        
          var csvData = label_data;
          for (var i=0; i<csvData.length;i++)
          {
            var e = csvData[i];
            newData.push(e);
          }
          label_data=d3.nest()
          .key(function(d){return d.start;})
          .rollup(function(leaves){
          return{
          "total_life": d3.sum(leaves,function(d){return parseFloat(d.cost);})

          }})
          .entries(newData);
        


          x2.domain(label_data.map(function(d){return d.key;}));
          y2.domain([0,d3.max(label_data,function(d){return d.values.total_life;})]);

           svg1.select(".x.axis").remove();
          svg1.select(".y.axis").remove();
            svg1.select(".bar").remove();
      
          
            svg1.append("g")
            .attr("class","x axis")
            .attr("transform","translate(0,"+height2+")")
            .call(xAxis2);
           
          
           svg1.append("g")
           .attr("class", "y axis")
            .call(yAxis2)
           .append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 6)
           .attr("dy", ".71em")
           .style("text-anchor", "end")
           .text("Total_Cost");
        


            svg1.selectAll(".bar")
            .data(label_data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x2(parseInt(d.key)); })
            .attr("width", x2.rangeBand())
            .attr("y", function(d) { return y2(d.values.total_life); })
            .attr("height", function(d) { return height2 - y2(d.values.total_life); })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
              
      
}
 
function mouseout(p) {
var g = d3.select(this).node().parentNode;
d3.select(g).selectAll("circle").style("display","block");
d3.select(g).selectAll("text.value").style("display","none");
}
