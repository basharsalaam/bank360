import React, { useEffect, useState } from "react";
import { Icons } from "../../assets/Icons";
import { Illustrations } from "../../assets/Illustrations";
import { Component } from "../../components";
import { IBankProps } from "../../components/BankList/BankList.interface";
import Button from "../../components/Button/Button";
import { Layouts } from "../../layouts";
import { HomeStyle } from "./Home.style";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ITEMS_PER_PAGE, MONO_PUBLIC_KEY } from "../../utils/constants";
import {
  useGetTokens,
  useGetUserData,
} from "./../../hooks/getDataFromStore/getDataFromState";
import Select from "../../components/Select/Select";
import { ISelectOption } from "../../components/Select/Select.interface";
import { getXchangeRateNGNVsUSD } from "../../features/services/misc";
import { getCookie } from "../../utils/cookies";
import { useGetFinData } from "./../../hooks/getDataFromStore/getDataFromState";
import {
  useAddNewBankAccountMutation,
  useGetCurrencyListQuery,
  useGetListOfAccountsMutation,
  useGetNumberOfBanksQuery,
  useGetTotalBalanceMutation,
  useGetBankList2Mutation,
} from "../../features/services";
import { useAppDispatch } from "../../app/hooks";
import { updateBankList } from "../../features/finData/finData.slice";
import { fetchAccountList } from "./Home.utils";
import { IBank } from "../../features/finData/finData.interface";
import { monoImport } from "./mono-import";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { numberWithCommas } from "../../utils/helpers";
import { markMonoSyncPending } from "../../utils/mono-sync";

const Home = () => {
  const [showValue, setShowValue] = useState(false);
  const [page, setPage] = React.useState(1);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentItems, setCurrentItems] = useState<IBankProps[]>([]);
  const [xchangeRate, setXchangeRate] = useState("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const finData = useGetFinData();
  const { access } = useGetTokens();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [adding, setAdding] = useState(false);

  // CQ currencies query
  const [skipCQ, setSkipCQ] = React.useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: currData } = useGetCurrencyListQuery(
    { accessToken: access },
    {
      skip: skipCQ,
    }
  );

  // BQ banks query
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [skipBQ, setSkipBQ] = React.useState(true);

  // get number of accounts
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: numberOfBanks } = useGetNumberOfBanksQuery({
    accessToken: access,
  });

  // pagination bounds
  const [bounds, setBounds] = useState([0, ITEMS_PER_PAGE]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentItems([]);
    setPage(value);
    setBounds((prev) => [(value - 1) * ITEMS_PER_PAGE, value * ITEMS_PER_PAGE]);
  };

  useEffect(() => {
    // Get exchange rate value from NGN to USD from cookies
    const xrv = getCookie("xrv");
    if (xrv) {
      setXchangeRate(xrv);
    } else {
      // cookie expired get new value
      getXchangeRateNGNVsUSD(setXchangeRate);
    }
  }, [bounds, page]);
  const userData = useGetUserData();

  const [selectedBanks, setSelectedBanks] = useState<ISelectOption[]>([]);
  useEffect(() => {
    setSelectedBanks(
      selectedBanks[0]?.value
        ? selectedBanks
        : finData?.bankList
        ? finData.bankList.map((bank: any) => ({
            label: bank.name,
            value: bank.name,
          }))
        : [{ label: "", value: "" }]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finData?.bankList]);

  const [selectedCurrency, setSelectedCurrency] = useState<ISelectOption>({
    label: "",
    value: "",
  });
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

  // update currencies if none is present
  useEffect(() => {
    if (!finData.currencies) {
      setSkipCQ(false);
    }
  }, [finData.currencies]);

  // update currencies if none is present
  useEffect(() => {
    if (!finData.bankList) {
      setSkipBQ(false);
    }
  }, [finData.bankList]);

  // update amount
  const [getTotalBalance] = useGetTotalBalanceMutation();
  const getBalance = () => {
    if (selectedCurrency?.value) {
      getTotalBalance({
        accessToken: access,
        params: {
          currency: selectedCurrency.value,
          bank_name: selectedBanks.map((bank) => bank.value).join(","),
        },
      })
        .unwrap()
        .then((data: any) => {
          // convert from kobo to naira
          setTotalAmount(data.data / 100);
        })
        .catch((err: any) => {
          getBalance();
        });
    }
  };
  useEffect(() => {
    getBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBanks, selectedCurrency]);

  const [accountList, setAccountList] = useState<IBankProps[]>([]);
  const [getAccountsList] = useGetListOfAccountsMutation();
  const [count, setCount] = useState(0);
  const [currencySymbol, setCurrencySymbol] = useState("");
  useEffect(() => {
    setCurrencySymbol(
      finData?.currencies?.filter(
        (curr) => curr?.code === selectedCurrency.value
      )[0]?.symbol as string
    );
  }, [selectedCurrency, finData?.currencies]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    access,
    selectedCurrency.value,
    selectedBanks,
    bounds,
    page,
    finData.bankList,
  ]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // * Add new bank account
  const [addAccount] = useAddNewBankAccountMutation();
  const addNewAccount = (code: string) => {
    addAccount({ accessToken: access, code })
      .unwrap()
      .then((res) => {
        markMonoSyncPending(res.account_id);
        toast.success("Account connected. Transactions are syncing.");
        getBalance();

        updateListOfBanks();
        fetchAccountList({
          setAccountList,
          getAccounts: getAccountsList,
          access,
          currency: selectedCurrency.value,
          bank_name: selectedBanks.map((bank) => bank.value).join(","),
          bankList: finData.bankList as IBank[],
          setCount,
        });
      })
      .catch((err) => {
        toast.error("An error occured while adding account.");
      })
      .finally(() => {
        setAdding(false);
      });
  };

  const [connecting, setConnecting] = useState(false);
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
        if (!code) {
          toast.error("Mono did not return an authorization code.");
          return;
        }
        setAdding(true);
        addNewAccount(code);
      },
      key: MONO_PUBLIC_KEY,
      scope: "auth",
    });

    monoInstance.setup();

    return monoInstance;
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HomeStyle>
      <Layouts.DashboardLayout header="Home ">
        <header className="dashboard-header">
          <section className="dashboard-header__left">
            <h2 className="dashboard-header__title">
              Hey, {userData.first_name} 💸{" "}
            </h2>
            <p className="dashboard-header__sub">Welcome to your dashboard.</p>
          </section>

          <section className="header-flex">
            {" "}
            <Select
              placeholder="Select currency"
              inputPlaceholder="Search currency"
              Icon={<Icons.ChevronDownIcon />}
              width="164px"
              searchInput={true}
              selected={selectedCurrency}
              handleChange={({ label, value }) => {
                // start from page 1
                setPage(1);
                setBounds([0, 5]);
                setSelectedCurrency({ label, value });
              }}
              className="full-width"
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
            <Button
              onClick={() => {
                if (access) {
                  setConnecting(true);
                  monoConnect.open();
                } else {
                  navigate("/signin");
                }
              }}
              disabled={connecting || adding}
              className="add-bank-btn full-width"
            >
              {connecting
                ? "Connecting to bank"
                : adding
                ? "Adding account"
                : "Add New Bank"}
            </Button>
          </section>
        </header>
        <section className="dashboard-main">
          {/*  overview */}
          <div className="left">
            <section className="flex left-header">
              <h4>Bank Account Overview</h4>

              <div className="flex">
                <Select
                  placeholder="Select bank"
                  inputPlaceholder="Search bank"
                  Icon={<Icons.ChevronDownIcon />}
                  multiple={true}
                  searchInput={true}
                  multipleSelected={selectedBanks}
                  multipleHandleChange={(newSelected: ISelectOption[]) => {
                    // start from page 1
                    setPage(1);
                    setBounds([0, 5]);
                    setSelectedBanks((prev) => newSelected);
                  }}
                  className="bank-select"
                  options={
                    finData.bankList
                      ? finData.bankList?.map((bank) => ({
                          label: bank.name,
                          value: bank.name,
                        }))
                      : undefined
                  }
                />{" "}
                {xchangeRate && (
                  <span className="convert-value">
                    $1 = ₦
                    {numberWithCommas(Number(Number(xchangeRate).toFixed(2)))}
                  </span>
                )}
              </div>
            </section>{" "}
            <section className="display-amount">
              <p>
                Total Amount (across{" "}
                {selectedBanks.length === finData?.bankList?.length
                  ? "all"
                  : selectedBanks?.length}{" "}
                banks){" "}
              </p>
              <div className="display-amount__value">
                <h2>
                  {" "}
                  {showValue
                    ? `${currencySymbol}${numberWithCommas(totalAmount)}`
                    : "₦ XXXXX.XX"}
                </h2>
                <button
                  className="show-btn"
                  onClick={() => {
                    setShowValue((prev) => !prev);
                  }}
                >
                  {showValue ? <Icons.EyeCloseIcon /> : <Icons.EyeOpenIcon />}
                </button>
              </div>

              <div className="abs">
                <figure>
                  <Icons.SimilarIcon />
                </figure>{" "}
                <h3>
                  $
                  {numberWithCommas(
                    Number(
                      (totalAmount / (Number(xchangeRate) as number)).toFixed(2)
                    )
                  )}
                </h3>
              </div>
            </section>
            <section className="bank-list-container">
              {/* List of banks for that page */}
              <Component.BankList
                bankList={accountList}
                currency={selectedCurrency.value}
                loadingBankList={loadingBankList}
              />
              {accountList.length > 0 ? (
                <div className="flex">
                  {/* Pagination */}
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
                  {/* <Link to={"/home"}>See more banks</Link> */}
                </div>
              ) : (
                <></>
              )}
            </section>
          </div>

          <div className="right">
            <section className="card">
              <Illustrations.LayersIllustration />
              <h3>Connected Bank Accounts</h3>
              <span className="highlighted">
                {count} bank accounts connected
              </span>
              <small>You have 2000 sync requests</small>
            </section>

            <Component.HelpWidget />
          </div>
        </section>
      </Layouts.DashboardLayout>
    </HomeStyle>
  );
};

export default Home;
