import React from "react";
import ReactApexChart from "react-apexcharts";
import { BarAndLineStyle } from "./BarAndLine.style";
import { Icons } from "../../assets/icons";
import * as ReactDOMServer from "react-dom/server";
import {
    getArrayOfLast30DaysFromToday,
    numberWithCommas,
} from "../../utils/helpers";

class LineOneBar extends React.Component {
    constructor(props) {
        super(props);
        this.labels = getArrayOfLast30DaysFromToday();
        this.state = {
            series: [
                {
                    name: "Inflow",
                    type: "column",
                    data: [
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        this.props.data[29],
                    ],
                },
                {
                    name: "Outflow",
                    type: "line",
                    data: this.props.data,
                },
                {
                    name: "date labels",
                    type: "line",
                    data: this.props.dateLabels,
                },
                {
                    name: "is amount",
                    type: "line",
                    data: this.props.isAmount,
                },
            ],
            options: {
                noData: {
                    text: "Loading...",
                },
                markers: {
                    size: 0,
                },
                grid: {
                    show: false,
                },
                tooltip: {
                    custom: function ({
                        series,
                        seriesIndex,
                        dataPointIndex,
                        w,
                    }) {
                        return ReactDOMServer.renderToStaticMarkup(
                            <label className="tool-tip">
                                <h5>
                                    {w.globals.initialSeries[3].data[0] && "₦"}
                                    {numberWithCommas(
                                        w.globals.initialSeries[1].data[
                                            dataPointIndex
                                        ]
                                    )}
                                </h5>
                                <span
                                    style={{
                                        fontWeight: "500",
                                        fontSize: "12px !important",
                                        lineHeight: "15px",
                                        color: "#99a0ae",
                                    }}
                                >
                                    {
                                        w.globals.initialSeries[2].data[
                                            dataPointIndex
                                        ]
                                    }
                                </span>
                            </label>
                        );
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        s̶t̶a̶r̶t̶i̶n̶g̶S̶h̶a̶p̶e̶: "flat",
                        e̶n̶d̶i̶n̶g̶S̶h̶a̶p̶e̶: "flat",
                        borderRadius: 2,
                        columnWidth: "34px",
                        barHeight: "70%",
                        distributed: false,
                        rangeBarOverlap: true,
                        rangeBarGroupRows: false,
                        colors: {
                            ranges: [
                                {
                                    from: 0,
                                    to: 0,
                                    color: undefined,
                                },
                            ],
                            backgroundBarColors: [],
                            backgroundBarOpacity: 1,
                            backgroundBarRadius: 0,
                        },
                        dataLabels: {
                            position: "top",
                            maxItems: 100,
                            hideOverflowingLabels: true,
                            orientation: "horizontal",
                        },
                    },
                },

                chart: {
                    height: 350,
                    type: "line",
                    width: "100%",
                    animations: {
                        enabled: false,
                        easing: "easeinout",
                        speed: 1,
                        animateGradually: {
                            enabled: false,
                            delay: 150,
                        },
                        dynamicAnimation: {
                            enabled: false,
                        },
                    },
                },
                colors: ["#C0A6E2", "#34215C"],

                stroke: {
                    width: 1,
                    curve: "smooth",
                },
                // title: {
                //     text: "Traffic Sources",
                // },
                dataLabels: {
                    // enabled: true,
                    enabledOnSeries: [1],
                },
                labels: this.props.labels,
                xaxis: {
                    type: "string",
                    labels: {
                        rotate: 0,

                        style: {
                            colors: "#99A0AE",
                            fontSize: "9px",
                            fontFamily: "Inter, Arial, sans-serif",
                            fontWeight: 400,
                            cssClass: "apexcharts-yaxis-label",
                        },
                        format: "MMMM d",
                        datetimeFormatter: {
                            year: "yyyy",
                            month: "MMM 'yy",
                            day: "dd MMM",
                            hour: "HH:mm",
                        },
                    },
                    tickAmount: 4,
                },
                yaxis: [
                    {
                        opposite: false,
                        show: false,
                        title: {
                            text: "",
                        },
                    },
                ],
            },
        };
    }

    render() {
        return (
            <BarAndLineStyle id="chart">
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                    height={120}
                />
            </BarAndLineStyle>
        );
    }
}

export default LineOneBar;
