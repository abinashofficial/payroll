// import React from 'react';
// import ReactApexChart from 'react-apexcharts';

// interface DonutChartProps {
//   // Define any props you may want to pass to the component
// }

// interface DonutChartState {
//   options: any;
//   series: number[];
// }

// class DonutChart extends React.Component<DonutChartProps, DonutChartState> {
//   constructor(props: DonutChartProps) {
//     super(props);

//     this.state = {
//       options: {
//         chart: {
//           type: 'donut'
//         },
//         labels: ['Team A', 'Team B', 'Team C', 'Team D'],
        // colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560']
//       },
//       series: [44, 55, 13, 43]
//     };
//   }

//   render() {
//     return (
      // <div>
      //   <h1>Donut Chart </h1>
      //   <ReactApexChart options={this.state.options} series={this.state.series} type="donut" height={350} />
      // </div>
//     );
//   }
// }

// export default DonutChart;


// DonutChart.tsx

import React from 'react';
import Chart from 'react-apexcharts';

interface DonutChartProps {
  data: {
    series: number[];
    labels: string[];
    colors: string[];

  };
}

const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
    },
    labels: data.labels,
    colors: data.colors,
    legend: {
      position: 'right',
      fontSize: '14px',
    },
    responsive: [
      {
        breakpoint: 1600, // large laptops & desktops
        options: {
          chart: {
            width: 400,
            height: 400,
          },
          legend: { position: 'right' },
        },
      },
      {
        breakpoint: 1280, // typical laptops
        options: {
          chart: {
            width: 350,
            height: 350,
          },
          legend: { position: 'bottom' },
        },
      },
      {
        breakpoint: 768, // tablets
        options: {
          chart: {
            width: 300,
            height: 300,
          },
          legend: { position: 'bottom' },
        },
      },
      {
        breakpoint: 480, // mobile devices
        options: {
          chart: {
            width: 250,
            height: 250,
          },
          legend: { position: 'bottom' },
        },
      },
    ],
  };
  return (
    <div>
      <Chart options={options} series={data.series} type="donut" width="100%" />
    </div>
  );
};

export default DonutChart;
