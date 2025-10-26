import React from 'react';
import ApexCharts from './ApexCharts';

const LineChartMonth: React.FC = () => {

  const chart4SeriesData = [
    {
      name: "Pending",
      data: [10, 31, 65, 91, 5, 92, 69, 31, 1010]
    },
    {
      name: "Approved",
      data: [28, 69, 93, 81, 62, 42, 33 , 21, 34]
    },
    {
      name: "Rejected",
      data: [12, 41, 84, 118, 97, 83, 63 , 41, 14]
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
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

export default LineChartMonth;


// import React from 'react';
// import Chart from 'react-apexcharts';

// const LineChart: React.FC = () => {
//   const options = {
//     series: [
//       {
//         name: "Session Duration",
//         data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
//       },
//       {
//         name: "Page Views",
//         data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
//       },
//       {
//         name: 'Total Visits',
//         data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
//       }
//     ],
//     chart: {
//       type: 'line',
//       zoom: {
//         enabled: false
//       },
//     },
//     dataLabels: {
//       enabled: false
//     },
//     stroke: {
//       width: [5, 7, 5],
//       curve: 'straight',
//       dashArray: [0, 8, 5]
//     },
//     title: {
//       text: 'Page Statistics',
//       align: 'left'
//     },
//     legend: {
//       position: 'top'
//     },
//     markers: {
//       size: 0,
//       hover: {
//         sizeOffset: 6
//       }
//     },
//     xaxis: {
//       categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
//         '10 Jan', '11 Jan', '12 Jan'
//       ],
//     },
//     tooltip: {
//       y: [
//         {
//           title: {
//             formatter: function (val: number) {
//               return val + " (mins)"
//             }
//           }
//         },
//         {
//           title: {
//             formatter: function (val: number) {
//               return val + " per session"
//             }
//           }
//         },
//         {
//           title: {
//             formatter: function (val: number) {
//               return val.toString();
//             }
//           }
//         }
//       ]
//     },
//     grid: {
//       borderColor: '#f1f1f1',
//     }
//   };

//   return (
//     <div id="chart" style={{ width: '100%', height: '400px' }}>
//       <Chart options={options} series={options.series} type="line" />
//     </div>
//   );
// };

// export default LineChart;


