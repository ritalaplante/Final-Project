d3.json("data/artwork_color.json", d3.autoType).then((data) => {
  
  
  //filter those have no image and don't have color
  data = data.filter((d) => d.color != null);
  
  //sort by year in descending order
  data.sort((a, b) => b.year - a.year);

  var num_per_row = Math.ceil(Math.sqrt(data.length));
  var num_per_col = Math.ceil(Math.sqrt(data.length));

  var margin = { top: 20, right: 40, bottom: 20, left: 35 },
    width = 1300 - margin.left - margin.right,
    height = 1200 - margin.top - margin.bottom;

  var rect_width = width / num_per_row;
  var rect_height = height / num_per_col;

  const svg = d3
    .select(".collage")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  //artwork collage
  svg
    .selectAll("image")
    .data(data)
    .enter()
    .append("svg:image")
    .attr("preserveAspectRatio", "none")
    .attr("xlink:href", (d) => d.thumbnailUrl)
    .attr("width", rect_width)
    .attr("height", rect_height)
    .attr("x", function (d, i) {
      return (i % num_per_row) * rect_width;
    })
    .attr("y", function (d, i) {
      return Math.floor(i / num_per_col) * rect_height;
    })
    //tooltip
    .on("mouseenter", function (event, d) {
      var year,acyear 
      year=d.year==null?"unknown":d.year
      acyear=d.acquisitionYear==null?"unknown":d.acquisitionYear
      const [x, y] = d3.pointer(event,svg);
      
      d3.select("#artwork-tooltip")
        .style("left", x + 30 + "px")
        .style("top", y + 20 + "px")
        .style("display", "block")
        .html(
          "Title: " +
            d.title +
            "<br>" +
            "Artist: " +
            d.artist +
            "<br>" +
            "Year created: " +
            year +
            "<br>" +
            "Year acquired: " +
            acyear +
            "<br>" +
            "Medium: "+d.medium
            + "<br>" +
            "Primary Color: "+ '<span class="smallbox" style="color:'+d.color+'">&#9679;</span>'+
            d.color+
            "<br></br><div>" +
            "<img src=" +
            d.thumbnailUrl +
            " + width:300px" + ' class = "centered-image">' +
            "<br></br></div>"
        );

        d3.select(this)
        .attr("opacity",0.7)
        
    })
    .on("mouseleave", function (d) {
      d3.select("#artwork-tooltip").style("display", "none");
      d3.select(this)
        .attr("opacity",1)
        
    })
    .on("click", function (event, d, i) {
      window.open(d.artwork_url);
    });

  

  //seperator

  // var margin = {top: 20, right: 20, bottom: 20, left: 20},
  //   width = 1600 - margin.left - margin.right,
  //   height = 100 - margin.top - margin.bottom;

  //   const svg= d3.select(".color-size")
  //   .append("svg")
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //   .append("g")
  //     .attr("transform",
  //           "translate(" + margin.left + "," + margin.top + ")");

  //   artwork_data.sort((a,b)=>(a.year-b.year))

  //   svg.selectAll("rect")
  //   .data(data)
  //   .enter()
  //   .append('rect')
  //   .attr("width", 20)
  //   .attr("height", 20)
  //   .attr("x", function(d,i){
  //     return (i%20+20*i)
  //   })
  //   .attr("y", function(d,i){
  //       return Math.floor(i%20)
  //   })
  //   .style('fill',function(d){
  //     return d.color
  //   })

  
});
