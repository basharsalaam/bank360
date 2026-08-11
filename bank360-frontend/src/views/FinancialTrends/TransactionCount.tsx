import React, { FC, useEffect, useRef, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { Component } from "../../components";
import {
  IComparedTransactionResponse,
  ITransaction,
} from "../../features/services/services.interface";
import {
  ITrendDashboardHeader,
  TrendDashboardHeader,
} from "./FinancialTrends.modules";
import { lossOrGain, priorOfDate } from "./InflowOutflow";
import BarAndLineChart from "../../components/Charts/BarAndLine";
import LineAndLineChart from "../../components/Charts/LineAndLine";
import {
  getArrayOf30LastDaysFromTodayFull,
  getArrayOfLastMonthsFromToday,
  getArrayOfLastSevenDaysFromToday,
  getSign,
  numberWithCommas,
} from "../../utils/helpers";
import { useGetListOfTransactions } from "../../hooks/finUtils/useGetListOfTransactions";
import { useGetCurrencySymbol } from "../../hooks/finUtils/useGetCurrencySymbol";
import { initialComparedTransactionState } from "../Dashboard/Dashboard";
import { useGetComparedAmount } from "../../hooks/finUtils/useGetComparedData";
import { useGetGraphData } from "../../hooks/finUtils/useGetGraphData";
import { Illustrations } from "../../assets/Illustrations";
import { formatDate } from "../../utils/helpers/display";
import Loader from "../../components/Loader/Loader";

export const TransactionCount: FC<ITransactionCountProps> = ({
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
  const { getComparedAmount } = useGetComparedAmount({
    setLoadingCompare,
    selectedDate,
    selectedCurrency,
    selectedBanks,
    setComparedData,
  });
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
      <section className="stat">
        <div className="half left">
          <aside>
            <h6>Inflow</h6>
            {loadingCompare ? (
              <span>
                <Illustrations.ContentLoader />
              </span>
            ) : (
              <span className={lossOrGain(comparedData.outflow.count.percent)}>
                {getSign(comparedData.outflow.count.percent)}{" "}
                {numberWithCommas(
                  Math.round(Math.abs(comparedData.inflow.amount.percent))
                )}{" "}
                % from {selectedDate.value.toLowerCase()}
              </span>
            )}
          </aside>
          <p className="date">
            {formatDate(priorOfDate(selectedDate.value))} -{" "}
            {formatDate(new Date().toString())}{" "}
            {/* <b>{selectedDate.value}</b>{" "} */}
          </p>
        </div>
        <div className="half">
          <aside>
            <h6>Outflow</h6>
            {loadingCompare ? (
              <span>
                <Illustrations.ContentLoader />
              </span>
            ) : (
              <span className={lossOrGain(comparedData.outflow.count.percent)}>
                {getSign(comparedData.outflow.count.percent)}{" "}
                {numberWithCommas(
                  Math.round(Math.abs(comparedData.outflow.count.percent))
                )}
                % from {selectedDate.value.toLowerCase()}
              </span>
            )}
          </aside>
          <p className="date">
            {formatDate(priorOfDate(selectedDate.value))} -{" "}
            {formatDate(new Date().toString())}{" "}
            {/* <b>{selectedDate.value}</b>{" "} */}
          </p>
        </div>
      </section>
      <section className="graph">
        <header>
          {" "}
          <h4 className="graph-title">Transaction Chart</h4>
          <div className="graph-labels">
            <div>
              <span className="dot blue"></span>
              <p>Inflow</p>
            </div>
            <div>
              <span className="dot red"></span>
              <p>Outflow</p>
            </div>
          </div>
        </header>
        {loadingGraph ? (
          <Loader />
        ) : (
          <main>
            {selectedDate.value === ("" || "Last 7 days") &&
              graphData.length > 0 && (
                <BarAndLineChart
                  inflowData={graphData.map((dp) => dp.inflow.count.now)}
                  outflowData={graphData.map((dp) => dp.outflow.count.now)}
                  labels={getArrayOfLastSevenDaysFromToday()}
                  inflowPerc={graphData.map((dp) => dp.inflow.count.percent)}
                  outflowPerc={graphData.map((dp) => dp.outflow.count.percent)}
                  tipLabel={"the previous day"}
                  inflowColor="#1e85ff"
                  outflowColor="#e3452f"
                  // remove every naira symbol
                  count={true}
                />
              )}

            {graphData.length > 0 &&
              (selectedDate.value === "Last 30 days" ||
                selectedDate.value === "Last 90 days") && (
                <LineAndLineChart
                  inflowData={graphData.map((dp) => dp.inflow.count.now)}
                  outflowData={graphData.map((dp) => dp.outflow.count.now)}
                  labels={getArrayOf30LastDaysFromTodayFull(
                    selectedDate.value === "Last 90 days"
                      ? 90
                      : selectedDate.value === "Last 30 days"
                      ? 30
                      : 0
                  )}
                  inflowPerc={graphData.map((dp) => dp.inflow.count.percent)}
                  outflowPerc={graphData.map((dp) => dp.outflow.count.percent)}
                  tipLabel={"the previous day"}
                  inflowColor="#1e85ff"
                  outflowColor="#e3452f"
                  count={true}
                />
              )}

            {graphData.length > 0 &&
              selectedDate.value === "Last 12 months" && (
                <LineAndLineChart
                  inflowData={graphData.map((dp) => dp.inflow.count.now)}
                  outflowData={graphData.map((dp) => dp.outflow.count.now)}
                  labels={getArrayOfLastMonthsFromToday()}
                  inflowPerc={graphData.map((dp) => dp.inflow.count.percent)}
                  outflowPerc={graphData.map((dp) => dp.outflow.count.percent)}
                  tipLabel={"the previous month"}
                  inflowColor="#1e85ff"
                  outflowColor="#e3452f"
                  count={true}
                />
              )}

            {graphData.length > 0 && selectedDate.value === "This year" && (
              <LineAndLineChart
                inflowData={graphData
                  .map((dp) => dp.inflow.count.now)
                  .map((dp, index) =>
                    index > new Date().getMonth() + 1 ? 0 : dp
                  )}
                outflowData={graphData
                  .map((dp) => dp.outflow.count.now)
                  .map((dp, index) =>
                    index > new Date().getMonth() + 1 ? 0 : dp
                  )}
                // labels={getArrayOfLastMonthsFromToday()}
                inflowPerc={graphData.map((dp) => dp.inflow.count.percent)}
                outflowPerc={graphData.map((dp) => dp.outflow.count.percent)}
                tipLabel={"last year"}
                inflowColor="#1e85ff"
                outflowColor="#e3452f"
                count={true}
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
              "Transaction Amount",
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
          />
        )}
      </section>
    </>
  );
};

interface ITransactionCountProps {
  header: ITrendDashboardHeader;
}

export const fakeTransactionGraphData: IComparedTransactionResponse[] = [
  {
    inflow: {
      count: {
        now: 4789,
        then: 24959,
        diff: 17890,
        percent: 7289,
      },
      amount: {
        now: 7897,
        then: 7389,
        diff: 1789,
        percent: 6789,
      },
    },
    outflow: {
      count: {
        now: 2789,
        then: 7789,
        diff: 759,
        percent: 4789,
      },
      amount: {
        now: 743,
        then: 3855,
        diff: 7194,
        percent: 2389,
      },
    },
    balance: {
      now: 7842,
      then: 7114,
      diff: 1214,
      percent: 2289,
    },
  },
  {
    inflow: {
      count: {
        now: 7329,
        then: 4119,
        diff: 7200,
        percent: 3289,
      },
      amount: {
        now: 1117,
        then: 7209,
        diff: 389,
        percent: 9789,
      },
    },
    outflow: {
      count: {
        now: 2784,
        then: 7219,
        diff: 7259,
        percent: 14789,
      },
      amount: {
        now: 7467,
        then: 115,
        diff: 2894,
        percent: 2389,
      },
    },
    balance: {
      now: 3444,
      then: 2294,
      diff: 5343,
      percent: 1289,
    },
  },
  {
    inflow: {
      count: {
        now: 5589,
        then: 8959,
        diff: 3890,
        percent: 3289,
      },
      amount: {
        now: 2293,
        then: 1349,
        diff: 5679,
        percent: 2789,
      },
    },
    outflow: {
      count: {
        now: 7789,
        then: 3789,
        diff: 3359,
        percent: 2789,
      },
      amount: {
        now: 7430,
        then: 7345,
        diff: 2894,
        percent: 3389,
      },
    },
    balance: {
      now: 7844,
      then: 7894,
      diff: 1243,
      percent: 1289,
    },
  },
  {
    inflow: {
      count: {
        now: 789,
        then: 4959,
        diff: 7890,
        percent: 7289,
      },
      amount: {
        now: 5127,
        then: 7389,
        diff: 1789,
        percent: 6789,
      },
    },
    outflow: {
      count: {
        now: 2789,
        then: 7789,
        diff: 759,
        percent: 4789,
      },
      amount: {
        now: 4003,
        then: 7855,
        diff: 7894,
        percent: 7389,
      },
    },
    balance: {
      now: 7844,
      then: 7894,
      diff: 1243,
      percent: 1289,
    },
  },
  {
    inflow: {
      count: {
        now: 789,
        then: 4959,
        diff: 7890,
        percent: 7289,
      },
      amount: {
        now: 7897,
        then: 7389,
        diff: 1789,
        percent: 6789,
      },
    },
    outflow: {
      count: {
        now: 3389,
        then: 7789,
        diff: 759,
        percent: 4789,
      },
      amount: {
        now: 9743,
        then: 7855,
        diff: 7894,
        percent: 7389,
      },
    },
    balance: {
      now: 7844,
      then: 7894,
      diff: 1243,
      percent: 1289,
    },
  },
  {
    inflow: {
      count: {
        now: 789,
        then: 4959,
        diff: 7890,
        percent: 7289,
      },
      amount: {
        now: 3297,
        then: 7389,
        diff: 1789,
        percent: 6789,
      },
    },
    outflow: {
      count: {
        now: 2789,
        then: 7789,
        diff: 759,
        percent: 4789,
      },
      amount: {
        now: 4243,
        then: 7855,
        diff: 7894,
        percent: 7389,
      },
    },
    balance: {
      now: 7344,
      then: 7894,
      diff: 1243,
      percent: 1289,
    },
  },
  {
    inflow: {
      count: {
        now: 7829,
        then: 4959,
        diff: 7890,
        percent: 7289,
      },
      amount: {
        now: 2297,
        then: 7389,
        diff: 1789,
        percent: 6789,
      },
    },
    outflow: {
      count: {
        now: 6489,
        then: 7789,
        diff: 759,
        percent: 4789,
      },
      amount: {
        now: 2343,
        then: 3855,
        diff: 2894,
        percent: 7389,
      },
    },
    balance: {
      now: 3844,
      then: 7324,
      diff: 1263,
      percent: 4289,
    },
  },
];
