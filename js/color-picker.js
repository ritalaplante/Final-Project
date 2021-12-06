
    
//create a circle for primary color
const svg = d3
.select("#primary-color")
.append("svg")
.attr("width", 100)
.attr("height", 100);


//create palette
const p = d3
  .select("#palette")
  .append("svg")
  .attr("width", 600)
  .attr("height", 200);
  const tarea=p.append('g')
  
svg
.append("circle")
.attr("class", "primary")
.attr("cx", 50)
.attr("cy", 50)
.attr("r", 35)
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
.attr("x", 40)
.attr("y", 40)
.attr("class", "artwork-img")
.attr("preserveAspectRatio", "none");


d3.json("data/artwork_color.json", d3.autoType).then((data) => {
  var colors = Array.from(new Set(data.map((d) => d.color)));
  var filtered_color = colors.filter((e) => e);

  const finder = ColorFinder(filtered_color);

  
  const picker = document.querySelector("#picker");
  const btn = document.querySelector("#check");
  picker.addEventListener("mouseover", function() {
    picker.style.opacity = 0.5;
  });
  picker.addEventListener("mouseleave", function() {
    console.log("out")
    picker.style.opacity = 1.0;
  });
  document.getElementById('current-color').innerHTML="Selected Color: " + picker.value
  var init_color = finder.findClosestColor(picker.value);

  fetchArtwork(data,init_color)
  picker.addEventListener('change',(event)=>{
    console.log("clicked")
    document.getElementById('current-color').innerHTML="Selected Color: " + picker.value
  })
  btn.addEventListener("click", (event) => {
    //console.log("clicked")
    //find the exact value
    var color = filtered_color.find(e=>e==picker.value)
    //if not, use color finder
    console.log(color)
    if(color==undefined)
      color = finder.findClosestColor(picker.value);
    console.log(color)
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
//document.getElementById("artist-info").innerHTML=artist
//document.getElementById("birth-year").innerHTML=birth
//document.getElementById("title").innerHTML="Title: " + target.title
//document.getElementById("year-created").innerHTML=year
//document.getElementById("medium").innerHTML=medium
//document.getElementById("other-info").innerHTML=info
//document.getElementById("artwor-link").href=target.artwork_url
document.getElementById('pchex').innerHTML= 'Primary Color: '+target.color

//console.log(info)
//get image of target
img
  .select("image")
  .attr("class", "artwork-img")
  .attr("xlink:href", target.thumbnailUrl)
  //.attr("width", 300)
  .on("click", function(){
    window.open(target.artwork_url)
    console.log("clicked")
  })
  .on("mouseover", function(event){
    //console.log(d)
    const pos = d3.pointer(event, window);
    console.log(target)
    //var birth1 =target.yearOfBirth==null?"":"(b."+target.yearOfBirth+")"
    //var medium1 =target.medium==null?"unknown medium":target.medium
    //console.log(birth1)
    d3.select('#img-tooltip')
      .style("left", pos[0]+30+"px")
      .style("top",pos[1]+20+"px")
      .style("display", "inline-block")
      //.html("<b>"+target.title+"</b> (" + year + ")<br><b>" + artist + "</b> " +birth+ "<br><b>Medium: </b>" + medium) 
      .html("<b>" + artist + "</b> " + birth + "<br><b>" + target.title + "</b> (" + year + ")<br>" + medium + "<br><br>" + info)   
      console.log("over")
    d3.select(this)
      .style("opacity", .75)
  })

  .on("mouseleave", function(event, d){
    d3.select("#img-tooltip").style("display", "none")
    d3.select(this).style("opacity", 1)
  })
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

     
      var texts=tarea.selectAll('.phex')
      .data(palette,d=>d)

      texts.enter()
      .append('text')
      .attr('class','phex')
      .attr('x',function(d,i){
        return 40+(i%5) * 70;
      })
      .attr('y',function(d,i){
        if(i<5)
        return 50+40
        else
        return 140+40
      })
      .text(d=>d)
      .attr("font-size","14px")
      .style("text-anchor", "middle")


      texts.exit().remove()
  

      
      
}

