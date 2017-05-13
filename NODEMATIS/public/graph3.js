function makeplot() {
  Plotly.d3.csv("upload/resultfinal.csv", function(data){ processData(data) } );

};

function processData(allRows) {

  console.log(allRows);
  var x = [], y = [], standard_deviation = [];

  var fmin = 0;
  var fmax = 18;
  var step = (fmax - fmin)/256;

  for (var j=0; j<257; j++) {
    f = fmax - j*step;
    x.push( -f );
  }
  for (var j=1; j<258; j++) {
    f = fmin + j*step;
    x.push( f );
  }


  var row = allRows[1];
  for (var i=1; i<=512; i++) {
    y.push( row['deg-'+i] );
  }
  console.log( row );
  console.log( 'X',x, 'Y',y, 'SD',standard_deviation );
  makePlotly( x, y, standard_deviation );
}

function makePlotly( x, y, standard_deviation ){
  var plotDiv = document.getElementById("plot");
  var traces = [{
    line: {                             // set the width of the line.
        width: 1
      },
    x: x,
    y: y
  }];

  var layout = {
    yaxis: {title: "Amplitude du signal SER"},
    xaxis: {title: "Fréquence (e9.Hz)"},
    autosize: true,
    width: 750,
    height: 290,
    margin: {
      l: 40,
      r: 20,
      b: 40,
      t: 20,
    }
  };

  Plotly.newPlot('myDiv3', traces, layout,
    {xaxis: 'Plotting CSV data from AJAX call'});
};
  makeplot();
