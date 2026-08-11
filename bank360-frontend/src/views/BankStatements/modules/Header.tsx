import { FC } from "react";
import { Icons } from "../../../assets/Icons";
import { Component } from "../../../components";
import { ISelectOption } from "../../../components/Select/Select.interface";
import { formatDate } from "../../../utils/helpers/display";
import { dateOptions } from "../../../utils/placeholders";
import HeaderContainer from "./Header.style";
import { IFinData } from "../../../features/finData/finData.interface";
import Select from "../../../components/Select/Select";
import Loader from "../../../components/Loader/Loader";

const { CheckIcon } = Icons;
export const Header: FC<IHeader> = ({
  selectedBanks,
  selectedCurrency,
  setSelectedBanks,
  setSelectedCurrency,
  finData,
  header,
  selectedDate,
  setSelectedDate,
  selectedStatements,
  downloadAll,
  fetchingData,
  isSuccessful,
}) => {
  return (
    <HeaderContainer>
      <header className="dashboard-header">
        <div className="dashboard-header__first">
          <section>
            <h2 className="dashboard-header__title">{header}</h2>
            <p className="dashboard-header__sub">
              Last refreshed - Today [{formatDate(new Date().toString())}]{" "}
            </p>
          </section>

          <div className=" show-1400 selected">
            {selectedStatements.length > 0 && (
              <small>{selectedStatements.length} selected</small>
            )}

            <Select
              placeholder={
                isSuccessful ? (
                  <CheckIcon className="check-icon" />
                ) : fetchingData ? (
                  <Loader noPadding={true} />
                ) : (
                  "Download All"
                )
              }
              Icon={<></>}
              width="96px"
              minWidth="96px"
              className="download-btn full-width  show-1400"
              handleChange={({ label, value }) => {
                downloadAll!(value);
                // updateCategory(value, item.uuid);
                // setSelectedDate({ label, value });
              }}
              selected={undefined}
              options={downloadOptions}
              disabled={fetchingData}
            />
          </div>
          {/* <Button className="download-btn full-width show-1400">
                        Download All{" "}
                    </Button> */}
        </div>

        <section className="header-flex">
          {" "}
          <div className="right">
            {" "}
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
            />{" "}
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
            />{" "}
            <div className="divider"></div>
            <Component.Select
              placeholder="Date Range"
              Icon={<Icons.CalendarIcon />}
              width="164px"
              handleChange={({ label, value }) => {
                setSelectedDate((prev) => ({ label, value }));
              }}
              selected={selectedDate}
              options={dateOptions}
              className="f-trend"
            />
            <div className="hide-1400 selected">
              {selectedStatements.length > 0 && (
                <small>{selectedStatements.length} selected</small>
              )}

              <Select
                placeholder={
                  isSuccessful ? (
                    <CheckIcon className="check-icon" />
                  ) : fetchingData ? (
                    <Loader noPadding={true} />
                  ) : (
                    "Download All"
                  )
                }
                Icon={<></>}
                width="96px"
                minWidth="96px"
                disabled={fetchingData}
                className="download-btn full-width hide-1400"
                handleChange={({ label, value }) => {
                  downloadAll!(value);
                  // updateCategory(value, item.uuid);
                  // setSelectedDate({ label, value });
                }}
                selected={undefined}
                options={downloadOptions}
              />
            </div>
          </div>
        </section>
      </header>
    </HeaderContainer>
  );
};

export interface IHeader {
  finData: IFinData;
  selectedCurrency: ISelectOption;
  setSelectedCurrency: (value: React.SetStateAction<ISelectOption>) => void;
  selectedBanks: ISelectOption[];
  setSelectedBanks: (value: React.SetStateAction<ISelectOption[]>) => void;
  header: string;
  selectedDate: ISelectOption;
  setSelectedDate: (value: React.SetStateAction<ISelectOption>) => void;

  selectedStatements: number[];
  downloadAll?: (type: string) => void;
  fetchingData?: boolean;
  isSuccessful?: boolean;
}

const downloadOptions: ISelectOption[] = [
  {
    label: "Download All as PDF",
    value: "PDF",
  },
  {
    label: "Download All as CSV",
    value: "CSV",
  },
];
