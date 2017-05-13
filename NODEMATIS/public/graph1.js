Plotly.d3.csv('upload/absdonnees.csv', function(err, rows){
function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}

var z_data=[];
for(i=1;i<512;i++) {
  var degHead = 'deg-'+i;
  var z = unpack(rows,degHead);
  z_data.push(unpack(rows,degHead));
}

var new_z = z_data[0].map(function(col, i) {
  return z_data.map(function(row) {
    return row[i]
  })
});

var data = [{
           z: new_z,
           type: 'heatmap'
        }];

var layout = {
  autosize: false,
  width: 750,
  height: 260,
  margin: {
    l: 20,
    r: 20,
    b: 20,
    t: 0,
  }
};
Plotly.newPlot('myDiv1', data, layout);
});
