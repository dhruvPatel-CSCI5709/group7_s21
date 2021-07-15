import React, { useRef, useEffect, useState } from "react";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./chart.css";

const CreateChart = ({ options, data, type, plugins, keyInfo }) => {
  const myChart = useRef();
  const [chartInstance, setChartInstance] = useState(null);
  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }
    console.log("Chart Initiate=", keyInfo, data);
    Chart.plugins.unregister(ChartDataLabels);
    // Chart.defaults.scales.xAxis[0].ticks.beginAtZero = true;
    const chartInstanceTemp = new Chart(myChart.current.getContext("2d"), {
      type: type,
      data: data,
      options: type === "bar" ? options : { ...options, scales: {} },
      plugins: [ChartDataLabels],
    });
    setChartInstance(chartInstanceTemp);
  }, [options, data, type, plugins]);
  return (
    <canvas
      className="chart-canvas"
      style={{ maxHeight: 500, maxWidth: 500, margin: "10px auto" }}
      ref={myChart}
    ></canvas>
  );
};

export default CreateChart;
