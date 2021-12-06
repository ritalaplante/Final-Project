var formatComma = d3.format(",")

let data = {
    "Male": 2895,
    "Female"  : 521,
    "Gender Unknown"  : 116
};

const color = d3.scaleOrdinal()
    .range(['#62b2cd', '#bd658d', '#aca19a']); 

let margin = {top: 30, right: 20, bottom: 30, left: 40};
let svgWidth = 800, svgHeight = 310;
let height = svgHeight- margin.top- margin.bottom, width = svgWidth - margin.left - margin.right;
let sourceNames = [], sourceCount = [];

let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);
for(let key in data){
    if(data.hasOwnProperty(key)){
        sourceNames.push(key);
        sourceCount.push(parseInt(data[key]));
    }
}
x.domain(sourceNames);
y.domain([0, d3.max(sourceCount, function(d) { return d; })]);

let svg = d3.select("#bar-chart").append("svg");
svg.attr('height', svgHeight)
    .attr('width', svgWidth);

svg = svg.append("g")
         .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let xAxis = d3.axisBottom()
    .scale(x)
    .tickPadding([10])
    .tickSize(0);

svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .call(g => g.select(".domain").remove());

/*svg.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(5))
    ;*/
        
// Create rectangles
let bars = svg.selectAll('.bar')
    .data(sourceNames)
    .enter()
    .append("g");

bars.append('rect')
    .attr('class', 'bar')
    .attr("x", function(d) { return x(d); })
    .attr("y", function(d) { return y(data[d]); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(data[d]); })
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("stroke", function (d){ return color(d); })
    .attr('stroke-width', '3.5')
    .attr("fill", "#e2e2e0")
    .on("mouseover", function(event, d,index){
        var bar = d3.select(this)
        var width = bar.attr('width')
        var height = bar.attr('height')

        var scale = 1.005;

        var newWidth = width* scale;

        var shift = (newWidth - width)/2

        bar.transition()
            .style('transform','scale('+scale+')')


        d3.selectAll('.bar')
            .filter((d,i)=> i < index)
            .transition()
            .style('transform','translateX(-'+shift+'px)')

        d3.selectAll('.bar')
            .filter((d,i)=> i > index)
            .transition()
            .style('transform','translateX('+shift+'px)')

    })
    .on("mouseout", function(event, d){
        d3.select(this).transition().style('transform','scale(1)')
        d3.selectAll('.bar')
            .filter(d=>d.letter !== data.letter)
            .transition()
            .style('transform','translateX(0)')
    });
    
bars.append("text")
    .text(function(d) { 
        return "Artist Count: " + formatComma(data[d]);
    })
    .attr("x", function(d){
        return x(d) + x.bandwidth()/2;
    })
    .attr("y", function(d){
        return y(data[d]) - 10;
    })
    .attr("class", "bar-labels")
    .attr("fill" , "black")
    .attr("text-anchor", "middle");