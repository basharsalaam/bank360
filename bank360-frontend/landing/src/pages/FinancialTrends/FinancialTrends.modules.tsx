import { FC, useCallback, useState } from "react";
import { Icons } from "../../assets/icons";
import { Component } from "../../frontend-components";
import { ISelectOption } from "../../frontend-components/Select/Select.interface";
import { IFinData } from "../../features/finData/finData.interface";
import { formatDate } from "../../utils/helpers/display";
import { dateOptions } from "../../utils/placeholders";
import { TrendDashboardHeaderContainer } from "./TrendDashboardHeader.style";
import debounce from "lodash.debounce";

export const TrendDashboardHeader: FC<ITrendDashboardHeader> = ({
  selectedBanks,
  selectedCurrency,
  setSelectedBanks,
  setSelectedCurrency,
  finData,
  header,
  selectedDate,
  setSelectedDate,
  updateSearchInput,
  justSearch,
}) => {
  const [searchValue, setSearchValue] = useState("");

  // highlight-starts
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(
    debounce((nextValue: string) => {
      updateSearchInput && updateSearchInput(nextValue);
    }, 1000),
    [selectedDate, selectedBanks, selectedCurrency] // will be created only once initially
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: nextValue } = event.target;
    setSearchValue(nextValue);
    // Even though handleChange is created on each render and executed
    // it references the same debouncedSave that was created initially
    debouncedSave(nextValue);
  };
  return (
    <TrendDashboardHeaderContainer className={justSearch ? "just-search" : ""}>
      <header className="dashboard-header">
        {!justSearch && (
          <section>
            <h2 className="dashboard-header__title">{header}</h2>
            <p className="dashboard-header__sub">
              Last refreshed - Today [{formatDate(new Date().toString())}]{" "}
            </p>
          </section>
        )}

        <section className="header-flex">
          {" "}
          {justSearch && (
            <div className="input-group">
              <input
                type="text"
                placeholder={"Search here"}
                value={searchValue}
                onChange={handleChange}
              />
              <Icons.SearchIcon />
            </div>
          )}
          <div className="right">
            {" "}
            {!justSearch && (
              <Component.Select
                placeholder="Select bank"
                inputPlaceholder="Search bank"
                Icon={<Icons.ChevronDownIcon />}
                multiple={true}
                searchInput={true}
                multipleSelected={selectedBanks}
                multipleHandleChange={(newSelected: ISelectOption[]) => {
                  setSelectedBanks((prev) => newSelected);
                  // updateRenderedData(newSelected);
                }}
                className="f-trend s-bnk"
                options={
                  finData.bankList
                    ? finData.bankList?.map((bank) => ({
                        label: bank.name,
                        value: bank.name,
                      }))
                    : undefined
                }
                // minWidth="200px"
                // width="200px"
              />
            )}{" "}
            {!justSearch && (
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
                className="full-width f-trend"
                options={
                  finData.currencies
                    ? finData?.currencies?.map((curr) => ({
                        label: `${curr.symbol} - ${curr.name}`,
                        value: curr.code,
                      }))
                    : undefined
                }
              />
            )}{" "}
            {!justSearch && (
              <Component.Select
                placeholder="Date Range"
                Icon={<Icons.CalendarIcon />}
                width="164px"
                handleChange={({ label, value }) => {
                  setSelectedDate((prev) => ({
                    label,
                    value,
                  }));
                }}
                selected={selectedDate}
                options={dateOptions}
                className="f-trend"
              />
            )}
          </div>
        </section>
      </header>
    </TrendDashboardHeaderContainer>
  );
};

export interface ITrendDashboardHeader {
  finData: IFinData;
  selectedCurrency: ISelectOption;
  setSelectedCurrency: (value: React.SetStateAction<ISelectOption>) => void;
  selectedBanks: ISelectOption[];
  setSelectedBanks: (value: React.SetStateAction<ISelectOption[]>) => void;
  header: string;
  selectedDate: ISelectOption;
  setSelectedDate: (value: React.SetStateAction<ISelectOption>) => void;
  updateSearchInput?: (value: string) => void;
  justSearch?: boolean;
}
