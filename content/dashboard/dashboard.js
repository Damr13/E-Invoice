// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Chart 1

// Create chart instance
var chart = am4core.create("chart1", am4charts.PieChart);

// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "litres";
pieSeries.dataFields.category = "country";

// Let's cut a hole in our Pie chart the size of 30% the radius
chart.innerRadius = am4core.percent(40);

// Put a thick white border around each Slice
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;
pieSeries.slices.template
  // change the cursor on hover to make it apparent the object can be interacted with
  .cursorOverStyle = [
    {
      "property": "cursor",
      "value": "pointer"
    }
  ];


// Disable ticks and labels
pieSeries.labels.template.disabled = true;
pieSeries.ticks.template.disabled = true;

// Create a base filter effect (as if it's not there) for the hover to return to
var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
shadow.opacity = 0;

// Add a legend
chart.legend = new am4charts.Legend();

// Rectangle Marker Legend
chart.legend.useDefaultMarker = true;
var markerTemplate = chart.legend.markers.template;
markerTemplate.width = 15;
markerTemplate.height = 15;

// Add data
chart.data = [{
  "country": "Approve",
  "litres": 501.9
}, {
  "country": "Reject",
  "litres": 301.9
},  {
  "country": "Pending",
  "litres": 60
}, {
  "country": "Process",
  "litres": 50
}];

// Chart 2

// Create chart instance
var chart2 = am4core.create("chart2", am4charts.PieChart);

// Add and configure Series
var pieSeries = chart2.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "litres";
pieSeries.dataFields.category = "country";

// Let's cut a hole in our Pie chart the size of 30% the radius
chart2.innerRadius = am4core.percent(40);

// Put a thick white border around each Slice
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;
pieSeries.slices.template
  // change the cursor on hover to make it apparent the object can be interacted with
  .cursorOverStyle = [
    {
      "property": "cursor",
      "value": "pointer"
    }
  ];


// Disable ticks and labels
pieSeries.labels.template.disabled = true;
pieSeries.ticks.template.disabled = true;

// Create a base filter effect (as if it's not there) for the hover to return to
var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
shadow.opacity = 0;

// Add a legend
chart2.legend = new am4charts.Legend();

// Rectangle Marker Legend
chart2.legend.useDefaultMarker = true;
var markerTemplate = chart2.legend.markers.template;
markerTemplate.width = 15;
markerTemplate.height = 15;

// Add data
chart2.data = [{
  "country": "Approve",
  "litres": 40
}, {
  "country": "Reject",
  "litres": 500
},  {
  "country": "Pending",
  "litres": 60
}, {
  "country": "Process",
  "litres": 20
}];

// Chart 3

// Create chart instance
var chart3 = am4core.create("chart3", am4charts.PieChart);

// Add and configure Series
var pieSeries = chart3.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "litres";
pieSeries.dataFields.category = "country";

// Let's cut a hole in our Pie chart the size of 30% the radius
chart3.innerRadius = am4core.percent(40);

// Put a thick white border around each Slice
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;
pieSeries.slices.template
  // change the cursor on hover to make it apparent the object can be interacted with
  .cursorOverStyle = [
    {
      "property": "cursor",
      "value": "pointer"
    }
  ];


// Disable ticks and labels
pieSeries.labels.template.disabled = true;
pieSeries.ticks.template.disabled = true;

// Create a base filter effect (as if it's not there) for the hover to return to
var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
shadow.opacity = 0;

// Add a legend
chart3.legend = new am4charts.Legend();

// Rectangle Marker Legend
chart2.legend.useDefaultMarker = true;
var markerTemplate = chart3.legend.markers.template;
markerTemplate.width = 15;
markerTemplate.height = 15;

// Add data
chart3.data = [{
  "country": "Approve",
  "litres": 20
}, {
  "country": "Reject",
  "litres": 50
},  {
  "country": "Pending",
  "litres": 40
}, {
  "country": "Process",
  "litres": 10
}];

// Chart 4

// Create chart instance
var chart4 = am4core.create("chart4", am4charts.PieChart);

// Add and configure Series
var pieSeries = chart4.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "litres";
pieSeries.dataFields.category = "country";

// Let's cut a hole in our Pie chart the size of 30% the radius
chart4.innerRadius = am4core.percent(40);

// Put a thick white border around each Slice
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;
pieSeries.slices.template
  // change the cursor on hover to make it apparent the object can be interacted with
  .cursorOverStyle = [
    {
      "property": "cursor",
      "value": "pointer"
    }
  ];

// Disable ticks and labels
pieSeries.labels.template.disabled = true;
pieSeries.ticks.template.disabled = true;

// Create a base filter effect (as if it's not there) for the hover to return to
var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
shadow.opacity = 0;

// Add a legend
chart4.legend = new am4charts.Legend();

// Rectangle Marker Legend
chart4.legend.useDefaultMarker = true;
var markerTemplate = chart4.legend.markers.template;
markerTemplate.width = 15;
markerTemplate.height = 15;

// Add data
chart4.data = [{
  "country": "Approve",
  "litres": 55
}, {
  "country": "Reject",
  "litres": 80
},  {
  "country": "Pending",
  "litres": 10
}, {
  "country": "Process",
  "litres": 300
}];

am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create chart instance
    var chart = am4core.create("bar-chart", am4charts.XYChart3D);

    // Add percent sign to all numbers
    chart.numberFormatter.numberFormat = "#.#'M'";
    
    // Add data
    chart.data = [{
      "country": "PT. Jaya Abadi",
      "visits": 10
    }, {
      "country": "PT. SGP Electronic",
      "visits": 80
    }, {
      "country": "PT. Digital Optima Integra",
      "visits": 60
    }, {
      "country": "PT. Reksama",
      "visits": 50
    }, {
      "country": "PT. Sarana Budi",
      "visits": 30
    }, {
      "country": "PT. Erlangga ",
      "visits": 40
    }, {
      "country": "PT. Techno Solution",
      "visits": 90
    }, {
      "country": "PT. Kruzen",
      "visits": 20
    }, {
      "country": "PT. Pambors Sejahtera",
      "visits": 10
    }, {
      "country": "PT. Web Cikarang",
      "visits": 30
    }, {
      "country": "PT. Igra Indonesia",
      "visits": 70
    }, {
      "country": "PT. Damran Indonesia",
      "visits": 70
    }];
    
    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "country";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.renderer.labels.template.hideOversized = false;
    categoryAxis.renderer.minGridDistance = 20;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.tooltip.label.rotation = 270;
    categoryAxis.tooltip.label.horizontalCenter = "right";
    categoryAxis.tooltip.label.verticalCenter = "middle";
    
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Amount (IDR)";
    valueAxis.title.fontWeight = "bold";
    
    // Create series
    var series = chart.series.push(new am4charts.ColumnSeries3D());
    series.dataFields.valueY = "visits";
    series.dataFields.categoryX = "country";
    series.name = "Visits";
    series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .9;
    
    var columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
    columnTemplate.stroke = am4core.color("#FFFFFF");
    
    columnTemplate.adapter.add("fill", function(fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    })
    
    columnTemplate.adapter.add("stroke", function(stroke, target) {
      return chart.colors.getIndex(target.dataItem.index);
    })
    
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.lineX.strokeOpacity = 0;
    chart.cursor.lineY.strokeOpacity = 0;
    
    }); // end am4core.ready()