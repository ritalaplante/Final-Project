const margin = {top:50, left:60, right:50, bottom:50};
const width = 650 - margin.left - margin.right;
const height = 450 - margin.top - margin.bottom;

// Create an SVG element
const svg = d3.selectAll(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// Create path for area and assign it a class name
svg.append("path")
    .attr("class", "area")

//Create a path for the line and assign it a class name
svg.append("path")
    .attr("class", "line")

// Create scales without domains
const xScale = d3.scaleTime()
	.range([0, width])

const yScale = d3.scaleLinear()
	.rangeRound([height, 0])

// Create axes
const xAxis = d3.axisBottom()
    .tickFormat(d3.format("d"))
    .scale(xScale)

const yAxis = d3.axisLeft()
    .ticks(5)
    .scale(yScale)

svg.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", `translate(0, ${height})`)
    
svg.append("g")
    .attr("class", "axis y-axis")

const labelY = svg.append('text')
    .attr('x', -80)
    .attr('y', -40)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr("transform", "rotate(-90)")
    .attr('font-size', 14)
    .attr('fill', 'grey')
    .attr("font-weight", 700);

const labelX = svg.append('text')
    .attr('x', 250)
    .attr('y', 380)
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('font-size', 14)
    .attr('fill', 'grey')
    .attr("font-weight", 700);

const title = svg.append("text")

function update(data) {

    data.forEach(function(d) {
        d.year = d.year;
        d.artwork_count = parseInt(d.artwork_count);
    });

    console.log(data)
    // Update domains and scales using data passed to update

    xScale.domain([d3.min(data, d => d.year), d3.max(data, d=>d.year)])
    yScale.domain([0, d3.max(data, d=>d.artwork_count)])

    console.log(d3.max(data, d=>d.artwork_count))

    // Create an area generator
    var area = d3.area()
        .x(d => xScale(d.year))
        .y0(yScale(0))
        .y1(d => yScale(d.artwork_count))

    // Select the area and set data using datum, call the area function
    d3.select(".area")
        .datum(data)
        .transition()
        .duration(1000)
        .attr("d", area)
        .attr("fill", "#feded0")
        
    // Add a line to the area chart
    var line = d3.line()
        .x(d => xScale(d.year))
        .y(d => yScale(d.artwork_count))

    d3.select(".line")
        .datum(data)
        .transition()
        .duration(1000)
        .attr("d", line)
        .attr("fill", "none")
        .attr("stroke", "#67000d")
        .attr("stroke-width", 1.5)

    // Update axes using update scales
    svg.select(".x-axis")
        .transition()
        .duration(1000)
        .call(xAxis)

    svg.select(".y-axis")
        .transition()
        .duration(1000)
        .call(yAxis)

    labelY.text("Artwork Count")

    labelX.text("Year")

}

let type = document.querySelector('#group-by').value

Promise.all([ // load multiple files
	d3.csv('data/acquisition_by_year.csv'),
	d3.csv('data/artwork_by_year.csv')
]).then(data => {
    let acquistion = data[0]; 
	let artwork = data[1];

    acquistion.sort(function (a, b) {
        return a.year - b.year;
    });

    artwork.sort(function (a, b) {
        return a.year - b.year;
    });

    console.log("acquistion", acquistion);
    console.log("artwork", artwork);

    update(artwork); 

    d3.select('#group-by')
        .on('change', (event,d) => {
            type = event.target.value;
            if (type == 'year'){
                update(artwork);
            } else {
                update(acquistion);
            } 
        })
});