import React from 'react';
import ApexCharts from './ApexCharts';

const LineChartToday: React.FC = () => {


  const chart4SeriesData = [
    {
      name: "Pending",
      data: [10, 31, 65, 91, 5, 92]
    },
    {
      name: "Approved",
      data: [28, 69, 93, 81, 62, 42]
    },
    {
      name: "Rejected",
      data: [12, 41, 84, 118, 97, 83]
    }
    ];
  
    const chart4Options = {
      chart: {
        width:565,
        // height: 300,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Overall Requests',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: ['12:00 AM', '4:00 AM', '8:00 AM', '12:00 PM', '4:00 PM', '8:00 PM'],
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
      <ApexCharts seriesData={chart4SeriesData} chartOptions={chart4Options} chartType="line" function_name="single_bar_chart" />

    </div>
  );
};

export default LineChartToday;