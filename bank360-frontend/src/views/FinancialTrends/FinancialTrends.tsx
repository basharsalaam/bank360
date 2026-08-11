import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { ISelectOption } from "../../components/Select/Select.interface";
import { TabsComp } from "../../components/Tabs/Tabs";
import { updateBankList } from "../../features/finData/finData.slice";
import { useGetBankList2Mutation } from "../../features/services";
import {
  useGetFinData,
  useGetTokens,
} from "../../hooks/getDataFromStore/getDataFromState";
import { Layouts } from "../../layouts";
import { formatDate } from "../../utils/helpers/display";
import { FinancialTrendsStyle } from "./FinancialTrends.style";
import { trendsTabsLabels, trendsTabsPanels } from "./TrendsTabs";
import { TrendDashboardHeader } from "./FinancialTrends.modules";
import { InflowOutflow } from "./InflowOutflow";
import { TransactionCount } from "./TransactionCount";
import { Balance } from "./Balance";
import { useSearchParams } from "react-router-dom";

const FinancialTrends = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<ISelectOption>({
    label: "",
    value: "",
  });
  const finData = useGetFinData();
  const dispatch = useAppDispatch();
  const { access } = useGetTokens();
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

  const [selectedDate, setSelectedDate] = useState<ISelectOption>({
    label: "Last 7 days",
    value: "Last 7 days",
  });

  const [search, setSearch] = useSearchParams();
  const tab = search.get("tab");

  return (
    <FinancialTrendsStyle>
      <Layouts.DashboardLayout header="Financial Trends ">
        <TabsComp
          defaultStart={Number(tab)}
          tablabels={trendsTabsLabels}
          tabPanels={[
            <InflowOutflow
              header={{
                selectedBanks,
                selectedCurrency,
                setSelectedBanks,
                setSelectedCurrency,
                finData,
                header: "Inflow vs Outflow Trend",
                selectedDate,
                setSelectedDate,
              }}
            />,
            <TransactionCount
              header={{
                selectedBanks,
                selectedCurrency,
                setSelectedBanks,
                setSelectedCurrency,
                finData,
                header: "Transaction Count",
                selectedDate,
                setSelectedDate,
              }}
            />,
            <Balance
              header={{
                selectedBanks,
                selectedCurrency,
                setSelectedBanks,
                setSelectedCurrency,
                finData,
                header: "Balance",
                selectedDate,
                setSelectedDate,
              }}
            />,
          ]}
        />
      </Layouts.DashboardLayout>
    </FinancialTrendsStyle>
  );
};

export default FinancialTrends;
