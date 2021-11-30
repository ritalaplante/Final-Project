d3.json("data/artwork_color.json", d3.autoType).then((data) => {
  
  
  //filter those have no image and don't have color
  data = data.filter((d) => d.color != null);

  //sort by year in descending order
  data.sort((a, b) => b.year - a.year);

  var num_per_row = Math.ceil(Math.sqrt(data.length));
  var num_per_col = Math.ceil(Math.sqrt(data.length));

  var margin = { top: 20, right: 20, bottom: 20, left: 20 },
    width = 1600 - margin.left - margin.right,
    height = 1600 - margin.top - margin.bottom;

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
      return Math.floor(i / num_per_col) + (i % num_per_row) * rect_width;
    })
    .attr("y", function (d, i) {
      return Math.floor(i / num_per_col) * rect_height;
    })
    .style("fill", function (d) {
      //if (d.color == null) return "#ffffff";
      return d.color;
    })
    //tooltip
    .on("mouseenter", function (event, d) {
      const [x, y] = d3.pointer(event,svg);
      console.log(x, y);
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
            d.year +
            "<br>" +
            "Year acquired: " +
            d.acquisitionYear +
            "<div>" +
            "<img src=" +
            d.thumbnailUrl +
            " + width:300px >" +
            "</div>"
        );
    })
    .on("mouseleave", function (d) {
      d3.select("#artwork-tooltip").style("display", "none");
    })
    .on("click", function (event, d, i) {
      window.open(d.artwork_url);
    });

  //   svg.selectAll("rect")
  // .data(data)
  // .enter()
  // .append('rect')
  // .attr("width", rect_width)
  // .attr("height", rect_height)
  // .attr("x", function(d,i){

  //   return Math.floor(i/num_per_col)+i%num_per_row*rect_width
  // })
  // .attr("y", function(d,i){
  //     return Math.floor(i/num_per_col)*rect_height
  // })
  // .style('fill',function(d){
  //   if(d.color==null)
  //     return "#ffffff"
  //   return d.color
  // })

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
