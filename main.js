// Import files for necessary visualizations

Promise.all([
    d3.csv("data/female_artists_artwork.csv", d3.autoType),
  ]).then(data => {
      let female_art = data[0];

      console.log("Female artists and artwork", female_art);

      // World Map showing where paintings were created

      // Pie chart showing gender breakdown of artwork

      // Bar chart for artwork counts

      // Word cloud to display the kinds of artwork

      // Scatterplot showing the dimensions of artwork and artwork medium

     

  })