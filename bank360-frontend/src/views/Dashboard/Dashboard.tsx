import React, { useEffect, useMemo, useRef, useState } from "react";
import { Icons } from "../../assets/Icons";
import { Illustrations } from "../../assets/Illustrations";
import { Component } from "../../components";
import Button from "../../components/Button/Button";
import { Layouts } from "../../layouts";
import { DashboardStyle } from "./Dashboard.style";
import BarAndLineChart from "../../components/Charts/BarAndLine";
import Select from "../../components/Select/Select";
import {
  bankOptions,
  currencyOptions,
  dateOptions,
  dateOptionsGraphMeaning,
  dateOptionsMeaning,
} from "./../../utils/placeholders";
import { getArrayOf30LastDaysFromTodayFull } from "../../utils/helpers";
import { ISelectOption } from "../../components/Select/Select.interface";
import LineAndLineChart from "../../components/Charts/LineAndLine";
import {
  useGetFinData,
  useGetTokens,
} from "../../hooks/getDataFromStore/getDataFromState";
import { useAppDispatch } from "../../app/hooks";
import {
  useGetBankList2Mutation,
  useGetTransactionsComparedMutation,
  useGetTransactionsListMutation,
} from "../../features/services";
import { updateBankList } from "../../features/finData/finData.slice";
import {
  ICompare,
  IComparedTransactionResponse,
  ITransaction,
} from "../../features/services/services.interface";
import {
  getArrayOfLastDaysFromToday,
  getArrayOfLastMonthsFromToday,
  getArrayOfLastSevenDaysFromToday,
  numberWithCommas,
} from "../../utils/helpers";
import { formatDate } from "../../utils/helpers/display";
import { LoaderIcon } from "react-hot-toast";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetCurrencySymbol } from "../../hooks/finUtils/useGetCurrencySymbol";
import { useGetComparedAmount } from "../../hooks/finUtils/useGetComparedData";
import { useGetGraphData } from "../../hooks/finUtils/useGetGraphData";
import { useGetListOfTransactions } from "../../hooks/finUtils/useGetListOfTransactions";
import { useGetBanks } from "../../hooks/finUtils/useGetBanks";
import Loader from "../../components/Loader/Loader";

const Dashboard = () => {
  const [selectedBanks, setSelectedBanks] = useState<ISelectOption[]>([]);
  useGetBanks({ selectedBanks, setSelectedBanks });

  const [selectedCurrency, setSelectedCurrency] = useState<ISelectOption>({
    label: "",
    value: "",
  });
  const [selectedDate, setSelectedDate] = useState<ISelectOption>({
    label: "Last 7 days",
    value: "Last 7 days",
  });
  const dispatch = useAppDispatch();
  const finData: any = useGetFinData();
  const { access } = useGetTokens();
  const [currencySymbol, setCurrencySymbol] = useState("");

  useGetCurrencySymbol({ selectedCurrency, setCurrencySymbol });

  useEffect(() => {
    setSelectedCurrency(
      selectedCurrency.value
        ? selectedCurrency
        : finData?.currencies
        ? finData.currencies.map((curr: any) => ({
            label: `${curr?.symbol} - ${curr?.name}`,
            value: curr.code,
          }))[0]
        : { label: "", value: "" }
    );
  }, [finData.currencies]);

  const [loadingCompare, setLoadingCompare] = useState(true);
  const [comparedData, setComparedData] =
    useState<IComparedTransactionResponse>(initialComparedTransactionState);
  const [getCompared] = useGetTransactionsComparedMutation();

  // Gets compared amount
  const { getComparedAmount } = useGetComparedAmount({
    setLoadingCompare,
    selectedDate,
    selectedCurrency,
    selectedBanks,
    setComparedData,
  });

  // !GET GRAPH DATA
  const [loadingGraph, setLoadingGraph] = useState(true);
  const [graphData, setGraphData] = useState<IComparedTransactionResponse[]>(
    []
  );

  const { getGraphData } = useGetGraphData({
    setGraphData,
    setLoadingGraph,
    selectedDate,
    selectedCurrency,
    selectedBanks,
  });

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
  });

  useEffect(() => {
    getComparedAmount();
    getGraphData();
    getListOfTransactions();
  }, []);

  return (
    <DashboardStyle>
      <Layouts.DashboardLayout header="Dashboard">
        <header className="dashboard-header">
          <div className="dashboard-header__first">
            <section>
              <h2 className="dashboard-header__title">Account Overview </h2>
              <p className="dashboard-header__sub">
                Last refreshed - Today [Dec 20, 2020]{" "}
              </p>
            </section>
            <Button className="show-1400" themeColor="#54B773">
              Export data
            </Button>
          </div>

          <section className="header-flex">
            {" "}
            <Select
              className="s-bnk"
              placeholder="Bank"
              Icon={<Icons.ChevronDownIcon />}
              width="164px"
              options={
                finData.bankList
                  ? finData.bankList?.map((bank: any) => ({
                      label: bank.name,
                      value: bank.name,
                    }))
                  : undefined
              }
              inputPlaceholder="Search bank"
              multipleHandleChange={(newSelected: ISelectOption[]) => {
                setSelectedBanks((prev) => newSelected);
                getListOfTransactions(
                  undefined,
                  undefined,
                  undefined,
                  newSelected
                );
                getGraphData();
                getComparedAmount(undefined, newSelected);
              }}
              multiple={true}
              multipleSelected={selectedBanks}
            />
            <Select
              placeholder="Select currency"
              Icon={<Icons.ChevronDownIcon />}
              inputPlaceholder="Search currency"
              options={
                finData.currencies
                  ? finData?.currencies?.map((curr: any) => ({
                      label: `${curr.symbol} - ${curr.name}`,
                      value: curr.code,
                    }))
                  : undefined
              }
              width="164px"
              handleChange={({ label, value }) => {
                setSelectedCurrency({ label, value });
                getListOfTransactions();
                getGraphData();
                getComparedAmount();
              }}
              selected={selectedCurrency}
            />
            <Select
              placeholder="Date Range"
              Icon={<Icons.CalendarIcon />}
              width="164px"
              handleChange={({ label, value }) => {
                setSelectedDate((prev) => ({ label, value }));
                getListOfTransactions(undefined, undefined, value);
                getGraphData(value);
                getComparedAmount(value);
              }}
              selected={selectedDate}
              options={dateOptions}
            />
            <div className="divider"></div>
            <Button themeColor="#54B773" className="hide-1400">
              Export data
            </Button>
          </section>
        </header>{" "}
        <section className="dashboard-main">
          <section className="cards">
            <div className="cards-closing">
              <Illustrations.ConesIllustration className="cone" />
              <div className="header">
                <p>Closing Balance</p>
                {!loadingCompare && (
                  <span
                    className={
                      comparedData.balance.percent > 0 ? "gain" : "loss"
                    }
                  >
                    {comparedData.balance.percent > 0 ? "+" : ""}{" "}
                    {Math.round(comparedData.balance.percent)} % from{" "}
                    {
                      dateOptionsMeaning()[selectedDate.value as string]
                        .distance
                    }
                  </span>
                )}
              </div>
              {loadingCompare ? (
                <h2>
                  <Illustrations.ContentLoader />
                </h2>
              ) : (
                <h2>
                  {currencySymbol}
                  {numberWithCommas(comparedData.balance.now / 100)}
                </h2>
              )}
              <h6>As of {formatDate(new Date().toString())}</h6>
            </div>
            <div className="cards-filled">
              <section>
                <p>Volume of Transactions</p>
                {loadingCompare ? (
                  <h2>
                    <Illustrations.ContentLoader />
                  </h2>
                ) : (
                  <h2>
                    {numberWithCommas(
                      !isNaN(Number(transactionCount))
                        ? Number(transactionCount)
                        : undefined
                    )}
                  </h2>
                )}
                <span>{selectedDate.value} </span>
              </section>
              <div className="divider"></div>
              <section>
                <div>
                  {/* <Icons.InflowIcon />  */}
                  <p>Total Inflow</p>
                </div>
                {loadingCompare ? (
                  <h2>
                    <Illustrations.ContentLoader />
                  </h2>
                ) : (
                  <h2>
                    ₦{numberWithCommas(comparedData.inflow.amount.now / 100)}
                  </h2>
                )}{" "}
                <span>{selectedDate.value} </span>
              </section>
              <div className="divider"></div>
              <section>
                <div>
                  {/* <Icons.OutflowIcon />  */}
                  <p>Total Outflow</p>
                </div>
                {loadingCompare ? (
                  <h2>
                    <Illustrations.ContentLoader />
                  </h2>
                ) : (
                  <h2>
                    ₦{numberWithCommas(comparedData.outflow.amount.now / 100)}
                  </h2>
                )}
                <span>{selectedDate.value} </span>
              </section>
            </div>
          </section>

          <section className="graph">
            <header>
              {" "}
              <h4 className="graph-title">Transaction Chart</h4>
              <div className="graph-labels">
                <div>
                  <span className="dot purple"></span>
                  <p>Inflow</p>
                </div>
                <div>
                  <span className="dot orange"></span>
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
                      inflowData={graphData.map(
                        (dp) => dp.inflow.amount.now / 100
                      )}
                      outflowData={graphData.map(
                        (dp) => dp.outflow.amount.now / 100
                      )}
                      labels={getArrayOfLastSevenDaysFromToday()}
                      inflowPerc={graphData.map(
                        (dp) => dp.inflow.amount.percent
                      )}
                      outflowPerc={graphData.map(
                        (dp) => dp.outflow.amount.percent
                      )}
                      tipLabel={"the previous day"}
                    />
                  )}

                {graphData.length > 0 &&
                  (selectedDate.value === "Last 30 days" ||
                    selectedDate.value === "Last 90 days") && (
                    <LineAndLineChart
                      inflowData={graphData.map(
                        (dp) => dp.inflow.amount.now / 100
                      )}
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
                      inflowPerc={graphData.map(
                        (dp) => dp.inflow.amount.percent
                      )}
                      outflowPerc={graphData.map(
                        (dp) => dp.outflow.amount.percent
                      )}
                      tipLabel={"the previous day"}
                    />
                  )}

                {graphData.length > 0 &&
                  selectedDate.value === "Last 12 months" && (
                    <LineAndLineChart
                      inflowData={graphData.map(
                        (dp) => dp.inflow.amount.now / 100
                      )}
                      outflowData={graphData.map(
                        (dp) => dp.outflow.amount.now / 100
                      )}
                      labels={getArrayOfLastMonthsFromToday()}
                      inflowPerc={graphData.map(
                        (dp) => dp.inflow.amount.percent
                      )}
                      outflowPerc={graphData.map(
                        (dp) => dp.outflow.amount.percent
                      )}
                      tipLabel={"the previous month"}
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
                    outflowPerc={graphData.map(
                      (dp) => dp.outflow.amount.percent
                    )}
                    tipLabel={"last year"}
                  />
                )}
              </main>
            )}
          </section>
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
                loadMoreTransactions={() => {
                  getListOfTransactions(true, page + 1);
                }}
                setElement={setElement}
                rootElement={rootElement}
              />
            )}
          </section>
        </section>
      </Layouts.DashboardLayout>
    </DashboardStyle>
  );
};

export default Dashboard;

export const initialComparedTransactionState = {
  inflow: {
    count: {
      now: 0,
      then: 0,
      diff: 0,
      percent: 0,
    },
    amount: {
      now: 0,
      then: 0,
      diff: 0,
      percent: 0,
    },
  },
  outflow: {
    count: {
      now: 0,
      then: 0,
      diff: 0,
      percent: 0,
    },
    amount: {
      now: 0,
      then: 0,
      diff: 0,
      percent: 0,
    },
  },
  balance: {
    now: 0,
    then: 0,
    diff: 0,
    percent: 0,
  },
};
