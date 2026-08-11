import React, { FC, useEffect, useRef, useState } from "react";
// import { LoaderIcon } from "react-hot-toast";
import { Component } from "../../../frontend-components";
import Loader from "../../../frontend-components/Loader/Loader";
import { ISelectOption } from "../../../frontend-components/Select/Select.interface";
import { ITransaction } from "../../../features/services/services.interface";
import { useGetBanks } from "../../../hooks/finUtils/useGetBanks";
import { useGetListOfTransactions } from "../../../hooks/finUtils/useGetListOfTransactions";
import { useGetListOfTransactionsAmount } from "../../../hooks/finUtils/useGetTransactionAmount";
import { useGetFinData } from "../../../hooks/getDataFromStore/getDataFromState";
import { fakeTransactions } from "../../FinancialTrends/InflowOutflow";
import { ISSProps } from "../Analytics.interface";
import { AnalyticsHeader } from "./AnalyticsHeader";

export const SinkAndSource: FC<ISinkAndSourceProps> = ({
  // selectedDate,
  // setSelectedDate,
  selectedCurrency,
  setSelectedCurrency,
  // selectedCategory,
  // setSelectedCategory,
}) => {
  return (
    <>
      <SS
        label="Source"
        tran_type="true"
        {...{
          // selectedDate,
          // setSelectedDate,
          selectedCurrency,
          setSelectedCurrency,
          // selectedCategory,
          // setSelectedCategory,
          // selectedBanks,
          // setSelectedBanks,
        }}
      />
      <SS
        label="Sink"
        tran_type="false"
        {...{
          // selectedDate,
          // setSelectedDate,
          selectedCurrency,
          setSelectedCurrency,
          // selectedCategory,
          // setSelectedCategory,
          // selectedBanks,
          // setSelectedBanks,
        }}
      />
    </>
  );
};

export interface ISinkAndSourceProps {
  // selectedDate: ISelectOption;
  // setSelectedDate: React.Dispatch<React.SetStateAction<ISelectOption>>;
  // selectedCategory?: ISelectOption;
  // setSelectedCategory?: (value: React.SetStateAction<ISelectOption>) => void;
  setSelectedCurrency: (value: React.SetStateAction<ISelectOption>) => void;
  selectedCurrency: ISelectOption;
}

const SS: FC<ISSProps> = ({
  label,
  selectedCurrency,
  // selectedDate,
  // selectedCategory,
  // selectedBanks,
  // setSelectedBanks,
  setSelectedCurrency,
  // setSelectedDate,
  // setSelectedCategory,
  tran_type,
}) => {
  const [selectedDate, setSelectedDate] = useState<ISelectOption>({
    label: "Last 7 days",
    value: "Last 7 days",
  });
  const [selectedCategory, setSelectedCategory] = useState<ISelectOption>({
    label: "",
    value: "",
  });
  const [selectedBanks, setSelectedBanks] = useState<ISelectOption[]>([]);
  useGetBanks({ selectedBanks, setSelectedBanks });

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
  const { getListOfTransactions } = useGetListOfTransactionsAmount({
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
    tran_type,
    selectedBanks,
  });
  const finData = useGetFinData();

  return (
    <section className="s-s">
      <AnalyticsHeader
        header={label}
        isThereCategoriesSelect={true}
        isThereDateSelect={true}
        isThereBank={true}
        {...{
          selectedDate,
          selectedCategory,
          selectedBanks,
          setSelectedBanks,
          setSelectedCategory,
          setSelectedDate,
          finData,
        }}
      />
      {loadingTransactions ? (
        <Loader />
      ) : (
        <Component.RowedTable
          data={transactions}
          className="s-s__table"
          header=""
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
          getListOfTransactions={getListOfTransactions}
          categories={selectedCategory?.label}
        />
      )}
    </section>
  );
};
