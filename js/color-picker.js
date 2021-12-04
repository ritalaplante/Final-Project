
    
//create a circle for primary color
const svg = d3
.select("#primary-color")
.append("svg")
.attr("width", 200)
.attr("height", 200);
//create palette
const p = d3
  .select("#palette")
  .append("svg")
  .attr("width", 600)
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

  document.getElementById('current-color').innerHTML="Current color:  "+picker.value
  var init_color = finder.findClosestColor(picker.value);

  fetchArtwork(data,init_color)
  btn.addEventListener("click", (event) => {
    
    document.getElementById('current-color').innerHTML="Current color:  "+picker.value
    var color = finder.findClosestColor(picker.value);
    fetchArtwork(data,color)
});
});

function fetchArtwork(data,color){
  
//find target artwork object by color
var target = data.find((d) => d.color == color);

// change primary circle color
svg.select("circle").attr("class", "primary").style("fill", color)
.attr('opacity',1);

// change palette
updatePalette(target.palette);

var artist,birth,year,medium,info;
artist=target.artist
var names= artist.split(",");

artist=names[1]+" "+names[0]
birth=target.yearOfBirth==null?"":"(b."+target.yearOfBirth+")"
year=target.year==null?"":target.year
medium=target.medium==null?"unknown medium":target.medium
info=target.creditLine==null?"":target.creditLine
document.getElementById("artist-info").innerHTML=artist
document.getElementById("birth-year").innerHTML=birth
document.getElementById("title").innerHTML=target.title
document.getElementById("year-created").innerHTML=year
document.getElementById("medium").innerHTML=medium
document.getElementById("other-info").innerHTML=info
document.getElementById("artwor-link").href=target.artwork_url
document.getElementById('pchex').innerHTML= 'Primary Color: '+target.color


//get image of target
img
  .select("image")
  .attr("class", "artwork-img")
  .attr("xlink:href", target.thumbnailUrl);
}


function updatePalette(palette){
    var circles=p.selectAll(".palette")
      .data(palette,d=>d)

    circles.enter()
      .append("circle")
      .attr("class", "palette")
      .attr("cx", function (d, i) {
        return 40+(i%5) * 70;
      })
      .attr("cy",function(d,i){
        //put into 2 lines 
        if(i<5)
        return 50
        else
        return 140
      })
      .attr("r", 20)
      .attr("stroke", "black")
      .attr("fill", d=>d)

      circles.exit().remove()

      svg.selectAll('text')
      .data(palette)
      .append('text')
      .text(d=>d)
       .attr('dx', function (d) {
        return d.x;
    })
    .attr('dy', function (d) {
        return d.y - 13;
    })
    .attr('text-anchor', 'middle')
    .attr('font-size', 11);

      
      
}