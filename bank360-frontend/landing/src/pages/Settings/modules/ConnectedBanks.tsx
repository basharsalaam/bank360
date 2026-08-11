import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons";
import { Illustrations } from "../../../assets/illustrations";
import { Component } from "../../../frontend-components";
import { IBankProps } from "../../../frontend-components/BankList/BankList.interface";
import { ISelectOption } from "../../../frontend-components/Select/Select.interface";
import {
  useGetFinData,
  useGetTokens,
} from "../../../hooks/getDataFromStore/getDataFromState";
import { SettingsHeader } from "./SettingsHeader";
import { monoImport } from "./../../Homepage/mono-import";
import { ITEMS_PER_PAGE, MONO_PUBLIC_KEY } from "../../../utils/constants";
import {
  useAddNewBankAccountMutation,
  useGetBankList2Mutation,
  useGetListOfAccountsMutation,
} from "../../../features/services";
import toast from "react-hot-toast";
import { fetchAccountList } from "../../Homepage/Home.utils";
import { IBank } from "../../../features/finData/finData.interface";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useAppDispatch } from "../../../app/hooks";
import { updateBankList } from "../../../features/finData/finData.slice";

export const ConnectedBanks: FC<IConnectedBanksProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const { access } = useGetTokens();
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);

  const updateAccounts = () => {
    fetchAccountList({
      setAccountList,
      getAccounts: getAccountsList,
      access,
      currency: selectedCurrency.value,
      bank_name: selectedBanks.map((bank) => bank.value).join(","),
      bankList: finData.bankList as IBank[],
      setCount,
    });
  };

  // * Add new bank account
  const [addAccount] = useAddNewBankAccountMutation();
  const addNewAccount = (code: string) => {
    addAccount({ accessToken: access, code })
      .unwrap()
      .then((res) => {
        toast.success("Account successfully added.");
        updateListOfBanks();
        updateAccounts();
      })
      .catch((err) => {
        toast.error("An error occured while adding account.");
      })
      .finally(() => {
        setAdding(false);
      });
  };

  const [connecting, setConnecting] = useState(false);
  const [adding, setAdding] = useState(false);
  // !MONO CONNECTION
  const MonoConnect: any = monoImport.MonoConnect;
  const monoConnect = React.useMemo(() => {
    const monoInstance = new MonoConnect({
      onClose: () => {
        setConnecting(false);
      },
      onLoad: () => console.log("Widget loaded successfully"),
      onSuccess: ({ code }: { code: any }) => {
        setConnecting(false);
        setAdding(true);
        addNewAccount(code);
      },
      key: MONO_PUBLIC_KEY,
    });

    monoInstance.setup();

    return monoInstance;
  }, []);

  const [getAccountsList] = useGetListOfAccountsMutation();
  const [accountList, setAccountList] = useState<IBankProps[]>([]);
  const [selectedBanks, setSelectedBanks] = useState<ISelectOption[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<ISelectOption>({
    label: "",
    value: "",
  });
  const finData = useGetFinData();
  const dispatch = useAppDispatch();
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
        console.log(err);
      });
  };
  useEffect(() => {
    updateListOfBanks();
  }, []);
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
  const [bounds, setBounds] = useState([0, ITEMS_PER_PAGE]);
  const [count, setCount] = useState(0);
  // List of bank accounts
  const [loadingBankList, setLoadingBankList] = useState(true);

  useEffect(() => {
    if (finData.bankList && selectedBanks.length > 0) {
      fetchAccountList({
        setAccountList,
        getAccounts: getAccountsList,
        access,
        currency: selectedCurrency.value,
        bank_name: selectedBanks.map((bank) => bank.value).join(","),
        bankList: finData.bankList as IBank[],
        paginate: true,
        page,
        page_size: 5,
        setCount,
        setLoadingBankList,
      });
    }
  }, [
    access,
    selectedCurrency.value,
    selectedBanks,
    bounds,
    page,
    finData.bankList,
  ]);
  const [currentItems, setCurrentItems] = useState<IBankProps[]>([]);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentItems([]);
    setPage(value);
    setBounds((prev) => [(value - 1) * ITEMS_PER_PAGE, value * ITEMS_PER_PAGE]);
  };

  return (
    <>
      <SettingsHeader
        header="Connected Banks"
        buttonLabel={
          connecting
            ? "Connecting to bank"
            : adding
            ? "Adding account"
            : "Add New Bank"
        }
        buttonClick={() => {
          if (access) {
            setConnecting(true);
            monoConnect.open();
          } else {
            navigate("/signin");
          }
        }}
        selectedBanks={selectedBanks}
        selectedDate={selectedDate}
        selectedCurrency={selectedCurrency}
        // isThereDateSelect={true}
        // isThereBank={true}
        // isThereCategoriesSelect={true}
        buttonDisabled={connecting || adding}
        finData={finData}
        setSelectedBanks={setSelectedBanks}
      />
      <section className="bank-list-container">
        {/* List of banks for that page */}
        <Component.AbridgedBankList
          bankList={accountList}
          currency={"₦"}
          loadingBankList={loadingBankList}
          updateAccounts={updateAccounts}
        />
        {accountList.length > 0 ? (
          <div className="flex">
            <p>
              Showing {bounds[0] + 1} to {bounds[1] > count ? count : bounds[1]}{" "}
              accounts of {count}
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
      </section>
    </>
  );
};

interface IConnectedBanksProps {
  selectedDate: ISelectOption;
  setSelectedDate: React.Dispatch<React.SetStateAction<ISelectOption>>;
}

const accountList: IBankProps[] = [
  {
    bankName: "Access Bank",
    bankIcon: Icons.BankLogos.AccessLogo,
    accountName: "Octave Analytics LTD",
    accountNumber: "0233758910",
    balance: 9,
    last30DaysAmount: "ala",
    last30DaysPercentage: "ala",
    asAt: "ala",
    accountId: "ala",
  },

  {
    bankName: "Access Bank",
    bankIcon: Icons.BankLogos.AccessLogo,
    accountName: "Octave Analytics LTD",
    accountNumber: "0233758910",
    balance: 9,
    last30DaysAmount: "ala",
    last30DaysPercentage: "ala",
    asAt: "ala",
    accountId: "ala",
  },
  {
    bankName: "Access Bank",
    bankIcon: Icons.BankLogos.AccessLogo,
    accountName: "Octave Analytics LTD",
    accountNumber: "0233758910",
    balance: 9,
    last30DaysAmount: "ala",
    last30DaysPercentage: "ala",
    asAt: "ala",
    accountId: "ala",
  },
  {
    bankName: "Access Bank",
    bankIcon: Icons.BankLogos.AccessLogo,
    accountName: "Octave Analytics LTD",
    accountNumber: "0233758910",
    balance: 9,
    last30DaysAmount: "ala",
    last30DaysPercentage: "ala",
    asAt: "ala",
    accountId: "ala",
  },
];
