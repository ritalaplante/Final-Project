// Import files for necessary visualizations

Promise.all([
    d3.csv("data/artist_data.csv",d3.autoType),
    d3.csv("data/artwork_data.csv",d3.autoType)
  ]).then(data => {
      let artist_data = data[0];
      let artwork_data = data[1];

      // World Map showing where paintings were created

      // Pie chart showing gender breakdown of artwork

      // Bar chart for artwork counts

      // Word cloud to display the kinds of artwork

      // Scatterplot showing the dimensions of artwork and artwork medium

     

  })