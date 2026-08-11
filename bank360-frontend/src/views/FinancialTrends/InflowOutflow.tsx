import React, { FC, useEffect, useRef, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { Component } from "../../components";
import LineAndLineChart from "../../components/Charts/LineAndLine";
import {
  IComparedTransactionResponse,
  ITransaction,
} from "../../features/services/services.interface";
import {
  getArrayOf30LastDaysFromTodayFull,
  getArrayOfLastMonthsFromToday,
  getArrayOfLastSevenDaysFromToday,
  getSign,
  numberWithCommas,
} from "../../utils/helpers";
import {
  ITrendDashboardHeader,
  TrendDashboardHeader,
} from "./FinancialTrends.modules";
import BarAndLineChart from "../../components/Charts/BarAndLine";
import { fakeTransactionGraphData } from "./TransactionCount";
import { useGetGraphData } from "../../hooks/finUtils/useGetGraphData";
import { useGetComparedAmount } from "../../hooks/finUtils/useGetComparedData";
import { initialComparedTransactionState } from "../Dashboard/Dashboard";
import { formatDate } from "../../utils/helpers/display";
import { Illustrations } from "../../assets/Illustrations";
import { useGetListOfTransactions } from "../../hooks/finUtils/useGetListOfTransactions";
import { useGetCurrencySymbol } from "../../hooks/finUtils/useGetCurrencySymbol";
import Loader from "../../components/Loader/Loader";

export const InflowOutflow: FC<IInflowOutflowProps> = ({
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
  const [currencySymbol, setCurrencySymbol] = useState("");

  useGetCurrencySymbol({ selectedCurrency, setCurrencySymbol });

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
              <span className={lossOrGain(comparedData.outflow.amount.percent)}>
                {getSign(comparedData.outflow.amount.percent)}{" "}
                {numberWithCommas(
                  Math.round(Math.abs(comparedData.inflow.amount.percent))
                )}{" "}
                %from {selectedDate.value.toLowerCase()}
              </span>
            )}
          </aside>
          <p className="date">
            {formatDate(priorOfDate(selectedDate.value))} -{" "}
            {formatDate(new Date().toString())}
            {/* -{" "} */}
            {/* <b>{selectedDate.value}</b> */}
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
              <span className={lossOrGain(comparedData.outflow.amount.percent)}>
                {getSign(comparedData.outflow.amount.percent)}{" "}
                {numberWithCommas(
                  Math.round(Math.abs(comparedData.outflow.amount.percent))
                )}
                % from {selectedDate.value.toLowerCase()}
              </span>
            )}
          </aside>
          <p className="date">
            {formatDate(priorOfDate(selectedDate.value))} -{" "}
            {formatDate(new Date().toString())}
            {/* -{" "} */}
            {/* <b>{selectedDate.value}</b> */}
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
                  inflowData={graphData.map((dp) => dp.inflow.amount.now / 100)}
                  outflowData={graphData.map(
                    (dp) => dp.outflow.amount.now / 100
                  )}
                  labels={getArrayOfLastSevenDaysFromToday()}
                  inflowPerc={graphData.map((dp) => dp.inflow.amount.percent)}
                  outflowPerc={graphData.map((dp) => dp.outflow.amount.percent)}
                  tipLabel={"the previous day"}
                  inflowColor="#1e85ff"
                  outflowColor="#e3452f"
                />
              )}

            {graphData.length > 0 &&
              (selectedDate.value === "Last 30 days" ||
                selectedDate.value === "Last 90 days") && (
                <LineAndLineChart
                  inflowData={graphData.map((dp) => dp.inflow.amount.now / 100)}
                  outflowData={graphData.map(
                    (dp) => dp.outflow.amount.now / 100
                  )}
                  labels={getArrayOf30LastDaysFromTodayFull(
                    selectedDate.value === "Last 90 days"
                      ? 90
                      : selectedDate.value === "Last 30 days"
                      ? 30
                      : 0
                  )}
                  inflowPerc={graphData.map((dp) => dp.inflow.amount.percent)}
                  outflowPerc={graphData.map((dp) => dp.outflow.amount.percent)}
                  tipLabel={"the previous day"}
                  inflowColor="#1e85ff"
                  outflowColor="#e3452f"
                />
              )}

            {graphData.length > 0 &&
              selectedDate.value === "Last 12 months" && (
                <LineAndLineChart
                  inflowData={graphData.map((dp) => dp.inflow.amount.now / 100)}
                  outflowData={graphData.map(
                    (dp) => dp.outflow.amount.now / 100
                  )}
                  labels={getArrayOfLastMonthsFromToday()}
                  inflowPerc={graphData.map((dp) => dp.inflow.amount.percent)}
                  outflowPerc={graphData.map((dp) => dp.outflow.amount.percent)}
                  tipLabel={"the previous month"}
                  inflowColor="#1e85ff"
                  outflowColor="#e3452f"
                />
              )}

            {graphData.length > 0 && selectedDate.value === "This year" && (
              <LineAndLineChart
                inflowData={graphData
                  .map((dp) => dp.inflow.amount.now / 100)
                  .map((dp, index) =>
                    index > new Date().getMonth() + 1 ? 0 : dp
                  )}
                outflowData={graphData
                  .map((dp) => dp.outflow.amount.now / 100)
                  .map((dp, index) =>
                    index > new Date().getMonth() + 1 ? 0 : dp
                  )}
                // labels={getArrayOfLastMonthsFromToday()}
                inflowPerc={graphData.map((dp) => dp.inflow.amount.percent)}
                outflowPerc={graphData.map((dp) => dp.outflow.amount.percent)}
                tipLabel={"last year"}
                inflowColor="#1e85ff"
                outflowColor="#e3452f"
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

interface IInflowOutflowProps {
  header: ITrendDashboardHeader;
}

export const fakeTransactions: ITransaction[] = [
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
  {
    account_info: {
      account_id: "Test string",
      account_no: "Test string",
      name: "Test string",
      acc_type: "Test string",
      balance: 890,
      currency: "Test string",
      bank_name: "Test string",
      institution_type: "Test string",
      status: "Test string",
      re_auth: false,
      auth_method: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    category_info: {
      id: 890,
      category: "Test",
      default: false,
      updated_at: "Test string",
      created_at: new Date().toString(),
    },
    uuid: "Test string",
    tran_type: false,
    amount: 890,
    balance: 890,
    auto_category: "any",
    channels: "Test string",
    narration: "Test string",
    tran_date: new Date().toString(),
    updated_at: "Test string",
    created_at: new Date().toString(),
  },
];

export const lossOrGain = (num: number) => {
  return num > 0 ? "gain" : "loss";
};

export const priorOfDate = (value: string) => {
  const today = new Date();
  const priorDates: {
    [label: string]: string;
  } = {
    "Last 7 days": new Date(new Date().setDate(today.getDate() - 7)).toString(),
    "Last 30 days": new Date(
      new Date().setDate(today.getDate() - 30)
    ).toString(),

    "Last 90 days": new Date(
      new Date().setDate(today.getDate() - 90)
    ).toString(),
    "Last 12 months": new Date(
      new Date().setMonth(today.getMonth() - 12)
    ).toString(),
    "This year": new Date(new Date().getFullYear(), 0, 1).toString(),
  };
  return priorDates[value];
};
