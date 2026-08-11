import React from "react";
import ReactApexChart from "react-apexcharts";
import { BarAndLineStyle } from "./BarAndLine.style";
import * as ReactDOMServer from "react-dom/server";
import {
  getArrayOfLast90DaysFromToday,
  hasOnlyZeros,
  numberWithCommas,
} from "../../utils/helpers";
import { EmptyGraph } from "../EmptyGraph/EmptyGraph";

class BarAndLineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Balance",
          data: this.props.balance,
        },
        // {
        //     name: "DateLabels",
        //     data: getArrayOfLast90DaysFromToday(),
        // },
        // {
        //     name: "date labels",
        //     type: "line",
        //     data: this.props.dataLabels,
        // },
      ],
      options: {
        noData: {
          text: "Loading...",
        },
        markers: {
          size: 0,
          colors: "#F9884C",
          strokeColors: "#F9884C",
          strokeWidth: 2,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          shape: "circle",
          radius: 2,

          onClick: undefined,
          onDblClick: undefined,
          showNullDataPoints: true,
          hover: {
            size: 4,
            sizeOffset: 3,
          },
        },
        tooltip: {
          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            return ReactDOMServer.renderToStaticMarkup(
              <label className="tool-tip">
                <h5>
                  ₦
                  {numberWithCommas(
                    w.globals.initialSeries[0].data[dataPointIndex]
                  )}
                </h5>
                <h6>{getArrayOfLast90DaysFromToday()[dataPointIndex]}</h6>
              </label>
            );
          },
        },
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          // curve: "straight",

          show: true,
          curve: "straight",
          lineCap: "butt",
          colors: "#E3452F",
          width: 2,
          dashArray: 0,
        },
        // title: {
        //     text: "Product Trends by Month",
        //     align: "left",
        // },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: this.props.labels,
          labels: {
            style: {
              fontSize: "12px",
              fontFamily: "Inter, Arial, sans-serif",
              fontWeight: 400,
              cssClass: "apexcharts-yaxis-label",
            },
            rotate: 0,
          },
          tickAmount: 10,
        },
        yaxis: {
          opposite: false,
          show: false,
          title: {
            text: "",
          },
        },
      },
    };
  }

  render() {
    return hasOnlyZeros(this.props.balance) ? (
      <EmptyGraph />
    ) : (
      <BarAndLineStyle>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
        />
      </BarAndLineStyle>
    );
  }
}

export default BarAndLineChart;
