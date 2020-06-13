d3.json("data/samples.json").then(function(data) {
    var sampleData = data.samples.map(row => row.sample_values);
    var id = data.samples.otu_ids;
    var labels = data.samples.otu_labels;

    console.log(sampleData);
});