// Function to build all plots
function buildPlots(id) {
    d3.json("data/samples.json").then((data)=> {
  
        var wfreq = data.metadata.map(d => d.wfreq)
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        var sampleData = samples.sample_values.slice(0, 10).reverse();
        var toptenOTU = (samples.otu_ids.slice(0, 10)).reverse();
        var otuID = toptenOTU.map(d => "OTU " + d);
        var labels = samples.otu_labels.slice(0, 10);

        // Create Bar Chart
        var traceBar = {
            x: sampleData,
            y: otuID,
            text: labels,
            marker: {
              color: "rgb(51, 115, 167)"
              },
            type:"bar",
            orientation: "h",
        };

        var dataBar = [traceBar];

        var layoutBar = {
            title: "Top 10 OTU Per Subject",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 80,
                r: 50,
                t: 80,
                b: 25
            }
        };

        Plotly.newPlot("bar", dataBar, layoutBar);
      
        // Create Bubble Chart
        var traceBubble = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
  
        };

        var layoutBubble = {
            xaxis:{
                title: "OTU ID"
            },
            height: 800,
            width: 1250
        };

        var dataBubble = [traceBubble];

        Plotly.newPlot("bubble", dataBubble, layoutBubble); 
  
        // Create Gauge Chart
        var dataGauge = [
          {
          domain: { x: [0, 1], y: [0, 1] },
          value: parseFloat(wfreq),
          title: { text: `Weekly Washing Frequency ` },
          type: "indicator",
          
          mode: "gauge+number",
          gauge: { axis: { range: [null, 9] },
                   steps: [
                    { range: [0, 2], color: "yellow" },
                    { range: [2, 4], color: "orange" },
                    { range: [4, 6], color: "red" },
                    { range: [6, 8], color: "lime" },
                    { range: [8, 10], color: "green" },
                  ]}
              
          }
        ];
        var layoutGauge = { 
            width: 600, 
            height: 500, 
            margin: { 
                t: 20, 
                b: 20, 
                l: 50, 
                r: 50 } 
          };
        Plotly.newPlot("gauge", dataGauge, layoutGauge);
      });
  }  

// Function to get the demographic info
function getDemographicInfo(id) {
    d3.json("data/samples.json").then((data)=> {

        var metadata = data.metadata;
        var demographicData = metadata.filter(m => m.id.toString() === id)[0];
        var metadataPanel = d3.select("#sample-metadata");
        
        metadataPanel.html("");

        Object.entries(demographicData).forEach((key) => {   
                metadataPanel.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
}

// Functin to update plots on change
function updatePlots(id) {
    buildPlots(id);
    getDemographicInfo(id);
}

// Function to initialize the page data
function init() {
    d3.json("data/samples.json").then((data)=> {

    var dropdown = d3.select("#selDataset");

    data.names.forEach(function(name) {
        dropdown.append("option").text(name).property("value");
    });

    buildPlots(data.names[0]);
    getDemographicInfo(data.names[0]);
});

}

init();