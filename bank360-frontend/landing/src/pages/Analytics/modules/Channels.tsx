import React, { FC, useEffect, useRef, useState } from "react";
// import { LoaderIcon } from "react-hot-toast";
import { Illustrations } from "../../../assets/illustrations";
import { Component } from "../../../frontend-components";
import BarChart from "../../../frontend-components/Charts/BarChart";
import Loader from "../../../frontend-components/Loader/Loader";
import { ISelectOption } from "../../../frontend-components/Select/Select.interface";
import { useGetChannelListMutation } from "../../../features/services";
import {
  IComparedTransactionResponse,
  ITransaction,
} from "../../../features/services/services.interface";
import { useGetCategoryGraph } from "../../../hooks/finUtils/useGetCategoryGraph";
import { useGetComparedAmount } from "../../../hooks/finUtils/useGetComparedData";
import { useGetListOfTransactions } from "../../../hooks/finUtils/useGetListOfTransactions";
import { useGetTokens } from "../../../hooks/getDataFromStore/getDataFromState";
import { getSign, numberWithCommas } from "../../../utils/helpers";
import { initialComparedTransactionState } from "../../Dashboard/Dashboard";
import {
  fakeTransactions,
  lossOrGain,
} from "../../FinancialTrends/InflowOutflow";
import { AnalyticsHeader } from "./AnalyticsHeader";

export const Channel: FC<IChannelProps> = ({
  selectedDate,
  setSelectedDate,
  selectedCurrency,
  setSelectedCurrency,
  selectedCategory,
  setSelectedCategory,
}) => {
  // !GET LIST OF TRANSACTIONS
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [page, setPage] = useState<number>(1);
  const [transactionCount, setTransactionCount] = useState<number>();
  const { access } = useGetTokens();
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
  const [selectedChannel, setSelectedChannel] = useState<number>(0);
  const [{ channelList, loadingChannels }, setChannelList] = useState<{
    channelList: string[];
    loadingChannels: boolean;
  }>({
    channelList: [],
    loadingChannels: true,
  });

  const { getGraphData } = useGetCategoryGraph({
    setGraphData,
    setLoadingGraph,
    selectedDate,
    selectedCurrency,
    tran_type,
    channels: channelList[selectedChannel],
  });

  const [getChannelList] = useGetChannelListMutation();
  const getChannels = () => {
    getChannelList({ accessToken: access })
      .unwrap()
      .then((res) => {
        setChannelList((prev) => ({ ...prev, channelList: res.data }));
      })
      .catch(() => {
        getChannels();
      })
      .finally(() => {
        setChannelList((prev) => ({
          ...prev,
          loadingChannels: false,
        }));
      });
  };

  useEffect(() => {
    getChannels();
  }, []);

  return (
    <>
      <AnalyticsHeader
        header="Channel Analytics"
        isThereCategoriesSelect={true}
        isThereDateSelect={true}
        {...{
          setSelectedDate,
          selectedDate,
          selectedCategory,
          setSelectedCategory,
        }}
      />
      <section className="overview">
        <div className="overview__nav">
          <span>
            <h3>Channel Insights</h3>
          </span>
          <section className="overview__nav-main">
            <nav>
              {!loadingChannels ? (
                channelList.length > 0 ? (
                  channelList.map((channel, index) => (
                    <button
                      className={selectedChannel === index ? "selected" : ""}
                      onClick={() => {
                        setSelectedChannel(index);
                      }}
                    >
                      {channel}
                    </button>
                  ))
                ) : (
                  <p>You do not have any channel yet</p>
                )
              ) : (
                <Loader />
              )}
            </nav>
          </section>
        </div>
        <div className="overview__graph">
          <div className="overview__graph-header">
            <small>Income Overview</small>
            <div className="flex">
              {loadingCompare ? (
                <h3>
                  {/* <Illustrations.ContentLoader /> */}
                </h3>
              ) : (
                <h3>
                  ₦{numberWithCommas(comparedData.inflow.amount.now / 100)}
                </h3>
              )}{" "}
              {loadingCompare ? (
                <span>
                  {/* <Illustrations.ContentLoader /> */}
                </span>
              ) : (
                <span
                  className={lossOrGain(comparedData.inflow.amount.percent)}
                >
                  {getSign(comparedData.inflow.amount.percent)}{" "}
                  {numberWithCommas(
                    Math.round(Math.abs(comparedData.inflow.amount.percent))
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
                data={Object.values(graphData).map((x: any) => x / 100)}
                labels={Object.keys(graphData)}
                tipLabel={
                  tran_type === "true" ? "Total Income" : "Total Expense"
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
            header={selectedCategory?.label + " Transaction Details"}
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

interface IChannelProps {
  selectedDate: ISelectOption;
  setSelectedDate: React.Dispatch<React.SetStateAction<ISelectOption>>;
  selectedCategory?: ISelectOption;
  setSelectedCategory?: (value: React.SetStateAction<ISelectOption>) => void;
  setSelectedCurrency: (value: React.SetStateAction<ISelectOption>) => void;
  selectedCurrency: ISelectOption;
}
