Plotly.d3.csv('upload/absdonnees.csv', function(err, rows){
function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}


var x_data = [];
var y_data = [];
for(i=1;i<512;i++) {
  var degHead = 'deg-'+i;
  var z = unpack(rows,degHead);
  y_data.push(unpack(rows,degHead));
}
console.log(y_data);
var fmin = 0;
var fmax = 18;
var step = (fmax - fmin)/256;

for (var j=0; j<257; j++) {
  f = fmin + j*step;
  x_data.push( f );
}

var data = [{
  line: {                             // set the width of the line.
      width: 1
    },
  x: x_data,
  y: y_data[3]
}];

        var layout = {
          yaxis: {title: "Amplitude du signal SER"},
          xaxis: {title: "Fréquence (e9.Hz)"},
          autosize: true,
          width: 750,
          height: 200,
          margin: {
            l: 40,
            r: 20,
            b: 40,
            t: 20,
          }
        };
Plotly.newPlot('myDiv4', data, layout);
});
