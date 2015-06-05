var svg, g1, data, csvData, dataplot;


initData();

function initCanva(d) {
    
    var data = JSON.parse(JSON.stringify(d));
    
    
    nv.addGraph(function () {
        var chart = nv.models.lineChart()
            .x(function (d) {
                return parseInt(d.key);
            })
            .y(function (d) {
                return d.values["Cost"];
            })

            .margin({left: 100}) 
            //.color(d3.scale.category40().range())
            //.useInteractiveGuideline(false)
        ;

        chart.xAxis
            .axisLabel("Years")
            ;
        
        chart.yAxis
            .axisLabel("Completion Lifecycle Cost")
            .tickFormat(d3.format('.0f'));
            
        chart.options({
            showControls: false,
            
        });



/*
        chart.tooltipContent( function(key, x, y){ 
  return  key + 'spends' + y+'$M lifecycle in total at'+x;
});
*/

        d3.select('#j1 svg')
            .datum(data)
            .transition()
            .duration(500)
            .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
}


function initData() {
    data = new Array();

    d3.csv("./data/proj1.csv", processData);
}

function processData(c) {
    csvData = c;

    for (var i = 0; i < csvData.length; i++) {
        var e = csvData[i];

            data.push(e);

    }

    var local_data = d3.nest()
        .key(function (c) {
            return c["name"];
        })
        .key(function (c) {
            return c["start"];
        })
        .rollup(function (leaves) {
            return {
                "Cost": d3.sum(leaves, function (d) {
                    return parseFloat(d.cost);
                })
            }
        })
        .entries(data);

    for (var key in local_data) {
        var x = local_data[key];
        for (var key2 in x.values) {
            var y = x.values[key2].values;
        }
    }
    
    for (var key in local_data) {
        local_data[key].values.sort(function (a,b){
            return parseInt(b.key)-parseInt(a.key);
        });
    }
    console.log(local_data);
    initCanva(local_data);
}


function isValid(arr) {
    for (var i = 0; i < arr.length; i++) {
        var e = arr[i];
        if (e == "" || e == "0" || e == undefined) {
            return false;
        }
    }
    return true;
}