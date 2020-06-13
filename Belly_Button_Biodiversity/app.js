d3.json("data/samples.json").then((data) => {
    var sampleData = data.samples.map(row => row.sample_values);
    var ids = data.samples.map(row => row.otu_ids);
    var labels = data.samples.map(row => row.otu_labels);

    console.log(sampleData);
    console.log(ids);
    console.log(labels);
});

