import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { ISelectOption } from "../../components/Select/Select.interface";
import { TabsComp } from "../../components/Tabs/Tabs";
import {
  useGetFinData,
  useGetTokens,
} from "../../hooks/getDataFromStore/getDataFromState";
import { Layouts } from "../../layouts";
import { AnalyticsStyle } from "./Analytics.style";
import { CarbonFootprint } from "./modules/CarbonFootprint";
import { Channel } from "./modules/Channels";
import { CreditScore } from "./modules/CreditScore";
import { SinkAndSource } from "./modules/SinkAndSource";
import { Spending } from "./modules/Spending";

const Analytics = () => {
  const [selectedDate, setSelectedDate] = useState<ISelectOption>({
    label: "Last 7 days",
    value: "Last 7 days",
  });
  const [selectedCategory, setSelectedCategory] = useState<ISelectOption>({
    label: "",
    value: "",
  });

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
  const [search, setSearch] = useSearchParams();
  const tab = search.get("tab");

  return (
    <AnalyticsStyle>
      <Layouts.DashboardLayout header="Analytics ">
        {/* tabs */}
        <TabsComp
          defaultStart={Number(tab)}
          tablabels={analyticsTabsLabels}
          tabPanels={[
            <Spending
              {...{
                selectedDate,
                setSelectedDate,
                selectedCategory,
                setSelectedCategory,
                selectedCurrency,
                setSelectedCurrency,
              }}
            />,
            <Channel
              {...{
                selectedDate,
                setSelectedDate,
                selectedCategory,
                setSelectedCategory,
                selectedCurrency,
                setSelectedCurrency,
              }}
            />,
            <CreditScore
              {...{
                selectedDate,
                setSelectedDate,
                selectedCategory,
                setSelectedCategory,
                selectedCurrency,
                setSelectedCurrency,
              }}
            />,
            <SinkAndSource
              {...{
                // selectedDate,
                // setSelectedDate,
                // selectedCategory,
                // setSelectedCategory,
                selectedCurrency,
                setSelectedCurrency,
              }}
            />,
            <CarbonFootprint />,
          ]}
        />
      </Layouts.DashboardLayout>
    </AnalyticsStyle>
  );
};

export default Analytics;

const analyticsTabsLabels: string[] = [
  "Spending",
  "Channels",
  "Credit Score",
  "Sink and Source",
  "Carbon Footprint",
];
