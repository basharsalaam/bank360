import React, { FC, useEffect, useRef, useState } from "react";
// import { LoaderIcon } from "react-hot-toast";
import { ISelectOption } from "../../../frontend-components/Select/Select.interface";
import { AnalyticsHeader } from "./AnalyticsHeader";
import BarChart from "../../../frontend-components/Charts/BarChart";
import { Component } from "../../../frontend-components";
import {
    IComparedTransactionResponse,
    ITransaction,
} from "../../../features/services/services.interface";
import {
    fakeTransactions,
    lossOrGain,
} from "../../FinancialTrends/InflowOutflow";
import { useGetFinData } from "../../../hooks/getDataFromStore/getDataFromState";
import { initialComparedTransactionState } from "../../Dashboard/Dashboard";
import { useGetComparedAmount } from "../../../hooks/finUtils/useGetComparedData";
import { Illustrations } from "../../../assets/illustrations";
import { getSign, numberWithCommas } from "../../../utils/helpers";
import { useGetCategoryGraph } from "../../../hooks/finUtils/useGetCategoryGraph";
import { useGetListOfTransactions } from "../../../hooks/finUtils/useGetListOfTransactions";
import Loader from "../../../frontend-components/Loader/Loader";

export const Spending: FC<ISpendingProps> = ({
    selectedDate,
    setSelectedDate,
    selectedCategory,
    setSelectedCategory,
    setSelectedCurrency,
    selectedCurrency,
}) => {
    // !GET LIST OF TRANSACTIONS
    const [loadingTransactions, setLoadingTransactions] = useState(true);
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const [page, setPage] = useState<number>(1);
    const [transactionCount, setTransactionCount] = useState<number>();
    // infinit scroll
    const [{ loading, more }, setScrollState] = useState({
        loading: false,
        more: false,
    });
    const [element, setElement] = useState<any>(null);
    const rootElement = useRef<any>(null);
    const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
    const { getListOfTransactions } = useGetListOfTransactions({
        setScrollState,
        selectedDate,
        selectedCurrency,
        setLoadingTransactions,
        setPage,
        setTransactions,
        setTransactionCount,
        page,
        transactionCount,
        transactions,
        rootElement,
        element,
        more,
        searchInput: debouncedSearchValue,
        categories: selectedCategory?.label,
    });

    const [loadingCompare, setLoadingCompare] = useState(true);
    const [comparedData, setComparedData] =
        useState<IComparedTransactionResponse>(initialComparedTransactionState);
    // Gets compared amount
    const { getComparedAmount } = useGetComparedAmount({
        setLoadingCompare,
        selectedDate,
        selectedCurrency,
        setComparedData,
    });

    const [tran_type, setTran_type] = useState<"true" | "false">("true");
    const [loadingGraph, setLoadingGraph] = useState(false);
    const [graphData, setGraphData] = useState<any>({});

    const { getGraphData } = useGetCategoryGraph({
        setGraphData,
        setLoadingGraph,
        selectedDate,
        selectedCurrency,
        tran_type,
    });

    return (
        <>
            <AnalyticsHeader
                header="Spend Analytics"
                isThereCategoriesSelect={true}
                isThereDateSelect={true}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <section className="overview">
                <div className="overview__nav">
                    <span>
                        <h3>Spending Insights</h3>
                    </span>
                    <section className="overview__nav-main">
                        <nav>
                            <button
                                className={
                                    tran_type === "true" ? "selected" : ""
                                }
                                onClick={() => {
                                    setTran_type("true");
                                }}
                            >
                                Income
                            </button>
                            <button
                                className={
                                    tran_type === "false" ? "selected" : ""
                                }
                                onClick={() => {
                                    setTran_type("false");
                                }}
                            >
                                Expenses
                            </button>
                        </nav>
                    </section>
                </div>
                <div className="overview__graph">
                    <div className="overview__graph-header">
                        <small>
                            {tran_type === "true"
                                ? "Income Overview"
                                : "Expense Overview"}
                        </small>
                        <div className="flex">
                            {loadingCompare ? (
                                <h3>
                                    {/* <Illustrations.ContentLoader /> */}
                                </h3>
                            ) : (
                                <h3>
                                    ₦
                                    {tran_type === "true"
                                        ? numberWithCommas(
                                              comparedData.inflow.amount.now /
                                                  100
                                          )
                                        : numberWithCommas(
                                              comparedData.outflow.amount.now /
                                                  100
                                          )}
                                </h3>
                            )}{" "}
                            {loadingCompare ? (
                                <span>
                                    {/* <Illustrations.ContentLoader /> */}
                                </span>
                            ) : (
                                <span
                                    className={lossOrGain(
                                        tran_type === "true"
                                            ? comparedData.inflow.amount.percent
                                            : comparedData.outflow.amount
                                                  .percent
                                    )}
                                >
                                    {getSign(
                                        tran_type === "true"
                                            ? comparedData.inflow.amount.percent
                                            : comparedData.outflow.amount
                                                  .percent
                                    )}{" "}
                                    {numberWithCommas(
                                        Math.round(
                                            Math.abs(
                                                tran_type === "true"
                                                    ? comparedData.inflow.amount
                                                          .percent
                                                    : comparedData.outflow
                                                          .amount.percent
                                            )
                                        )
                                    )}{" "}
                                    %from {selectedDate.value.toLowerCase()}
                                </span>
                            )}
                        </div>
                    </div>

                    <section className="graph">
                        {loadingGraph ? (
                            <Loader />
                        ) : graphData ? (
                            <BarChart
                                data={Object.values(graphData).map(
                                    (x: any) => x / 100
                                )}
                                labels={Object.keys(graphData)}
                                tipLabel={
                                    tran_type === "true"
                                        ? "Total Income"
                                        : "Total Expense"
                                }
                                outflowColor="#e3452f"
                            />
                        ) : (
                            ""
                        )}
                    </section>
                </div>
            </section>
            <section className="transactions-table">
                {loadingTransactions ? (
                    <Loader />
                ) : (
                    <Component.AnalyticsTable
                        data={transactions}
                        header={
                            selectedCategory?.label + " Transaction Details"
                        }
                        headers={[
                            "Category",
                            "Date & Time",
                            "Bank Name",
                            "Account Name",
                            "Account Number",
                            "Transaction Amount",
                            "Transaction ID",
                            "Payment Method",
                            "Narration",
                        ]}
                        symbol={"₦"}
                        setTransactions={setTransactions}
                        totalCount={transactionCount}
                        setNewPage={setPage}
                        currPage={page}
                        more={more}
                        loadingMore={loading}
                        loadMoreTransactions={() => {}}
                        setElement={setElement}
                        rootElement={rootElement}
                        selectPosition={"left"}
                        getListOfTransactions={getListOfTransactions}
                        categories={selectedCategory?.label}
                    />
                )}
            </section>
        </>
    );
};

interface ISpendingProps {
    selectedDate: ISelectOption;
    setSelectedDate: React.Dispatch<React.SetStateAction<ISelectOption>>;
    selectedCategory?: ISelectOption;
    setSelectedCategory?: (value: React.SetStateAction<ISelectOption>) => void;
    setSelectedCurrency: (value: React.SetStateAction<ISelectOption>) => void;
    selectedCurrency: ISelectOption;
}
