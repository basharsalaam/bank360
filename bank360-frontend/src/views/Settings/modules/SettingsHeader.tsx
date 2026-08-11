import { FC } from "react";
import { Icons } from "../../../assets/Icons";
import { Component } from "../../../components";
import Button from "../../../components/Button/Button";
import { ISelectOption } from "../../../components/Select/Select.interface";
import { IFinData } from "../../../features/finData/finData.interface";
import { dateOptions } from "../../../utils/placeholders";
import { SettingsHeaderContainer } from "./SettingsHeader.style";

export const SettingsHeader: FC<ISettingsHeader> = ({
  selectedBanks,
  selectedCurrency,
  setSelectedBanks,
  setSelectedCurrency,
  finData,
  header,
  selectedDate,
  setSelectedDate,
  isThereBank,
  isThereCategoriesSelect,
  isThereDateSelect,
  isThereHistory,
  buttonLabel,
  isThereSearchGroup,
  buttonClick,
  buttonDisabled,
}) => {
  return (
    <SettingsHeaderContainer>
      <header className="dashboard-header">
        <div className="dashboard-header__first">
          <section>
            <h2 className="dashboard-header__title">{header}</h2>
          </section>
          <Button
            onClick={() => {
              buttonClick && buttonClick();
            }}
            disabled={buttonDisabled}
            className="show-1400 export-btn"
          >
            {buttonLabel || "Export data"}
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
                minWidth="142px"
                width="142px"
                searchInput={true}
                selected={selectedCurrency}
                handleChange={({ label, value }) => {}}
                className="full-width f-trend"
                options={categoriesOptions}
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
                minWidth="142px"
                width="142px"
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
                width="142px"
                minWidth="142px"
              />
            )}
            {/* <div className="divider"></div> */}
            <Button
              className="export-btn hide-1400"
              onClick={() => {
                buttonClick && buttonClick();
              }}
              disabled={buttonDisabled}
            >
              {buttonLabel || "Export data"}
            </Button>
          </div>
        </section>
      </header>
    </SettingsHeaderContainer>
  );
};

export interface ISettingsHeader {
  finData?: IFinData;
  selectedCurrency?: ISelectOption;
  setSelectedCurrency?: (value: React.SetStateAction<ISelectOption>) => void;
  selectedBanks?: ISelectOption[];
  setSelectedBanks?: (value: React.SetStateAction<ISelectOption[]>) => void;
  header: string;
  selectedDate?: ISelectOption;
  setSelectedDate?: (value: React.SetStateAction<ISelectOption>) => void;

  isThereCategoriesSelect?: boolean;
  isThereDateSelect?: boolean;
  isThereHistory?: boolean;
  isThereBank?: boolean;
  isThereSearchGroup?: boolean;
  buttonLabel?: string;
  buttonClick?: () => void;
  buttonDisabled?: boolean;
}

const categoriesOptions: ISelectOption[] = [
  {
    label: "Utilities",
    value: "Utilities",
  },
];
