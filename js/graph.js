/*global google*/
/*eslint no-undef: "error"*/

export class Graph {
  constructor(callback) {
    google.charts.load("current", { packages: ["corechart", "line"] });
    google.charts.setOnLoadCallback(callback);
  }

  drawSingleLineChart(rows, columns, hAxis, vAxis, elementId, backgroundColor) {
    var data = new google.visualization.DataTable();

    for (var i = 0; i < columns.length; i++) {
      data.addColumn("number", columns[i]);
    }

    data.addRows(rows);

    var options = {
      hAxis: {
        title: hAxis
      },
      vAxis: {
        title: vAxis
      },
      backgroundColor: backgroundColor
    };

    var chart = new google.visualization.LineChart(
      document.getElementById(elementId)
    );
    chart.draw(data, options);
  }
}
