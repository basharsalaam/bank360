import { FC } from "react";
import { Icons } from "../../../assets/Icons";
import { Component } from "../../../components";
import Button from "../../../components/Button/Button";
import { ISelectOption } from "../../../components/Select/Select.interface";
import { IFinData } from "../../../features/finData/finData.interface";
import { useGetCategoryList } from "../../../hooks/finUtils/useGetCategoryList";
import { formatDate } from "../../../utils/helpers/display";
import { dateOptions } from "../../../utils/placeholders";
import { AnalyticsHeaderContainer } from "./AnalyticsHeader.style";

export const AnalyticsHeader: FC<IAnalyticsHeader> = ({
  selectedBanks,
  selectedCategory,
  setSelectedBanks,
  setSelectedCategory,
  finData,
  header,
  selectedDate,
  setSelectedDate,
  isThereBank,
  isThereCategoriesSelect,
  isThereDateSelect,
  isThereHistory,
  buttonLabel,
  noButton,
}) => {
  const { categories } = useGetCategoryList();
  return (
    <AnalyticsHeaderContainer>
      <header className="dashboard-header">
        <div className="dashboard-header__first">
          <section>
            <h2 className="dashboard-header__title">{header}</h2>
            <p className="dashboard-header__sub">
              Last refreshed - Today [{formatDate(new Date().toString())}]{" "}
            </p>
          </section>
          <Button className="show-1400" themeColor="#54B773">
            Export data
          </Button>
        </div>

        <section className="header-flex">
          <div className="right">
            {" "}
            {isThereCategoriesSelect && (
              <Component.Select
                placeholder="Categories"
                inputPlaceholder="Search categories"
                Icon={<Icons.ChevronDownIcon />}
                minWidth="156px"
                width="156px"
                searchInput={true}
                selected={selectedCategory}
                handleChange={({ label, value }) => {
                  setSelectedCategory &&
                    setSelectedCategory((prev) => ({
                      label,
                      value,
                    }));
                }}
                className="full-width f-trend"
                options={categories}
              />
            )}{" "}
            {isThereBank && (
              <Component.Select
                placeholder="Select bank"
                inputPlaceholder="Search bank"
                Icon={<Icons.ChevronDownIcon />}
                multiple={true}
                searchInput={true}
                multipleSelected={selectedBanks}
                multipleHandleChange={(newSelected: ISelectOption[]) => {
                  setSelectedBanks && setSelectedBanks((prev) => newSelected);
                  // updateRenderedData(newSelected);
                }}
                // className="f-trend"
                options={
                  finData && finData.bankList
                    ? finData.bankList?.map((bank) => ({
                        label: bank.name,
                        value: bank.name,
                      }))
                    : undefined
                }
                minWidth="240px"
                width="240px"
                className="s-bnk"
              />
            )}{" "}
            {isThereDateSelect && (
              <Component.Select
                placeholder="Date Range"
                Icon={<Icons.CalendarIcon />}
                handleChange={({ label, value }) => {
                  setSelectedDate &&
                    setSelectedDate((prev) => ({
                      label,
                      value,
                    }));
                }}
                selected={selectedDate}
                options={dateOptions}
                // className="f-trend"
                width="156px"
                minWidth="156px"
              />
            )}
            <div className="divider"></div>
            {!noButton && (
              <Button className="export-btn hide-1400" themeColor="#54B773">
                {buttonLabel || "Export data"}
              </Button>
            )}
          </div>
        </section>
      </header>
    </AnalyticsHeaderContainer>
  );
};

export interface IAnalyticsHeader {
  finData?: IFinData;
  selectedCategory?: ISelectOption;
  setSelectedCategory?: (value: React.SetStateAction<ISelectOption>) => void;
  selectedBanks?: ISelectOption[];
  setSelectedBanks?: (value: React.SetStateAction<ISelectOption[]>) => void;
  header: JSX.Element | string;
  selectedDate?: ISelectOption;
  setSelectedDate?: (value: React.SetStateAction<ISelectOption>) => void;

  isThereCategoriesSelect?: boolean;
  isThereDateSelect?: boolean;
  isThereHistory?: boolean;
  isThereBank?: boolean;
  buttonLabel?: string;
  noButton?: boolean;
}
