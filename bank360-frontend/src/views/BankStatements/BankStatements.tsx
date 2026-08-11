import React, { useEffect, useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";
import { useAppDispatch } from "../../app/hooks";
import { Component } from "../../components";
import { ISelectOption } from "../../components/Select/Select.interface";
import { updateBankList } from "../../features/finData/finData.slice";
import { useGetBankList2Mutation } from "../../features/services";
import {
  useGetFinData,
  useGetTokens,
  useGetUserData,
} from "../../hooks/getDataFromStore/getDataFromState";
import { Layouts } from "../../layouts";
import { ITEMS_PER_PAGE } from "../../utils/constants";
import { BankStatementsStyle } from "./BankStatements.style";
import { Header } from "./modules/Header";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useGetListOfTransactions } from "../../hooks/finUtils/useGetListOfTransactions";
import {
  IComparedTransactionResponse,
  ITransaction,
} from "../../features/services/services.interface";
import { IBankProps } from "../../components/BankList/BankList.interface";
import { useGetListOfAccounts } from "../../hooks/getListOfAccounts/getListOfAccounts";
import { useGetComparedAmount } from "../../hooks/finUtils/useGetComparedData";
import { initialComparedTransactionState } from "./../Dashboard/Dashboard";
import { PdfProcessor } from "../../components/PdfProcessor/PdfProcessor";
import Loader from "../../components/Loader/Loader";

const BankStatements = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<ISelectOption>({
    label: "",
    value: "",
  });
  const finData = useGetFinData();
  const dispatch = useAppDispatch();
  const { access } = useGetTokens();
  const userData = useGetUserData();
  const [loadingAccountList, setLoadingAccountList] = useState(true);
  const [accountList, setAccountList] = useState<IBankProps[]>([]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedDate, setSelectedDate] = useState<ISelectOption>({
    label: "All time",
    value: "All time",
  });

  // pagination bounds
  const [bounds, setBounds] = useState([0, ITEMS_PER_PAGE]);
  const [count, setCount] = useState(0);
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setBounds((prev) => [(value - 1) * ITEMS_PER_PAGE, value * ITEMS_PER_PAGE]);
  };
  const [selectedStatements, setSelectedStatements] = useState<number[]>([]);
  const [chosenBanks, setChosenBanks] = useState<ISelectOption[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // async function download_data() {
  //   let [head, table, pdf_table] = await get_data();

  //   let csvContent = "data:text/csv;charset=utf-8,";
  //   const line = "\n\r";
  //   let lineArray: any = [];
  //   csvContent +=
  //     `CASHFLOW${line.repeat(4)}Bank Statement${line.repeat(2)}` +
  //     `For the Period of,${head.start} to ${head.end}${line}` +
  //     `Organization,${head.org_name}${line}` +
  //     `Currency,NGN${line}` +
  //     `Total Credit,${head.deposit}${line}` +
  //     `Total Debit,${head.withdraw}${line}` +
  //     `Availabe Balance,${head.balance}${line.repeat(3)}` +
  //     `Date,Account Number,Account Name,Bank Name,Description,Deposit,Withdrawal,Balance${line}` +
  //     `Opening Balance,,,,,,,${head.open}${line}`;

  //   table.forEach((info: any) => {
  //     lineArray.push(info.join(","));
  //   });

  //   csvContent +=
  //     lineArray.join(line) +
  //     `${line}Closing Balance,,,,,,,${head.balance}${line}`;

  //   const encodedUri = encodeURI(csvContent);
  //   const link = document.createElement("a");
  //   link.setAttribute("href", encodedUri);
  //   link.setAttribute("download", "bank statement.csv");
  //   document.body.appendChild(link);
  //   link.click();
  // }

  // async function get_data() {
  //   const token = "Bearer " + (await login(details));
  //   const meta_data = {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       Authorization: token,
  //     },
  //   };

  //   const list_tran = await fetch(
  //     host +
  //       "list_transaction/transactions/?currency=ngn&date=2022,6&duration=1&size=1&paginate=false",
  //     meta_data
  //   );
  //   let tran_details = await list_tran.json();
  //   tran_details = tran_details.map((el: any) => [
  //     format_time(el.tran_date),
  //     el.account_info.account_no,
  //     el.account_info.name,
  //     el.account_info.bank_name,
  //     el.narration,
  //     format_amount(el.tran_type * el.amount),
  //     format_amount((!el.tran_type as any) * el.amount),
  //     format_amount(el.balance),
  //   ]);

  //   let pdf_tran_details = tran_details.map((el: any) => [
  //     format_time(el.tran_date),
  //     el.account_info.account_no,
  //     el.account_info.name,
  //     el.account_info.bank_name,
  //     el.narration,
  //     format_amount(el.tran_type * el.amount),
  //     format_amount((!el.tran_type as any) * el.amount),
  //     format_amount(el.balance),
  //   ]);

  //   const user = await fetch(host + "user", meta_data);
  //   const user_values = await user.json();

  //   const compare = await fetch(
  //     host +
  //       "compare/transactions/?currency=ngn&date=2022,6&duration=1&size=1&paginate=false",
  //     meta_data
  //   );
  //   let compare_details = await compare.json();

  //   const [start, end] = month_range();

  //   compare_details = {
  //     org_name: user_values.org_name,
  //     deposit: format_amount(compare_details[0].inflow.amount.now),
  //     withdraw: format_amount(compare_details[0].outflow.amount.now),
  //     balance: format_amount(compare_details[0].balance.now),
  //     open: format_amount(compare_details[0].balance.then),
  //     start: start,
  //     end: end,
  //   };

  //   return [compare_details, tran_details, pdf_tran_details];
  // }

  // async function login(user_details: any) {
  //   const Response = await fetch(host + "token/", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(user_details),
  //   });
  //   const content = await Response.json();

  //   return content.access;
  // }

  function month_range() {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    return [format_time(new Date(y, m, 1)), format_time(new Date(y, m + 1, 0))];
  }

  // !GET LIST OF TRANSACTIONS
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [accountId, setaccountId] = useState("");
  const { getListOfTransactions } = useGetListOfTransactions({
    selectedDate,
    selectedCurrency,
    selectedBanks,
    setLoadingTransactions,
    setPage,
    setTransactions,
    transactions,
    noPaginate: true,
    accountId,
  });

  // ! GET COMPARED DATA
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadingCompare, setLoadingCompare] = useState(false);
  const [comparedData, setComparedData] =
    useState<IComparedTransactionResponse>(initialComparedTransactionState);
  // Gets compared amount
  const { getComparedAmount } = useGetComparedAmount({
    setLoadingCompare,
    selectedDate,
    selectedCurrency,
    selectedBanks,
    setComparedData,
    returnPromise: true,
    accountId,
  });

  const [fetchingData, setFetchingData] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const downloadAll = (
    type: string,
    accountId?: string,
    banks?: ISelectOption[]
  ) => {
    setaccountId(accountId!);
    setFetchingData(true);
    getListOfTransactions(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      banks || chosenBanks
    )?.then((data: ITransaction[]) => {
      const trx = data;
      if (trx.length === 0) {
        toast.error("You don't have any transaction for this period");
        setFetchingData(false);
      }
      if (getComparedAmount && trx.length > 0) {
        getComparedAmount()
          ?.then((data) => {
            const [start, end] = month_range();
            const head = {
              org_name: userData!.org_name,
              deposit: format_amount(comparedData.inflow.amount.now),
              withdraw: format_amount(comparedData.outflow.amount.now),
              balance: format_amount(comparedData.balance.now),
              open: format_amount(comparedData.balance.then),
              start: start,
              end: end,
            };
            const pdf_head = {
              org_name: userData!.org_name,
              deposit: format_amount(comparedData.inflow.amount.now),
              withdraw: format_amount(comparedData.outflow.amount.now),
              closingBalance: format_amount(comparedData.balance.now),
              openingBalance: format_amount(comparedData.balance.then),
              start: start,
              end: end,
              numberOfBanks:
                chosenBanks.length ||
                banks?.length ||
                selectedStatements.length ||
                selectedBanks.length,
              timePeriod: selectedDate.value,
              emailAddress: userData.email,
            };
            const tran_details = trx.map((el) => [
              format_time(el.tran_date),
              el.account_info.account_no,
              el.account_info.name,
              el.account_info.bank_name,
              el.narration,
              format_amount(Number(el.tran_type) * el.amount),
              format_amount((!el.tran_type as any) * el.amount),
              format_amount(el.balance),
            ]);
            const pdf_tran_details = trx.map((el) => ({
              time: format_time(el.tran_date, true),
              accountNo: el.account_info.account_no,
              name: el.account_info.name,
              bankName: el.account_info.bank_name,
              type: el.tran_type ? "Inflow" : "Outflow",
              amount: format_amount(el.amount),
              balance: format_amount(el.balance),
              // channel: el.channels,
            }));
            if (type === "CSV") {
              downloadCsv([head, tran_details]);
            } else if (type === "PDF") {
              downloadPdf([pdf_head, pdf_tran_details]);
            }
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            setFetchingData(false);
          });
      }
    });
  };

  const downloadCsv = ([head, table]: any) => {
    let csvContent = "data:text/csv;charset=utf-8,";
    const line = "\n\r";
    let lineArray: any = [];
    csvContent +=
      `CASHFLOW${line.repeat(4)}Bank Statement${line.repeat(2)}` +
      `For the Period of,${head.start} to ${head.end}${line}` +
      `Organization,${head.org_name}${line}` +
      `Currency,NGN${line}` +
      `Total Credit,${head.deposit}${line}` +
      `Total Debit,${head.withdraw}${line}` +
      `Availabe Balance,${head.balance}${line.repeat(3)}` +
      `Date,Account Number,Account Name,Bank Name,Description,Deposit,Withdrawal,Balance${line}` +
      `Opening Balance,,,,,,,${head.open}${line}`;

    table.forEach((info: any) => {
      lineArray.push(info.join(","));
    });

    csvContent +=
      lineArray.join(line) +
      `${line}Closing Balance,,,,,,,${head.balance}${line}`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "bank statement.csv");
    document.body.appendChild(link);
    link.click();
    setIsSuccessful(true);
    setTimeout(() => {
      setIsSuccessful(false);
    }, 2000);
  };

  const [openPdf, setOpenPdf] = useState(false);
  const [pdfData, setPdfData] = useState({ head: [], table: [] });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [multi, setMulti] = useState(true);
  const downloadPdf = ([head, table]: any) => {
    // console.log("this is the head", head);
    // console.log("this is the table", table);
    setPdfData({ head, table });
    setOpenPdf(true);
  };

  useGetListOfAccounts({
    setAccountList,
    finData,
    bounds,
    selectedBanks,
    access,
    selectedCurrency,
    page,
    setCount,
    setLoadingBankList: setLoadingAccountList,
  });

  useEffect(() => {
    getComparedAmount();
    // getGraphData();
    getListOfTransactions();
  }, []);

  return (
    <BankStatementsStyle>
      <Layouts.DashboardLayout header="Bank Statements ">
        <Header
          {...{
            selectedBanks,
            selectedCurrency,
            setSelectedBanks,
            setSelectedCurrency,
            finData,
            header: "All Bank Statements",
            selectedDate,
            setSelectedDate,
            selectedStatements,
            downloadAll,
            fetchingData,
            isSuccessful,
          }}
        />
        <section className="transactions-table">
          {loadingAccountList ? (
            <Loader />
          ) : (
            <>
              <Component.BankStatementsTable
                data={accountList}
                headers={[
                  "Bank",
                  "Account Number",
                  "Account Name",
                  "Available Balance",
                  "Action",
                ]}
                symbol={"₦"}
                {...{
                  selectedStatements,
                  setSelectedStatements,
                }}
                // downloadAll={downloadAll}
                {...{
                  chosenBanks,
                  setChosenBanks,
                  downloadAll,
                  fetchingData,
                  isSuccessful,
                }}
              />
              {accountList.length > 0 ? (
                <div className="flex pagination">
                  <p>
                    Showing {bounds[0] + 1} to{" "}
                    {bounds[1] > count ? count : bounds[1]} accounts of {count}
                  </p>
                  <Stack spacing={2}>
                    <Pagination
                      count={Math.ceil(count / ITEMS_PER_PAGE)}
                      page={page}
                      onChange={handleChange}
                    />
                  </Stack>
                </div>
              ) : (
                <></>
              )}
            </>
          )}
        </section>

        <PdfProcessor
          openModal={openPdf}
          setOpenModal={setOpenPdf}
          {...{ head: pdfData.head, table: pdfData.table, multi }}
        />
      </Layouts.DashboardLayout>
    </BankStatementsStyle>
  );
};

export default BankStatements;

export function format_time(value: any, withoutTime?: boolean) {
  const options: any = withoutTime
    ? {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }
    : {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
  return new Date(value)
    .toLocaleDateString("en-UK", options)
    .replace(", ", " ");
}

export function format_amount(amount: any) {
  return (amount / 100).toFixed(2);
}
