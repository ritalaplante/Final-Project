const p = d3
  .select("#palette")
  .append("svg")
  .attr("width", 600)
  .attr("height", 100);
    
//create a circle for primary color
const svg = d3
.select("#primary-color")
.append("svg")
.attr("width", 200)
.attr("height", 200);

svg
.append("circle")
.attr("class", "primary")
.attr("cx", 100)
.attr("cy", 100)
.attr("r", 50)
.attr("stroke", "black")
.attr('opacity',0)

//load artwork image
const img = d3
.select("#img-container")
.append("svg")
.attr("width", 300)
.attr("height", 300);

img
.append("svg:image")
.attr("x", 30)
.attr("y", 30)
.attr("class", "artwork-img")
.attr("preserveAspectRatio", "none");


d3.json("data/artwork_color.json", d3.autoType).then((data) => {
  var colors = Array.from(new Set(data.map((d) => d.color)));
  var filtered_color = colors.filter((e) => e);

  const finder = ColorFinder(filtered_color);

  
  const picker = document.querySelector("#picker");
  const btn = document.querySelector("#check");
  btn.addEventListener("click", (event) => {
    var color = finder.findClosestColor(picker.value);
    //find target artwork object by color
    var target = data.find((d) => d.color == color);

    // change primary circle color
    svg.select("circle").attr("class", "primary").style("fill", color)
    .attr('opacity',1);

    // change palette
    updatePalette(target.palette);

    //artwork title
    img.select('text')
    .attr('class','title')
    .append('text')
    .text(target.title)
    .attr('x',10)
    .attr('y',10)

    //get image of target
    img
      .select("image")
      .attr("class", "artwork-img")
      .attr("xlink:href", target.thumbnailUrl);
  });
});


function updatePalette(palette){
    var circles=p.selectAll(".palette")
      .data(palette,d=>d)

    circles.enter()
      .append("circle")
      .attr("class", "palette")
      .attr("cx", function (d, i) {
        return 10+i * 30;
      })
      .attr("cy", 30)
      .attr("r", 5)
      .attr("stroke", "black")
      .attr("fill", d=>d)
      
}