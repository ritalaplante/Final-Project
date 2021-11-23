
 
d3.csv('data/female_artists_artwork.csv',d3.autoType).then(data=>{
//test with smaller dataset
    let artwork_data=data.slice(0,500)
  

const margin = {left:150,right:20, top:50, bottom:40};

  const outerWidth = 1300;
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

    g.append('text')
    .attr('x',1350)
    .attr('y',40)
.text('Year the artwork was created')

g.append('text')
.attr('x',50)
.attr('y',-20)
.text('Year the artwork was acquired by the museum')

g.append('text')
.attr('x',10)
.attr('y',2900)
.text('These artworks lack records')


const xAxis = d3.axisTop(xScale)
.tickValues(xScale.domain().filter(function(d,i){ 
  return !(i%3)
}));
const yAxis = d3.axisLeft(yScale);

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

    const[x, y] = d3.pointer(event);
    d3.select("#artwork-tooltip")
        .style("left", x-10 + "px")
        .style("top", y  + "px")
        .style("opacity",1)
        .html(
                    "Title: "+d.title + "<br>"+
                        "Artist: "+d.artist +"<br>"+
                        "Year created: "+d.year+"<br>"+
                        "Year acquired: "+d.acquisitionYear+
                        '<div>' +
                         "<img src=" +d.thumbnailUrl+ " + width:300px >" +
                         '</div>'
                    )

        console.log(x,y)
      
  })
  .on("mouseleave",function(d){
    d3.select("#artwork-tooltip").style('opacity', 0);
})
  .on('click',function(event,d,i){
      
    window.open(d.artwork_url)
  })
  



g.append("g")
  .attr("class", "x-axis")
  //.attr("transform", `translate(0, ${height})`)
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