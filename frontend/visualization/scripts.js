async function fetchChartData(apiUrl, chartId, interpretationId, spinnerId) {
  try {
    // Show spinner
    document.getElementById(spinnerId).style.display = "block";

    // Fetch chart data from API
    const response = await axios.get(apiUrl);
    const chartData = response.data;

    // Hide spinner
    document.getElementById(spinnerId).style.display = "none";

    // Render chart with responsive option
    Plotly.react(chartId, chartData, {
      responsive: true, // Ensure the chart is responsive
      displayModeBar: false, // Hide the mode bar if not needed
    });

    // Provide interpretation for the chart
    provideInterpretation(chartId, interpretationId);
  } catch (error) {
    console.error("Error fetching chart data:", error);
  }
}

function provideInterpretation(chartId, interpretationId) {
  let interpretationText;

  switch (chartId) {
    case "line-chart":
      interpretationText =
        "Disease Trends Over Time represented by the line chart. This chart offers a longitudinal view of various diseases, unveiling patterns and trends over extended periods. The line chart helps us observe seasonal fluctuations and pinpoint periods of significant increases or decreases in disease prevalence. Such insights are quintessential for proactive planning and timely interventions.";
      break;
    case "pie-chart":
      interpretationText =
        "Disease Distribution displayed by the pie chart, we gain a snapshot of disease prevalence ratios within the population. This visual representation highlights which diseases command the largest share. Identifying these proportions is crucial in allocating resources and attention, ensuring that public health campaigns and medical supplies are tailor-fit to address the most pressing health concerns.";
      break;
    case "bar-chart":
      interpretationText =
        "The Regional Disease Cases Comparison represented by the bar chart provides a comparative analysis of disease impact across different regions. This chart is instrumental in localizing health interventions, as it shows us which regions are disproportionately affected. By targeting these high-burden areas, we can optimize health outcomes and efficiency in resource distribution.";
      break;
    case "heatmap-chart":
      interpretationText =
        "The Heatmap of Disease Cases gives us a geographical representation of disease hotspots. This high-resolution density map brings forth areas with concentrated disease cases, providing vital data for tactical resource allocation. By visualizing the spread, we can focus our public health efforts more precisely.";
      break;
    case "prediction-chart":
      interpretationText =
        "Predicted Disease Cases chart, which projects future trends for up to 30 years. This forward-looking chart equips policymakers with the foresight needed for long-term health planning. Projections allow us to anticipate and mitigate future health challenges before they manifest severely.";
      break;
  }

  document.getElementById(
    interpretationId
  ).innerHTML = `<strong>Interpretation:</strong> ${interpretationText}`;
}

// Load charts on page load
document.addEventListener("DOMContentLoaded", function () {
  fetchChartData(
    "http://localhost:3000/api/plots/disease-trend",
    "line-chart",
    "line-chart-interpretation",
    "line-chart-spinner"
  );
  fetchChartData(
    "http://localhost:3000/api/plots/disease-distribution",
    "pie-chart",
    "pie-chart-interpretation",
    "pie-chart-spinner"
  );
  fetchChartData(
    "http://localhost:3000/api/plots/disease-comparison",
    "bar-chart",
    "bar-chart-interpretation",
    "bar-chart-spinner"
  );
  fetchChartData(
    "http://localhost:3000/api/plots/disease-heatmap",
    "heatmap-chart",
    "heatmap-chart-interpretation",
    "heatmap-chart-spinner"
  );
  fetchChartData(
    "http://localhost:3000/api/plots/disease-prediction",
    "prediction-chart",
    "prediction-chart-interpretation",
    "prediction-chart-spinner"
  );
});

// Refresh charts every 10 minutes
setInterval(function () {
  fetchChartData(
    "http://localhost:3000/api/plots/disease-trend",
    "line-chart",
    "line-chart-interpretation",
    "line-chart-spinner"
  );
  fetchChartData(
    "http://localhost:3000/api/plots/disease-distribution",
    "pie-chart",
    "pie-chart-interpretation",
    "pie-chart-spinner"
  );
  fetchChartData(
    "http://localhost:3000/api/plots/disease-comparison",
    "bar-chart",
    "bar-chart-interpretation",
    "bar-chart-spinner"
  );
  fetchChartData(
    "http://localhost:3000/api/plots/disease-heatmap",
    "heatmap-chart",
    "heatmap-chart-interpretation",
    "heatmap-chart-spinner"
  );
  fetchChartData(
    "http://localhost:3000/api/plots/disease-prediction",
    "prediction-chart",
    "prediction-chart-interpretation",
    "prediction-chart-spinner"
  );
}, 600000);
