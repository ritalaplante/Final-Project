var countObj = {};

d3.csv('data/top10counts.csv').then(data => {

    const margin = {top:15, right:25, bottom:15, left:120},
    width = (450 - margin.left - margin.right),
    height = (150 - margin.top - margin.bottom);

    let artists = ['Frink, Dame Elisabeth', 'Hepworth, Dame Barbara','Duncombe, Susanna','Arbus, Diane','Rigby, Elizabeth','Lim, Kim','Wharncliffe, Lady','Rego, Paula','Horn, Rebecca','Almeida, Helena']
    let mediums = []
    let colors = ['#00b38c','#467481', '#205836','#482a5c', '#8b582d','#a54e77','#70427e', '#b94242', '#1d7585', '#093a42', '#797a3d', '#c28428', '#55648d', '#313749', '#314948','#4c7460','#98799c','#2c0931','#62946d','#68775f','#5e3e2c' ]
    //let colors = []
    let medObj = {}
    for (let i = 0; i < data.length; i++) {
        if (!mediums.includes(data[i].medium_normalized)) {
            mediums.push(data[i].medium_normalized)
        }
        //nums.push(aData[i].count)
      };
    //console.log(medObj['Print'])
    //console.log(mediums.length)
    for (let i=0; i < mediums.length; i++){
        medObj[mediums[i]] = colors[i]
        //colors.push("#" + ((1<<24)*Math.random() | 0).toString(16))
    }
    console.log(medObj)
    console.log(medObj['Etching'])
    artists.forEach(function(artist) {
        let aindex = artists.indexOf(artist)
        console.log("viz"+aindex)
        
        let aData = data.filter(function(d) {return d.artist == artist});
        aData.sort(function(a, b) {return a.count - b.count})
        console.log(artist+" data: ", aData);
        let totalCount = 0
        for (let i = 0; i < aData.length; i++) {
            totalCount += parseInt(aData[i].count)
            //nums.push(aData[i].count)
          };
        //console.log(mediums)
        console.log(totalCount)

        

        var y = d3.scaleBand()
            .range([height, 0])
            .padding(0.1);

        var x = d3.scaleLinear()
            .range([0, width]);

        var svg = d3.select("#viz"+aindex).append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        x.domain([0,73]) 
        //x.domain([0, d3.max(aData, function(d){ return d.count; })])
        y.domain(aData.map(function(d) { return d.medium_normalized; }));
        
        if(aData.length==1){
            y.range([height/2, 0])
          
        }

        svg.selectAll(".bar")
            .data(aData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("width", function(d) {return (x(d.count)); } )
            .attr("y", function(d) { return y(d.medium_normalized); })
            .style("fill", function(d, i) {
                return medObj[d.medium_normalized]
              })
            .attr("rx", 3)
            .attr("ry", 3)
            .attr("height", function(d){
                if(aData.length==1)
                    return (height / aData.length)/2 - 5
                return height / aData.length - 5
            }
            )
            .on("mouseover", function(event, d,index){
                const pos = d3.pointer(event, window);
                console.log(d)
                d3.select('#top-tooltip')
                    .style("left", pos[0]+10+"px")
                    .style("top",pos[1]-25+"px")
                    .style("display", "inline-block")
                    .html("Medium: "+(d.medium_normalized)+"<br>"+"Count: "+(d.count));
                    var bar = d3.select(this)
                    var height = bar.attr('height')
            
                    var scale = 1.03;
            
                    //var newWidth = width* scale;
                    var newHeight = height*scale;
            
                    var shift = (newHeight - height)/2
            
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
                    console.log("working")
                })
            .on("mouseleave", function (d) {
                d3.select("#top-tooltip").style("display", "none");
                d3.select(this).transition().style('transform','scale(1)')
                d3.selectAll('.bar')
                .filter(d=>d.letter !== data.letter)
                .transition()
                .style('transform','translateX(0)')
                })
    

                
            //.attr("height", y.bandwidth()/2);

        var yAxis = d3.axisLeft()
            .scale(y)
            .tickSize(0)

        svg.append("g")
            .attr("class", "y-axis")
            .call(yAxis)
            .call(g => g.select(".domain").remove())

        // function mouseover(data,index){
        //     var bar = d3.select(this)
        //     var width = bar.attr('width')
        //     var height = bar.attr('height')
            
        //     var scale = 1.5;
            
        //     var newWidth = width* scale;
        //     var newHeight = height*scale;
            
        //     var shift = (newWidth - width)/2
            
        //     bar.transition()
        //         .style('transform','scale('+scale+')')
            
            
        //      d3.selectAll('.bar')
        //         .filter((d,i)=> i < index)
        //         .transition()
        //         .style('transform','translateX(-'+shift+'px)')
            
        //     d3.selectAll('.bar')
        //         .filter((d,i)=> i > index)
        //         .transition()
        //         .style('transform','translateX('+shift+'px)')
            
            
        //     }

    
    })

    /*let frinkData = data.filter(function(d) {return d.artist == 'Frink, Dame Elisabeth'});

    frinkData.sort(function(a, b) {return a.count - b.count})
    console.log('Frink Data', frinkData);

    // set the ranges
    var y = d3.scaleBand()
        .range([height, 0])
        .padding(0.1);

    var x = d3.scaleLinear()
        .range([0, width]);
    
    var svg = d3.select("#frink_viz").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data in the domains
    x.domain([0, d3.max(frinkData, function(d){ return d.count; })])
    y.domain(frinkData.map(function(d) { return d.medium_normalized; }));

    svg.selectAll(".bar")
        .data(frinkData)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("width", function(d) {return x(d.count); } )
        .attr("y", function(d) { return y(d.medium_normalized); })
        .attr("height", y.bandwidth()/2);

    var yAxis = d3.axisLeft()
        .scale(y)
        .tickSize(0)

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .call(g => g.select(".domain").remove())*/

    
    
});

 