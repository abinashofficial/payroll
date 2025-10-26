


import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface SeriesData {
  name: string;
  data: number[];
}

interface ApexChartProps {}

interface ApexChartState {
  series: SeriesData[];
  options: ApexCharts.ApexOptions;
}

class BarChart extends React.Component<ApexChartProps, ApexChartState> {
  constructor(props: ApexChartProps) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Ground Component',
          data: [44]
        },
        {
          name: 'Consumable Component',
          data: [76]
        },
        {
          name: 'Flight Component',
          data: [35]
        }
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['Today'],
        },
        yaxis: {
          title: {
            // text: 'Requests'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val: any) {
              return val 
            }
          }
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
      }
    };
  }

  render() {
    return (
      <div>
        <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default BarChart;
