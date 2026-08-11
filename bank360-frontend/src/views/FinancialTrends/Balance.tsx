import React, { FC, useEffect, useRef, useState } from "react";
import { Component } from "../../components";
import {
  IComparedTransactionResponse,
  ITransaction,
} from "../../features/services/services.interface";
import {
  ITrendDashboardHeader,
  TrendDashboardHeader,
} from "./FinancialTrends.modules";
import BarAndLineChart from "../../components/Charts/BarAndLine";
import LineAndLineChart from "../../components/Charts/LineAndLine";
import {
  getArrayOf30LastDaysFromTodayFull,
  getArrayOfLastMonthsFromToday,
  getArrayOfLastSevenDaysFromToday,
  getSign,
  numberWithCommas,
} from "../../utils/helpers";
import { useGetGraphData } from "../../hooks/finUtils/useGetGraphData";
import { useGetComparedAmount } from "../../hooks/finUtils/useGetComparedData";
import { initialComparedTransactionState } from "../Dashboard/Dashboard";
import { useGetCurrencySymbol } from "../../hooks/finUtils/useGetCurrencySymbol";
import { useGetListOfTransactions } from "../../hooks/finUtils/useGetListOfTransactions";
import { Illustrations } from "../../assets/Illustrations";
import { lossOrGain } from "./InflowOutflow";
import Loader from "../../components/Loader/Loader";

export const Balance: FC<IBalanceProps> = ({
  header: {
    selectedBanks,
    selectedCurrency,
    setSelectedBanks,
    setSelectedCurrency,
    finData,
    header,
    selectedDate,
    setSelectedDate,
  },
}) => {
  // !GET CURRENCY SYMBOL
  const [currencySymbol, setCurrencySymbol] = useState("");

  useGetCurrencySymbol({ selectedCurrency, setCurrencySymbol });

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
    selectedBanks,
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
  });

  const [loadingGraph, setLoadingGraph] = useState(false);
  const [graphData, setGraphData] = useState<IComparedTransactionResponse[]>(
    []
  );

  const [loadingCompare, setLoadingCompare] = useState(true);
  const [comparedData, setComparedData] =
    useState<IComparedTransactionResponse>(initialComparedTransactionState);
  // Gets compared amount
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { getComparedAmount } = useGetComparedAmount({
    setLoadingCompare,
    selectedDate,
    selectedCurrency,
    selectedBanks,
    setComparedData,
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { getGraphData } = useGetGraphData({
    setGraphData,
    setLoadingGraph,
    selectedDate,
    selectedCurrency,
    selectedBanks,
  });

  const updateSearchInput = (value: string) => {
    setDebouncedSearchValue(value);
    getListOfTransactions(false, 1, undefined, undefined, undefined, value);
  };

  useEffect(() => {
    getComparedAmount();
    getGraphData();
    getListOfTransactions();
  }, []);

  return (
    <>
      <TrendDashboardHeader
        {...{
          selectedBanks,
          selectedCurrency,
          setSelectedBanks,
          setSelectedCurrency,
          finData,
          header,
          selectedDate,
          setSelectedDate,
          updateSearchInput,
        }}
      />
      <section className="graph">
        <header>
          {" "}
          <aside className="balance">
            <h4 className="graph-title">Balance Overview</h4>
            {loadingCompare ? (
              <span>
                <Illustrations.ContentLoader />
              </span>
            ) : (
              <span className={lossOrGain(comparedData.balance.percent)}>
                {getSign(comparedData.balance.percent)}{" "}
                {numberWithCommas(
                  Math.round(Math.abs(comparedData.balance.percent))
                )}{" "}
                % from {selectedDate.value.toLowerCase()}
              </span>
            )}{" "}
          </aside>
        </header>
        {loadingGraph ? (
          <Loader />
        ) : (
          <main>
            {selectedDate.value === ("" || "Last 7 days") &&
              graphData.length > 0 && (
                <BarAndLineChart
                  inflowData={graphData.map((dp) => dp.balance.now / 100)}
                  // outflowData={graphData.map(
                  //     (dp) => dp.balance.now / 100
                  // )}
                  // balanceData={graphData.map(
                  //     (dp) => dp.balance.now / 100
                  // )}
                  labels={getArrayOfLastSevenDaysFromToday()}
                  inflowPerc={graphData.map((dp) => dp.balance.percent)}
                  outflowPerc={graphData.map((dp) => dp.balance.percent)}
                  tipLabel={"the previous day"}
                  // inflowColor="#1e85ff"
                  outflowColor="#e3452f"
                />
              )}

            {/* ! ALL BALANCE DATA ARE PASSED TO THE GRAPH AS INFLOW DATA */}
            {graphData.length > 0 &&
              (selectedDate.value === "Last 30 days" ||
                selectedDate.value === "Last 90 days") && (
                <LineAndLineChart
                  inflowData={graphData.map((dp) => dp.balance.now / 100)}
                  // outflowData={graphData.map(
                  //     (dp) => dp.balance.now / 100
                  // )}
                  labels={getArrayOf30LastDaysFromTodayFull(
                    selectedDate.value === "Last 90 days"
                      ? 90
                      : selectedDate.value === "Last 30 days"
                      ? 30
                      : 0
                  )}
                  inflowPerc={graphData.map((dp) => dp.balance.percent)}
                  outflowPerc={graphData.map((dp) => dp.balance.percent)}
                  tipLabel={"the previous day"}
                  // inflowColor="#99A0AE"
                  outflowColor="#99A0AE"
                />
              )}

            {graphData.length > 0 && selectedDate.value === "Last 12 months" && (
              <LineAndLineChart
                inflowData={graphData.map((dp) => dp.balance.now / 100)}
                // outflowData={graphData.map(
                //     (dp) => dp.balance.now / 100
                // )}
                labels={getArrayOfLastMonthsFromToday()}
                inflowPerc={graphData.map((dp) => dp.balance.percent)}
                outflowPerc={graphData.map((dp) => dp.balance.percent)}
                tipLabel={"last month"}
                // inflowColor="#1e85ff"
                outflowColor="#99A0AE"
              />
            )}

            {graphData.length > 0 && selectedDate.value === "This year" && (
              <LineAndLineChart
                inflowData={graphData
                  .map((dp) => dp.balance.now / 100)
                  .map((dp, index) =>
                    index > new Date().getMonth() + 1 ? 0 : dp
                  )}
                // outflowData={graphData
                //     .map(
                //         (dp) => dp.balance.now / 100
                //     )
                //     .map((dp, index) =>
                //         index > new Date().getMonth() + 1
                //             ? 0
                //             : dp
                //     )}
                // labels={getArrayOfLastMonthsFromToday()}
                inflowPerc={graphData.map((dp) => dp.balance.percent)}
                outflowPerc={graphData.map((dp) => dp.balance.percent)}
                tipLabel={"the last year"}
                // inflowColor="#1e85ff"
                outflowColor="#99A0AE"
              />
            )}
          </main>
        )}
      </section>
      <TrendDashboardHeader
        {...{
          selectedBanks,
          selectedCurrency,
          setSelectedBanks,
          setSelectedCurrency,
          finData,
          header,
          selectedDate,
          setSelectedDate,
          updateSearchInput,
        }}
        justSearch={true}
      />
      <section className="transactions-table">
        {loadingTransactions ? (
          <Loader />
        ) : (
          <Component.RowedTable
            data={transactions}
            header="Transaction Details "
            headers={[
              "Date & Time",
              "Bank Name",
              "Account Number",
              "Account Name",
              "Account Balance",
              "Transaction ID",
              "Payment Method",
              "Narration",
              "Category",
            ]}
            symbol={currencySymbol}
            setTransactions={setTransactions}
            totalCount={transactionCount}
            setNewPage={setPage}
            currPage={page}
            more={more}
            loadingMore={loading}
            // load more transactions with the correct filter
            loadMoreTransactions={() => {
              getListOfTransactions(
                true,
                page + 1,
                undefined,
                undefined,
                undefined,
                debouncedSearchValue
              );
            }}
            setElement={setElement}
            rootElement={rootElement}
            balance={true}
          />
        )}
      </section>
    </>
  );
};

interface IBalanceProps {
  header: ITrendDashboardHeader;
}
