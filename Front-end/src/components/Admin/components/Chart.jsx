import React from 'react'
import Chart  from "react-apexcharts";
function ShopChart(props) {
    if(props.data)
    {
    console.log([props.data.accStat, props.data.prodStat, props.data.catStat, props.data.orderStat])
    }
    const state = {
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: ["Products" , "Users","Categories", "Orders" ],
            labels : {
              style: {
                fontSize: "14px",
                colors: "white",
                backgroundColor: "#ffff",
                cssClass: "chart-label-x",
              },
            }
          }
        },
        series: [
          {
            name: "series-1",
            data: props.data ? [ props.data.prodStat,props.data.accStat, props.data.catStat, props.data.orderStat] : []
          }
        ]
      };
  return (
    <div className= {`${props.className} d-flex justify-content-center`}>
          <div className="mixed-chart ">
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