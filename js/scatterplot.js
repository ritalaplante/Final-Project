d3.json("data/artwork_color.json", d3.autoType).then((data) => {
    
    //filter data that don't have colors
    data=data.filter(d=>d.color!==null&&d.color!==undefined)

    var margin = { top: 40, right: 40, bottom: 40, left: 40 },
    width = 800 - margin.left - margin.right,
    height = 800 - margin.top - margin.bottom;

    
    const svg = d3
    .select(".scatterplot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

    const g=svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const xScale = d3.scaleLinear()
    .domain(d3.extent(data,d=>d.width))
    .range([0, width]);

  const yScale = d3.scaleLinear()
    .domain(d3.extent(data,d=>d.height))
    .range([height, 0]);

  const xAxis = d3.axisBottom()
    .scale(xScale)

  const yAxis = d3.axisLeft()
              .scale(yScale)

    svg.append("g")
    .attr("class", "axis x-axis")
    .call(xAxis)
    .attr("transform", `translate(40, ${height+margin.left})`);

    svg.append("g")
   .attr("class", "axis")
   .attr("transform", "translate(" + margin.top+ ",40)")
   .call(yAxis);

   svg.append("text")
   .attr('x', 730)
   .attr('y', 750)
   .text("Width")
.attr("font-size",12);

svg.append("text")
   .attr('x',50)
   .attr('y', 20)
   .text("Height")
.attr("font-size",12)


   g
   .selectAll("circle")
   .data(data)
   .enter()
   .append("circle")
     .attr("cx", function (d) { return xScale(d.width); } )
     .attr("cy", function (d) { return yScale(d.height); } )
     .attr("r", 5)
     .style("fill", d=>d.color)
     //.attr("opacity",0.7)
     .attr("xlink:href",d=>d.thumbnailUrl)
     .on('click',function(event,d,i){

      window.open(d.artwork_url)
    })

})