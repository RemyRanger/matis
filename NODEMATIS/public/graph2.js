Plotly.d3.csv('upload/absdonnees.csv', function(err, rows){
function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}

var deg = [];
for (var k=0; k<512; k++) {
  deg[k] = (6.28/512)*k;
}

var z_data=[];
var x_data = [];
var y_data = [];
for(i=1;i<512;i++) {
  var degHead = 'deg-'+i;
  var z = unpack(rows,degHead);
  z_data.push(unpack(rows,degHead));
  var x_row = [];
  var y_row = [];
  for(j=1;j<512;j++) {
    x_row.push(Math.cos(deg[i])*j);
    y_row.push(Math.sin(deg[i])*j);
  }
  x_data.push(x_row);
  y_data.push(y_row);
}

var data = [{
            x: x_data,
            y: y_data,
           z: z_data,
           type: 'surface'
        }];

var layout = {
  autosize: false,
  width: 600,
  height: 600,
  margin: {
    l: 0,
    r: 0,
    b: 0,
    t: 0,
  }
};
Plotly.newPlot('myDiv2', data, layout);
});
