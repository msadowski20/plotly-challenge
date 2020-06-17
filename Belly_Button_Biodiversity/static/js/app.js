// Function to build all plots
function buildPlots(subject) {
    d3.json("data/samples.json").then((data) => {

        // var wfreq = data.metadata.map(m => m.wfreq);
        var metadata = data.metadata.filter(m => m.id.toString() === subject)[0];
        var wfreq = metadata.wfreq;
        var samples = data.samples.filter(s => s.id.toString() === subject)[0];
        var sampleData = samples.sample_values.slice(0, 10).reverse();
        var otuData = (samples.otu_ids.slice(0, 10)).reverse();
        var otuID = otuData.map(d => `OTU ${d}`);
        var labels = samples.otu_labels.slice(0, 10);

        // Create Bar Chart
        var traceBar = {
            x: sampleData,
            y: otuID,
            text: labels,
            marker: {
                color: "rgb(51, 115, 167)"
            },
            type: "bar",
            orientation: "h",
        };

        var dataBar = [traceBar];

        var layoutBar = {
            title: "Top 10 OTU Per Subject",
            yaxis: {
                tickmode: "linear",
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
            xaxis: {
                title: "OTU ID"
            },
            height: 800,
            width: 1250
        };

        var dataBubble = [traceBubble];

        Plotly.newPlot("bubble", dataBubble, layoutBubble);

        // Create Gauge Chart
        var dataGauge = [{
            domain: {
                x: [0, 1],
                y: [0, 1]
            },
            value: parseInt(wfreq),
            title: {
                text: `Weekly Washing Frequency`,
                font: {
                    size: 40
                }
            },
            type: "indicator",

            mode: "gauge+number",
            gauge: {
                axis: {
                    range: [null, 9]
                },
                bar: {
                    color: "rgb(51, 115, 167)"
                },
                steps: [{
                        range: [0, 2],
                        color: "white"
                    },
                    {
                        range: [2, 4],
                        color: "white"
                    },
                    {
                        range: [4, 6],
                        color: "white"
                    },
                    {
                        range: [6, 8],
                        color: "white"
                    },
                    {
                        range: [8, 10],
                        color: "white"
                    },
                ]
            }
        }];

        var layoutGauge = {
            width: 600,
            height: 500,
            margin: {
                t: 20,
                b: 20,
                l: 50,
                r: 50
            },
            paper_bgcolor: "rgb(51, 115, 167)",
            font: {
                color: "white",
                size: 20
            }
        };

        Plotly.newPlot("gauge", dataGauge, layoutGauge);
    });
}

// Function to get the demographic info
function getDemographicInfo(subject) {
    d3.json("data/samples.json").then((data) => {

        var metadata = data.metadata;
        var demographicData = metadata.filter(m => m.id.toString() === subject)[0];
        var metadataPanel = d3.select("#sample-metadata");

        metadataPanel.html("");

        Object.entries(demographicData).forEach((key) => {
            metadataPanel.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

// Functin to update plots on change
function updatePlots(subject) {
    buildPlots(subject);
    getDemographicInfo(subject);
}

// Function to initialize the page data
function init() {
    d3.json("data/samples.json").then((data) => {

        var dropdownMenu = d3.select("#selDataset");

        data.names.forEach(function (name) {
            dropdownMenu.append("option").text(name).property("value");
        });

        buildPlots(data.names[0]);
        getDemographicInfo(data.names[0]);
    });

}

init();