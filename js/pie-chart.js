// set the dimensions and margins of the graph
const width = 375,
    height = 375,
    margin = 10;

const format = d3.format(",");
// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const radius = Math.min(width, height) / 2 - margin

// append the svg object to the div called pie-chart
const svg = d3.select("#pie-chart")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

// Create dummy data
const data = {Unknown: 116, Male: 2895, Female: 521}

// set the color scale
const colorScale = d3.scaleOrdinal()
    .range(['#2ea2cf', '#7ff9fd', '#063792']); 
    //white, blue, red

// Compute the position of each group on the pie:
const pie = d3.pie()
  .value(function(d) {return d[1]})
const data_ready = pie(Object.entries(data))
// Now I know that group A goes from 0 degrees to x degrees and so on.

// shape helper to build arcs:
const arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('mySlices')
  .data(data_ready)
  .join('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(colorScale(d.data[0])) })
    //.attr("stroke", "black")
    //.style("stroke-width", "2px")
    .style("opacity", 0.7)

  .on("mousemove", function(event, d){
    const pos = d3.pointer(event, window);
    d3.select("#pie-tooltip")
      .style("left", pos[0]+10+"px")
      .style("top",pos[1]-25+"px")
      .style("display", "inline-block")
      .html("Gender: "+(d.data[0])+"<br>"+"Number of artists: "+(d.data[1]));
    })
  .on("mouseout", function(d){
    d3.select("#pie-tooltip").style("display", "none");
  });

  const legend = svg.append("g");

  legend.selectAll(".legendColors")
    .data(colorScale.domain())
    .enter()
    .append("rect")
    .attr("x", 400)
    .attr("y", function(d,i){ return 275 + i*(20+5)}) 
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", d=>colorScale(d));

  legend.selectAll(".legendLabels")
    .data(colorScale.domain())
    .enter()
    .append("text")
    .attr("x", 400 + 20*1.2)
    .attr("y", function(d,i){ return 275 + i*(20 +5) + (25/2)}) 
    .attr("font-size", 12)
    .text(d=>d);
    

// Now add the annotation. Use the centroid method to get the best coordinates
/*svg
  .selectAll('mySlices')
  .data(data_ready)
  .join('text')
  .text(function(d){ return d.data[0]})
  .attr("transform", function(d) { return `translate(${arcGenerator.centroid(d)})`})
  .style("text-anchor", "middle")
  .style("font-size", 17)*/
