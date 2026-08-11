import React from "react";
import ReactApexChart from "react-apexcharts";
import { BarAndLineStyle } from "./BarAndLine.style";
import { Icons } from "../../assets/Icons";
import * as ReactDOMServer from "react-dom/server";
import {
    getArrayOf30LastDaysFromTodayFull,
    getArrayOfLast30DaysFromToday,
    getSign,
    hasOnlyZeros,
    numberWithCommas,
} from "../../utils/helpers";
import { EmptyGraph } from "../EmptyGraph/EmptyGraph";

class LineAndLineChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // inflowPerc: this.props.inflowPerc,
            series: [
                {
                    name: "Inflow",
                    type: "line",
                    data: this.props.inflowData || [],
                },
                {
                    name: "Outflow",
                    type: "line",
                    data: this.props.outflowData || [],
                },
                {
                    name: "InflowPerc",
                    type: "",
                    data: this.props.inflowPerc,
                },
                {
                    name: "OutflowPerc",
                    type: "",
                    data: this.props.outflowPerc,
                },
                {
                    name: "TipLabels",
                    type: "",
                    data: [this.props.tipLabel],
                },
                {
                    name: "count",
                    type: "",
                    data: [this.props.count],
                },
            ],
            options: {
                noData: {
                    text: "Loading...",
                },
                tooltip: {
                    custom: function ({
                        series,
                        seriesIndex,
                        dataPointIndex,
                        w,
                    }) {
                        // var data =
                        //     w.globals.initialSeries[seriesIndex].data[
                        //         dataPointIndex
                        //     ];

                        // tool tip
                        return ReactDOMServer.renderToStaticMarkup(
                            <label className="tool-tip">
                                <div className="tool-tip-flex">
                                    <div className="tool-tip-flex-left">
                                        <div className="tool-tip-flex-top">
                                            {w.globals.initialSeries[1].data
                                                .length === 0 ? (
                                                <></>
                                            ) : (
                                                <Icons.ArrowDownIcon />
                                            )}
                                            {w.globals.initialSeries[1].data
                                                .length === 0 ? (
                                                <small>Total Balance</small>
                                            ) : (
                                                <small>Total Inflow</small>
                                            )}
                                        </div>
                                        <h5>
                                            {w.globals.initialSeries[5].data[0]
                                                ? ""
                                                : "₦"}
                                            {numberWithCommas(
                                                w.globals.initialSeries[0].data[
                                                    dataPointIndex
                                                ]
                                            )}
                                        </h5>
                                        <p
                                            className="rise green"
                                            style={{
                                                color:
                                                    w.globals.initialSeries[2]
                                                        .data[dataPointIndex] >=
                                                    0
                                                        ? "#54B773"
                                                        : "#E3452F",
                                                textTransform: "lowercase",
                                            }}
                                        >
                                            {getSign(
                                                w.globals.initialSeries[2].data[
                                                    dataPointIndex
                                                ]
                                            )}{" "}
                                            {numberWithCommas(
                                                Math.abs(
                                                    Math.round(
                                                        w.globals
                                                            .initialSeries[2]
                                                            .data[
                                                            dataPointIndex
                                                        ]
                                                    )
                                                )
                                            )}{" "}
                                            % from{" "}
                                            {w.globals.initialSeries[4].data[0]}
                                        </p>
                                    </div>
                                    {w.globals.initialSeries[1].data.length >
                                        0 && (
                                        <div className="tool-tip-flex-right">
                                            <div className="tool-tip-flex-top">
                                                <Icons.ArrowUpIcon />
                                                <small>Total Outflow</small>
                                            </div>
                                            <h5>
                                                {w.globals.initialSeries[5]
                                                    .data[0]
                                                    ? ""
                                                    : "₦"}
                                                {numberWithCommas(
                                                    w.globals.initialSeries[1]
                                                        .data[dataPointIndex]
                                                )}
                                            </h5>
                                            <p
                                                className="rise green"
                                                style={{
                                                    color:
                                                        w.globals
                                                            .initialSeries[3]
                                                            .data[
                                                            dataPointIndex
                                                        ] >= 0
                                                            ? "#54B773"
                                                            : "#E3452F",
                                                    textTransform: "lowercase",
                                                }}
                                            >
                                                {getSign(
                                                    w.globals.initialSeries[3]
                                                        .data[dataPointIndex]
                                                )}{" "}
                                                {numberWithCommas(
                                                    Math.abs(
                                                        Math.round(
                                                            w.globals
                                                                .initialSeries[3]
                                                                .data[
                                                                dataPointIndex
                                                            ]
                                                        )
                                                    )
                                                )}{" "}
                                                % from{" "}
                                                {
                                                    w.globals.initialSeries[4]
                                                        .data[0]
                                                }
                                            </p>
                                        </div>
                                    )}
                                </div>
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
                    // zoom: {
                    //     enabled: false,
                    // },
                },
                colors: [
                    this.props.inflowColor || "#834EC6",
                    this.props.outflowColor || "#F9884C",
                ],

                stroke: {
                    width: [2, 2],
                    curve: "smooth",
                },
                // title: {
                //     text: "Traffic Sources",
                // },
                dataLabels: {
                    // enabled: true,
                    enabledOnSeries: [1],
                    background: {
                        enabled: true,
                        foreColor: "#fff",
                        padding: 4,
                        borderRadius: 2,
                        borderWidth: 1,
                        borderColor: "#fff",
                        opacity: 0.9,
                        dropShadow: {
                            enabled: false,
                            top: 1,
                            left: 1,
                            blur: 1,
                            color: "#000",
                            opacity: 0.45,
                        },
                    },
                },
                labels: this.props.labels || [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ],
                xaxis: {
                    type: this.props.xaxisType || "string",
                    tickAmount: 10,
                    labels: {
                        rotate: 0,
                        style: {
                            colors: [
                                "#99A0AE",
                                // "#99A0AE",
                                // "#99A0AE",
                                // "#99A0AE",
                                // "#99A0AE",
                                // "#99A0AE",
                                // "#99A0AE",
                                // "#99A0AE",
                                // "#99A0AE",
                                // "#99A0AE",
                                // "#99A0AE",
                                // "#99A0AE",
                            ],
                            fontSize: "12px",
                            fontFamily: "Inter, Arial, sans-serif",
                            fontWeight: 400,
                            cssClass: "apexcharts-yaxis-label",
                        },
                    },
                },
                yaxis: [
                    {
                        show: false,
                        title: {
                            text: "",
                        },
                        labels: {
                            style: {
                                colors: ["#99A0AE"],
                                fontSize: "12px",
                                fontFamily: "Inter, Arial, sans-serif",
                                fontWeight: 400,
                                cssClass: "apexcharts-yaxis-label",
                            },
                            formatter: (value) => {
                                return Math.ceil(value / 1000) + "k";
                            },
                        },
                    },
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
        return hasOnlyZeros(this.props.inflowData) &&
            hasOnlyZeros(this.props.outflowData) ? (
            <EmptyGraph />
        ) : (
            <BarAndLineStyle id="chart">
                <ReactApexChart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                    height={300}
                />
            </BarAndLineStyle>
        );
    }
}

export default LineAndLineChart;
