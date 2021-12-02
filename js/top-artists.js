var countObj = {};

d3.csv('data/top10counts.csv').then(data => {

    const margin = {top:15, right:25, buttom:15, left:100},
    width = (500 - margin.left - margin.right),
    height = (300 - margin.top - margin.buttom);

    let frinkData = data.filter(function(d) {return d.artist == 'Frink, Dame Elisabeth'});

    frinkData.sort(function(a, b) {return a.count - b.count})
    console.log('Frink Data', frinkData);

    // set the ranges
    var y = d3.scaleBand()
        .range([height, 0])
        .padding(0.1);

    var x = d3.scaleLinear()
        .range([0, width]);
    
    var svg = d3.select("#frink_viz").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data in the domains
    x.domain([0, d3.max(frinkData, function(d){ return d.count; })])
    y.domain(frinkData.map(function(d) { return d.medium_normalized; }));

    svg.selectAll(".bar")
        .data(frinkData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("width", function(d) {return x(d.count); } )
        .attr("y", function(d) { return y(d.medium_normalized); })
        .attr("height", y.bandwidth());

    var yAxis = d3.axisLeft()
        .scale(y)
        .tickSize(0)

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .call(g => g.select(".domain").remove())
});