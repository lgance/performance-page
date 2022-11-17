import React from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(()=> import('react-apexcharts'),{ssr:false});

// 리스트 샘플입니다.
function ChartComponent(props:any){
  let { webTestData } = props;

  let state:any = {
    series: [{
      name: "Test Metric",
      data: webTestData
    },
  ],

    options: {  
      chart: {
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Web Test Performance Data',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: 
        ['Total', 'Redirect', 'Cache', 'Dnslookup', 'Connect(TCP)', 'Request', 'Response', 'DOM Rendering', 'Load','PageEnd','NetworkDelay'],
      }
    }
  }

  return (
  <>
      <ApexCharts
        options={state.options}
        series={state.series}
        typs='line'
        width={'90%'}
        height={450}  
      /> 
  </>
  )
}

export default ChartComponent;
