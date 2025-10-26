import React from 'react';
import ApexCharts from './ApexCharts';


interface PieChartProps {
  width?: number;
  height?: number;
}

const PieChart: React.FC<PieChartProps> = () => {


  const chart3SeriesData = [44, 55, 13]

  const chart3Options = {
    chart: {
      width: 560,
      // height:500,
      type: 'pie',
      toolbar: {
        show: true
      },
    },
    labels: ['Approved', 'Pending', 'Rejected'],
    colors: ['#CDA8FE', '#D5E2FF', '#FF8B7B'],

    legend: {
      position: "right",
      offsetY: 0,
      height: 100,
    },
          responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 250,
          height: 250,
        },
        legend: {
          position: "bottom",
          offsetY: 0,
          height: 20,
        },
      }
    }]
  };

  return (
    <div id="chart">
              <h4 style={{
          fontWeight:"900",
          fontSize:"14px",
          fontFamily: "Helvetica, Arial, sans-serif",
          opacity:"1",
        }}>Over All Requests</h4>
      <ApexCharts seriesData={chart3SeriesData} chartOptions={chart3Options} chartType="pie" function_name="pie_chart" />

    </div>
  );
};

export default PieChart;


