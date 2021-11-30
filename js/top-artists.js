var countObj = {};

d3.csv('data/female_artists_artwork.csv').then(data => {

    data.forEach(function(d){
        var artist = d.artist;
    if(countObj[artist] === undefined) {
        countObj[artist] = 1;
    } else {
        countObj[artist] = countObj[artist] + 1;
    }
    })

    console.log(countObj)

    var sortable = [];
    for (var art in countObj) {
        sortable.push([art, countObj[art]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    console.log(sortable.slice(0,10))
});