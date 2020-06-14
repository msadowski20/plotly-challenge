function buildPlots(entry) {
    d3.json("data/samples.json").then((data) => {
    var sampleData = data.samples.map(row => row.sample_values);
    var ids = data.samples.map(row => row.otu_ids);
    var labels = data.samples.map(row => row.otu_labels);
    var wfreq = data.metadata.map(row => row.wfreq);

    var topTenSamples = sampleData.map(row => row.slice(0, 10));
    var topTenIds = ids.map(row => row.slice(0,10));
    var topTenLabels = labels.map(row => row.slice(0, 10));

    // console.log(wfreq);
    // console.log(sampleData);
    // console.log(ids);
    // console.log(labels);
    // console.log(topTenSamples[0]);
    // console.log(topTenIds[0]);
    // console.log(topTenLabels[0]);

    // function init() {
    //     data = [{
    //         x: topTenSamples[0],
    //         y: topTenIds[0],
    //         type: "bar",
    //         orientation: "h"}]
        
    //     Plotly.newPlot("bar", data);
    // }


    // Bar Chart
    var trace1 = {
        x: topTenSamples[0],
        y: topTenIds[0],
        text: topTenLabels[0],
        marker: {
            color: "blue",
            width: 1
        },
        type: "bar",
        orientation: "h"
    }

    var data1 = [trace1];

    var layout1 = {
        title: "Top Ten Biodiversities",
    }

    Plotly.newPlot("bar", data1, layout1);

    // Gauge Chart
    var data2 = [{
        domain: {
            x: [0, 1],
            y: [0, 1]
        },
        value: wfreq[0],
        title: {
            text: "Wash Frequency"
        },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: {
                range: [null, 9]
            },
            steps: [{
                    range: [0, 2],
                    color: "red"
                },
                {
                    range: [2, 4],
                    color: "orange"
                },
                {
                    range: [4, 6],
                    color: "yellow"
                },
                {
                    range: [6, 8],
                    color: "lime"
                },
                {
                    range: [8, 9],
                    color: "green"
                },
            ]
        }
    }];


    Plotly.newPlot("gauge", data2);

    // Bubble Chart
    var trace3 = {
        x: topTenIds[0],
        y: topTenSamples[0],
        text: topTenLabels[0],
        mode: "markers",
        markers: {
            size: topTenSamples[0],
            color: topTenIds[0]
        }
    }

    var data3 = [trace3];

    var layout3 = {
        title: "Top Ten Biodiversities",
    }

    Plotly.newPlot("bubble", data3, layout3);

});
}

// Function for getting Demographic info
function getDemographicInfo(entry) {
    // read the json file to get data
    d3.json("Data/samples.json").then((data) => {

        var metadata = data.metadata;

        var result = metadata.filter(row => row.id.toString() === entry)[0];

        var demographicInfo = d3.select("#sample-metadata");

        demographicInfo.html("");

        Object.entries(result).forEach((key) => {
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
        });
    });
}

