import React, { FC, useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Icons } from "../../assets/icons";
import { Illustrations } from "../../assets/illustrations";
import { Component } from "../../frontend-components";
import LineChart from "../../frontend-components/Charts/Line";
import LineOneBar from "../../frontend-components/Charts/LineOneBar";
import Loader from "../../frontend-components/Loader/Loader";
import { ISelectOption } from "../../frontend-components/Select/Select.interface";
import { updateBankList } from "../../features/finData/finData.slice";
import {
  useGetBankList2Mutation,
  useGetTransactionsComparedMutation,
} from "../../features/services";
import {
  ICompare,
  IComparedTransactionResponse,
} from "../../features/services/services.interface";
import {
  useGetFinData,
  useGetTokens,
} from "../../hooks/getDataFromStore/getDataFromState";
// import Select from "../../assets/iconsSelect/Select";
import { Layouts } from "../../layouts";
import {
  getArrayOf30LastDaysFromTodayFull,
  getArrayOfLast30DaysFromToday,
  getArrayOfLast90DaysFromToday,
  getSign,
  getVarianceColor,
  numberWithCommas,
  roundTo2dp,
} from "../../utils/helpers";
import { formatDate } from "../../utils/helpers/display";
import { DailyUpdatesStyle } from "./DailyUpdates.style";

const DailyUpdates = () => {
  const finData = useGetFinData();
  const dispatch = useAppDispatch();
  const { access } = useGetTokens();
  // const [totalAmount, setTotalAmount] = useState<number>(0);

  const [selectedCurrency, setSelectedCurrency] = useState<ISelectOption>({
    label: "",
    value: "",
  });
  useEffect(() => {
    setSelectedCurrency(
      selectedCurrency.value
        ? selectedCurrency
        : finData?.currencies
        ? finData.currencies.map((curr) => ({
            label: `${curr.symbol} - ${curr.name}`,
            value: curr.code,
          }))[0]
        : { label: "", value: "" }
    );
  }, [finData.currencies]);

  const [selectedBanks, setSelectedBanks] = useState<ISelectOption[]>([]);
  useEffect(() => {
    setSelectedBanks(
      selectedBanks[0]?.value
        ? selectedBanks
        : finData?.bankList
        ? finData.bankList.map((bank) => ({
            label: bank.name,
            value: bank.name,
          }))
        : [{ label: "", value: "" }]
    );
  }, [finData?.bankList]);

  const [getBankList] = useGetBankList2Mutation();
  const updateListOfBanks = () => {
    getBankList({ accessToken: access })
      .unwrap()
      .then((res) => {
        setSelectedBanks(
          finData?.bankList
            ? finData.bankList.map((bank) => ({
                label: bank.name,
                value: bank.name,
              }))
            : [{ label: "", value: "" }]
        );
        dispatch(updateBankList(res.data));
      })
      .catch((err) => {
        updateListOfBanks();
        console.log(err);
      });
  };
  useEffect(() => {
    updateListOfBanks();
  }, []);

  const [loadingCompare, setLoadingCompare] = useState(true);
  const [loadingCompare7days, setLoadingCompare7days] = useState(true);
  const [loadingCompare24hrs, setLoadingCompare24hrs] = useState(true);
  const [loadingCompare30days, setLoadingCompare30days] = useState(true);
  const [loadingGraph30days, setLoadingGraph30days] = useState(true);
  const [loadingGraph90days, setLoadingGraph90days] = useState(true);
  const [comparedData, setComparedData] =
    useState<IComparedTransactionResponse>(initialComparedTransactionState);
  const [comparedData7days, setComparedData7days] =
    useState<IComparedTransactionResponse>(initialComparedTransactionState);
  const [comparedData24hrs, setComparedData24hrs] =
    useState<IComparedTransactionResponse>(initialComparedTransactionState);
  const [comparedData30days, setComparedData30days] =
    useState<IComparedTransactionResponse>(initialComparedTransactionState);
  const [comparedGraph30days, setComparedGraph30days] = useState<
    IComparedTransactionResponse[]
  >([]);
  const [comparedGraph90days, setComparedGraph90days] = useState<
    IComparedTransactionResponse[]
  >([]);
  const [getCompared] = useGetTransactionsComparedMutation();
  const getComparedAmount = ({
    date,
    duration,
    size,
    timeFrame,
    type,
    banks,
  }: IComparedAmountProps) => {
    if (timeFrame === "today") {
      setLoadingCompare(true);
    }
    if (timeFrame === "24 hours") {
      setLoadingCompare24hrs(true);
    }
    if (timeFrame === "7 days") {
      setLoadingCompare7days(true);
    }
    if (timeFrame === "30 days") {
      setLoadingCompare30days(true);
    }
    if (type === "graph") {
      setLoadingGraph30days(true);
    }
    if (timeFrame === "90 days") {
      setLoadingGraph90days(true);
    }
    getCompared({
      accessToken: access,
      params: {
        date,
        duration,
        size,
        currency: selectedCurrency.value,
        bank_name: (banks || selectedBanks).map((bank) => bank.value).join(","),
      },
    })
      .unwrap()
      .then((res) => {
        if (timeFrame === "today") {
          setLoadingCompare(false);
          setComparedData(res[0]);
        }
        if (timeFrame === "24 hours") {
          setLoadingCompare24hrs(false);
          setComparedData24hrs(res[0]);
        }
        if (timeFrame === "7 days") {
          setLoadingCompare7days(false);
          setComparedData7days(res[0]);
        }
        if (timeFrame === "30 days") {
          setLoadingCompare30days(false);
          setComparedData30days(res[0]);
        }
        if (type === "graph") {
          setLoadingGraph30days(false);
          setComparedGraph30days(res);
        }
        if (timeFrame === "90 days") {
          setLoadingGraph90days(false);
          setComparedGraph90days(res);
        }
      })
      .catch((err) => {
        // for today
        getComparedAmount({
          date,
          duration,
          size,
          timeFrame,
        });
      })
      .finally(() => {});
  };

  const updateRenderedData = (banks?: ISelectOption[]) => {
    const currentDate = new Date();
    setComparedGraph90days([]);

    // for today
    getComparedAmount({
      date: `${currentDate.getFullYear()},${
        currentDate.getMonth() + 1
      },${currentDate.getDate()}`,
      duration: 1,
      size: 1,
      timeFrame: "today",
      banks,
    });

    // for 24 hours
    getComparedAmount({
      date: `${currentDate.getFullYear()},${
        currentDate.getMonth() + 1
      },${currentDate.getDate()},${currentDate.getHours()}`,
      duration: 24,
      size: 1,
      timeFrame: "24 hours",
      banks,
    });

    // for 7 days
    getComparedAmount({
      date: `${currentDate.getFullYear()},${
        currentDate.getMonth() + 1
      },${currentDate.getDate()}`,
      duration: 7,
      size: 1,
      timeFrame: "7 days",
      banks,
    });

    // for 30 days
    getComparedAmount({
      date: `${currentDate.getFullYear()},${
        currentDate.getMonth() + 1
      },${currentDate.getDate()}`,
      duration: 30,
      size: 1,
      timeFrame: "30 days",
      banks,
    });

    // for 90 days
    getComparedAmount({
      date: `${currentDate.getFullYear()},${
        currentDate.getMonth() + 1
      },${currentDate.getDate()}`,
      duration: 1,
      size: 90,
      timeFrame: "90 days",
      banks,
    });

    // for graph
    getComparedAmount({
      date: `${currentDate.getFullYear()},${
        currentDate.getMonth() + 1
      },${currentDate.getDate()}`,
      duration: 1,
      size: 30,
      timeFrame: "",
      type: "graph",
      banks,
    });
  };

  useEffect(() => {
    if (selectedCurrency.value && selectedBanks.length > 0) {
      updateRenderedData();
    }
  }, [selectedCurrency.value, selectedBanks]);

  useEffect(() => {
    console.log("adeeee");
    // if (selectedCurrency.value && selectedBanks.length > 0) {
    updateRenderedData();
    // }
  }, []);

  return (
    <DailyUpdatesStyle>
      <Layouts.DashboardLayout header="Daily Updates ">
        <header className="dashboard-header">
          <section>
            <h2 className="dashboard-header__title">Daily Updates</h2>
            <p className="dashboard-header__sub">
              Last refreshed - Today [{formatDate(new Date().toString())}]{" "}
            </p>
          </section>

          <section className="header-flex">
            {" "}
            <Component.Select
              placeholder="Select currency"
              inputPlaceholder="Search currency"
              Icon={<Icons.ChevronDownIcon />}
              width="164px"
              searchInput={true}
              selected={selectedCurrency}
              handleChange={({ label, value }) => {
                setSelectedCurrency({ label, value });
              }}
              className="full-width"
              options={
                finData.currencies
                  ? finData?.currencies?.map((curr) => ({
                      label: `${curr.symbol} - ${curr.name}`,
                      value: curr.code,
                    }))
                  : undefined
              }
            />{" "}
            <Component.Select
              placeholder="Select bank"
              inputPlaceholder="Search bank"
              Icon={<Icons.ChevronDownIcon />}
              multiple={true}
              searchInput={true}
              multipleSelected={selectedBanks}
              multipleHandleChange={(newSelected: ISelectOption[]) => {
                setSelectedBanks((prev) => newSelected);
                updateRenderedData(newSelected);
              }}
              className="bank-select s-bnk"
              options={
                finData.bankList
                  ? finData.bankList?.map((bank) => ({
                      label: bank.name,
                      value: bank.name,
                    }))
                  : undefined
              }
            />{" "}
          </section>
        </header>

        <section className="dashboard-main">
          <div className="balances-card">
            <div className="balances-card__first">
              <aside className="one balances-card-item">
                <div className="one-top">
                  <small>Total Balance</small>
                  {loadingCompare ? (
                    <h1>
                      {/* <Illustrations.ContentLoader /> */}
                    </h1>
                  ) : (
                    <h1>₦{numberWithCommas(comparedData.balance.now / 100)}</h1>
                  )}
                </div>
                <small>As at {formatDate(new Date().toString())}</small>
              </aside>
              <aside className="one balances-card-item">
                <div className="one-top">
                  <small>Today's Net Inflow</small>
                  {loadingCompare ? (
                    <h1>
                      {/* <Illustrations.ContentLoader /> */}
                    </h1>
                  ) : (
                    <h1>
                      ₦
                      {numberWithCommas(
                        (comparedData.inflow.amount.now -
                          comparedData.outflow.amount.now) /
                          100
                      )}
                    </h1>
                  )}
                </div>
                <small>As at {formatDate(new Date().toString())}</small>
              </aside>
            </div>

            <div className="balances-card__second">
              {" "}
              <aside className="two balances-card-item">
                <div className="two-top">
                  <div className="icon-flow">
                    <p>Today's Inflow Amount</p>
                  </div>
                  {loadingCompare ? (
                    <h2>
                      {" "}
                      {/* <Illustrations.ContentLoader /> */}
                    </h2>
                  ) : (
                    <h2>
                      ₦{numberWithCommas(comparedData.inflow.amount.now / 100)}
                    </h2>
                  )}
                  {/* <h2>{comparedData.inflow.amount.now / 100}</h2> */}
                </div>
                <div className="two">
                  <div className="icon-flow">
                    <p>Today's Outflow Amount</p>
                  </div>
                  {loadingCompare ? (
                    <h2>
                      {" "}
                      {/* <Illustrations.ContentLoader /> */}
                    </h2>
                  ) : (
                    <h2>
                      ₦{numberWithCommas(comparedData.outflow.amount.now / 100)}
                    </h2>
                  )}
                </div>
              </aside>
              <aside className="two balances-card-item">
                <div className="two-top">
                  <div className="icon-flow">
                    <p>Transaction Inflow</p>
                  </div>
                  {loadingCompare ? (
                    <h2>
                      {" "}
                      {/* <Illustrations.ContentLoader /> */}
                    </h2>
                  ) : (
                    <h2>{numberWithCommas(comparedData.inflow.count.now)}</h2>
                  )}
                  {/* <h2>{comparedData.inflow.count.now}</h2> */}
                </div>
                <div className="two">
                  <div className="icon-flow">
                    <p>Transaction Outflow</p>
                  </div>
                  {loadingCompare ? (
                    <h2>
                      {" "}
                      {/* <Illustrations.ContentLoader /> */}
                    </h2>
                  ) : (
                    <h2>{numberWithCommas(comparedData.outflow.count.now)}</h2>
                  )}
                  {/* <h2>{comparedData.outflow.count.now}</h2> */}
                </div>
              </aside>
            </div>
          </div>
          <section className="updates-container">
            <header>
              {" "}
              <h4 className="graph-title">
                Transaction overview within 30 days
              </h4>
            </header>
            <section className="updates-content">
              <section className="updates-card">
                <h6>Inflow Value</h6>
                <div className="updates-card-main">
                  <CompareAnalyticsJsx
                    loading={loadingCompare24hrs}
                    comparedData={comparedData24hrs.inflow.amount}
                    header="Last 24 hours"
                  />

                  <CompareAnalyticsJsx
                    loading={loadingCompare7days}
                    comparedData={comparedData7days.inflow.amount}
                    header="Last 7 days"
                  />

                  <CompareAnalyticsJsx
                    loading={loadingCompare30days}
                    comparedData={comparedData30days.inflow.amount}
                    header="Last 30 days"
                  />
                </div>

                <section className="graph">
                  {!loadingGraph90days && comparedGraph30days.length === 30 && (
                    <LineOneBar
                      type="datetime"
                      format="MMMM d"
                      labels={getArrayOfLast30DaysFromToday().days}
                      data={comparedGraph30days.map(
                        (data) => data.inflow.amount.now / 100
                      )}
                      dateLabels={getArrayOfLast30DaysFromToday().fulldays}
                      isAmount={[true]}
                    />
                  )}
                </section>
              </section>
              <section className="updates-card">
                <h6>Outflow Value</h6>
                <div className="updates-card-main">
                  <CompareAnalyticsJsx
                    loading={loadingCompare24hrs}
                    comparedData={comparedData24hrs.outflow.amount}
                    header="Last 24 hours"
                  />
                  <CompareAnalyticsJsx
                    loading={loadingCompare7days}
                    comparedData={comparedData7days.outflow.amount}
                    header="Last 7 days"
                  />
                  <CompareAnalyticsJsx
                    loading={loadingCompare30days}
                    comparedData={comparedData30days.outflow.amount}
                    header="Last 30 days"
                  />
                </div>
                <section className="graph">
                  {!loadingGraph90days && comparedGraph30days.length === 30 && (
                    <LineOneBar
                      type="datetime"
                      format="MMMM d"
                      labels={getArrayOfLast30DaysFromToday().days}
                      data={comparedGraph30days.map(
                        (data) => data.outflow.amount.now / 100
                      )}
                      dateLabels={getArrayOfLast30DaysFromToday().fulldays}
                      isAmount={[true]}
                    />
                  )}
                </section>
              </section>
              <section className="updates-card">
                <h6>Inflow Volume</h6>
                <div className="updates-card-main">
                  <CompareAnalyticsJsx
                    loading={loadingCompare24hrs}
                    comparedData={comparedData24hrs.inflow.count}
                    header="Last 24 hours"
                    volume={true}
                  />
                  <CompareAnalyticsJsx
                    loading={loadingCompare7days}
                    comparedData={comparedData7days.inflow.count}
                    header="Last 7 days"
                    volume={true}
                  />
                  <CompareAnalyticsJsx
                    loading={loadingCompare30days}
                    comparedData={comparedData30days.inflow.count}
                    header="Last 30 days"
                    volume={true}
                  />
                </div>
                <section className="graph">
                  {!loadingGraph90days && comparedGraph30days.length === 30 && (
                    <LineOneBar
                      type="datetime"
                      format="MMMM d"
                      labels={getArrayOfLast30DaysFromToday().days}
                      data={comparedGraph30days.map(
                        (data) => data.inflow.count.now
                      )}
                      dateLabels={getArrayOfLast30DaysFromToday().fulldays}
                      isAmount={[false]}
                    />
                  )}
                </section>
              </section>
              <section className="updates-card">
                <h6>Outflow Volume</h6>
                <div className="updates-card-main">
                  <CompareAnalyticsJsx
                    loading={loadingCompare24hrs}
                    comparedData={comparedData24hrs.outflow.count}
                    header="Last 24 hours"
                    volume={true}
                  />
                  <CompareAnalyticsJsx
                    loading={loadingCompare7days}
                    comparedData={comparedData7days.outflow.count}
                    header="Last 7 days"
                    volume={true}
                  />
                  <CompareAnalyticsJsx
                    loading={loadingCompare30days}
                    comparedData={comparedData30days.outflow.count}
                    header="Last 30 days"
                    volume={true}
                  />
                </div>
                <section className="graph">
                  {!loadingGraph90days && comparedGraph30days.length === 30 && (
                    <LineOneBar
                      type="datetime"
                      format="MMMM d"
                      labels={getArrayOfLast30DaysFromToday().days}
                      data={comparedGraph30days.map(
                        (data) => data.outflow.count.now
                      )}
                      dateLabels={getArrayOfLast30DaysFromToday().fulldays}
                      isAmount={[false]}
                    />
                  )}
                </section>
              </section>
            </section>
          </section>
          <section className="balance-trends">
            <header>
              <h5>Daily Closing Balance</h5>
              <div className="title">
                {/* <h2>₦56,340,000</h2> */}
                <h4>{formatDate(new Date().toString(), true)}</h4>
              </div>

              {loadingGraph90days ? (
                <Loader />
              ) : (
                comparedGraph90days.length === 90 && (
                  <LineChart
                    balance={comparedGraph90days
                      .map((dp) => dp.balance.now / 100)
                      .reverse()}
                    labels={getArrayOf30LastDaysFromTodayFull(90)}
                    dateLabels={getArrayOfLast90DaysFromToday()}
                  />
                )
              )}
            </header>
          </section>
        </section>
      </Layouts.DashboardLayout>
    </DailyUpdatesStyle>
  );
};

export default DailyUpdates;

const initialComparedTransactionState = {
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

interface IComparedAmountProps {
  date: string;
  duration: number;
  size: number;
  timeFrame: "today" | "24 hours" | "7 days" | "30 days" | "90 days" | "";
  type?: "graph";
  banks?: ISelectOption[];
}

const CompareAnalyticsJsx: FC<{
  loading: boolean;
  comparedData: ICompare;
  header: string;
  volume?: boolean;
}> = ({ loading, comparedData, header, volume }) => {
  return (
    <section>
      <div>
        <small>{header}</small>
        {loading ? (
          <h6>
            {/* <Illustrations.ContentLoader /> */}
          </h6>
        ) : volume ? (
          <h6>{numberWithCommas(comparedData.now)}</h6>
        ) : (
          <h6>₦ {numberWithCommas(comparedData.now / 100)}</h6>
        )}
      </div>
      {loading ? (
        <></>
      ) : (
        <span className={"diff " + getVarianceColor(comparedData.diff)}>
          {getSign(comparedData.diff)} {!volume && "₦"}
          {!volume
            ? numberWithCommas(Math.abs(roundTo2dp(comparedData.diff / 100)))
            : numberWithCommas(Math.abs(roundTo2dp(comparedData.diff)))}{" "}
          ({getSign(comparedData.percent)}
          {numberWithCommas(Math.abs(Math.round(comparedData.percent)))}
          %)
        </span>
      )}
    </section>
  );
};
