var buildMap = function(us, stateLaws) {
console.log(us)
var svg = d3.select("#map");
var path = d3.geoPath();
  svg.append("g")
    .attr("class", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter()
    .append("path")
    .attr("d", path)

  svg.append("path")
      .attr("class", "state-borders")
      .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

}

var setColor = function(collection, year) {
    COLOR_TRUE = "rgb(212,100,100)";
    COLOR_FALSE = "rgb(100,212,212)";
    let filterFuncCol = [{"func": filterByRightToWork,
                          "args": {"year": year}}];
    setColorHelper(collection, year, COLOR_TRUE, COLOR_FALSE, filterFuncCol);
}

var setColorHelper = function(collection, year, colorTrue, colorFalse, filterFuncCollection) {
    var svg = d3.select("#map");

    var states = svg.select("g").selectAll("path")

    states.attr("fill", function(d) {
        color = colorFalse;
        filteredCollection = filter(collection, filterFuncCollection);
        console.log(filteredCollection);
        for(let item of filteredCollection) {
            //Need to parseInt because the input string could be formatted like "05"
            if(parseInt(d.id, 10) == parseInt(item.id, 10)) {
                color = colorTrue;
            }
        }
        return color;
    });
};


var filter = function(collection, filterFuncCollection) {
    finalCollection = [];
    filterFuncCollection.forEach((filter) => {
        let newCollection = []
        collection.forEach((item) => {
            if(filter.func(item, filter.args)) {
                newCollection.push(item);     
            }
        });
        finalCollection = newCollection;
    });

    return finalCollection;
}

var filterByRightToWork = function(item, args) {
    if(item.year == args.year) {
        if(item.rghtowork == 1) {
            return true;
        }
    }
    return false;
}