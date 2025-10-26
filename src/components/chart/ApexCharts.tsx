import React from "react";
import ReactApexChart from "react-apexcharts";



interface ApexChartProps {
  seriesData: any;
  chartOptions: any;
  chartType: "line" | "area" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "radar" | "polarArea" | "rangeBar" | "rangeArea" | "treemap";
  function_name : string;
}

const ApexCharts: React.FC<ApexChartProps> = ({ seriesData, chartOptions, chartType , function_name }) => {
  const renderChart = () => {
    switch (function_name) {
      case "donut_chart":
        return (
          <ReactApexChart options={chartOptions} series={seriesData.map((data: { data: any; }) => data.data)} type={chartType} width={chartOptions.chart.width} />
        );
      case "single_bar_chart":
        return (
          <ReactApexChart options={chartOptions} series={seriesData} type={chartType} height={chartOptions.chart.height}  width={chartOptions.chart.width} />
        );
      case "pie_chart":
        return (
          <ReactApexChart options={chartOptions} series={seriesData} type={chartType} width={chartOptions.chart.width} height={chartOptions.chart.height}  />
        );
      // Add cases for other chart types as needed
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="chart-wrap">
        <div id="chart">
          {renderChart()}
        </div>
      </div>
    </div>
  );
};

export default ApexCharts;