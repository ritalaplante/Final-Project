
 
d3.csv('data/female_artists_artwork.csv',d3.autoType).then(data=>{
//test with smaller dataset
    let artwork_data=data.slice(0,500)
  

const margin = {left:150,right:20, top:20, bottom:40};

  const outerWidth = 1500;
  const outerHeight = 3000;
  const width = outerWidth - margin.left - margin.right;
  const height = outerHeight - margin.top - margin.bottom;

  const g = d3.select(".artwork-chart").append("svg")
    .attr("width", outerWidth)
    .attr("height", outerHeight)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);



const years = Array.from(new Set(artwork_data.map(d=>d.year)));
years.sort();
const acyears = Array.from(new Set(artwork_data.map(d=>d.acquisitionYear)));
acyears.sort();

    const xScale = d3.scaleBand()
    .paddingInner(0.1)
    .domain(acyears)
    .range([0, width]);


    const yScale=d3.scaleBand()
    .paddingInner(0.1)
    .domain(years)
    .range([0, height]);

const xAxis = d3.axisBottom(xScale)
.tickValues(xScale.domain().filter(function(d,i){ 
  return !(i%3)
}));
const yAxis = d3.axisLeft(yScale);

console.log(xScale.bandwidth())
console.log(yScale.bandwidth())
  g.selectAll("image")
  .data(artwork_data)
  .enter()
  .append("svg:image")
  .attr("width", xScale.bandwidth())
  .attr("height", yScale.bandwidth())
  .attr("y", d=>yScale(d.year))
  .attr("x", function(d,i){
      return xScale(d.acquisitionYear);
  })
  .attr('preserveAspectRatio','none')
  .attr("xlink:href",d=>d.thumbnailUrl)
  .on("mouseover",function(event,d){
    const pos = d3.pointer(event, window);
    console.log(pos)
    d3.select('#artwork-tooltip')
        .style("left", pos[0]+20 + "px")
        .style("top", pos[1]+10 + "px")
        .style("opacity",1)
        .html(
                    "title: "+d.title + "<br>"+
                        "artist: "+d.artist +
                        '<div> </div>'
                    )
  })
  .on("mouseleave",function(d){
    d3.select("#artwork-tooltip").style("opacity", 0.3);	
})
  .on('click',function(event,d,i){
      
    window.open(d.artwork_url)
  })
  



g.append("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis);

g.append("g")
  .attr("class", "y-axis")
  .call(yAxis);

    // acquisitionYear: 1941
    // artist: "Clarke Hall, Lady Edna"
    // artistRole: "artist"
    // artist_url: "http://www.tate.org.uk/art/artists/lady-edna-clarke-hall-914"
    // artwork_url: "http://www.tate.org.uk/art/artworks/clarke-hall-catherine-leaning-on-a-wall-a01064"
    // creditLine: "Presented by Mrs F. Samuel, Mrs E. Bishop and Michel H. Salaman through the Contemporary Art Society 1941"
    // gender: "Female"
    // height: 216
    // medium: "Ink and watercolour on paper"
    // placeOfBirth: "Shipborne, United Kingdom"
    // placeOfDeath: null
    // thumbnailUrl: "http://www.tate.org.uk/art/images/work/A/A01/A01064_8.jpg"
    // title: "Catherine Leaning on a Wall"
    // units: "mm"
    // width: 279
    // year: 1900
    // yearOfBirth: 1879
    // yearOfDeath: 1979
    

}
)