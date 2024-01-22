import React from 'react'
import Chart  from "react-apexcharts";
function ShopChart(props) {
    const state = {
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
          }
        },
        series: [
          {
            name: "series-1",
            data: [30, 40, 45, 50, 49, 60, 70, 91]
          }
        ]
      };
  return (
    <div className= {`${props.className} d-flex justify-content-center`}>
          <div className="mixed-chart">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              width="500"
            />
          </div>
      </div>
  )
  }

export default ShopChart