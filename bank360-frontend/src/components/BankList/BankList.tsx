import React, { FC, useEffect, useState } from "react";
import { Icons } from "../../assets/Icons";
import { IBankProps } from "./BankList.interface";
import { BankListStyle } from "./BankList.style";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ICompare } from "../../features/services/services.interface";
import { useGetTransactionsComparedMutation } from "../../features/services";
import { useGetTokens } from "../../hooks/getDataFromStore/getDataFromState";
import Loader from "../Loader/Loader";
import { Illustrations } from "../../assets/Illustrations";
import { numberWithCommas } from "../../utils/helpers";
import { useRefresh } from "../../hooks/display/refresh";

const BankList: FC<{
  bankList: IBankProps[];
  currency: string;
  loadingBankList?: boolean;
}> = ({ bankList, currency, loadingBankList }) => {
  return (
    <BankListStyle>
      {/* {bankList.length > 0 ? ( */}
      <>
        <section className="row">
          <div className="col head bank-col">
            <h4>Bank Name</h4>
          </div>
          <div className="col head name-col">
            <h4>Account Name</h4>
          </div>
          <div className="col head">
            <h4>Account Number</h4>
          </div>
          <div className="col head">
            <h4>Balance</h4>
          </div>
          <div className="col head">
            <h4>Last 30 Days</h4>
          </div>
        </section>
        {!loadingBankList ? (
          bankList.length > 0 ? (
            bankList.map((bank, index) => (
              <SingleBank
                {...{ bank, currency }}
                key={bank.accountName + index}
              />
            ))
          ) : (
            <Illustrations.EmptyIllustration />
          )
        ) : (
          <Loader />
        )}
      </>
    </BankListStyle>
  );
};

export default BankList;

const SingleBank: FC<{
  bank: IBankProps;
  currency: string;
}> = ({
  bank: {
    bankIcon,
    bankName,
    accountName,
    accountNumber,
    balance,
    last30DaysAmount,
    last30DaysPercentage,
    asAt,
    accountId,
  },
  currency,
}) => {
  const [copied, setCopied] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const { access } = useGetTokens();

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const [loadingCompare, setLoadingCompare] = useState(true);
  const [last30Days, setLast30Days] = useState<ICompare>({
    now: 0,
    then: 0,
    diff: 0,
    percent: 0,
  });
  const [getCompared] = useGetTransactionsComparedMutation();
  const getComparedData = () => {
    const currentDate = new Date();
    getCompared({
      accessToken: access,
      params: {
        account_id: accountId,
        date: `${currentDate.getFullYear()}, ${
          currentDate.getMonth() + 1
        }, ${currentDate.getDate()}`,
        duration: 30,
        size: 1,
        currency,
      },
    })
      .unwrap()
      .then((res) => {
        setLoadingCompare(false);
        setLast30Days(res[0].balance);
      })
      .catch((err) => {
        getComparedData();
      })
      .finally(() => {});
  };
  useEffect(() => {
    getComparedData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { refreshAccounts, refreshing } = useRefresh();

  return (
    <section className="row bordered">
      <div className="col bank-col">
        <button
          className="refresh-btn"
          onClick={() => {
            refreshAccounts(accountId);
          }}
        >
          <Icons.RefreshIcon className={refreshing ? "roll" : ""} />
        </button>
        <div className="bank-icon-container">
          <img src={bankIcon} alt={bankName} className="bank-icon" />
        </div>
        <h4>
          {bankName.slice(0, 10) +
            ((bankName.length as number) > 10 ? "..." : "")}
        </h4>
      </div>
      <div className="col name-col">
        <h4>
          {accountName.slice(0, 20) +
            ((accountName.length as number) > 20 ? "..." : "")}
        </h4>
      </div>
      <div className="col ">
        <h4>{accountNumber}</h4>
        <CopyToClipboard text={accountNumber}>
          <div className="copyyy">
            <button className="copy-btn" onClick={handleCopy}>
              <Icons.CopyIcon />
            </button>
            {copied && <span className="alert">Copied</span>}
          </div>
        </CopyToClipboard>
      </div>
      <div className="col start">
        {showBalance ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h4>₦{numberWithCommas(balance)}</h4>
            <p className="as-at">as at {asAt}</p>
          </div>
        ) : (
          <h4>XXXXX.XX</h4>
        )}
        <button
          className="show-btn"
          onClick={() => {
            setShowBalance((prev) => !prev);
          }}
        >
          {showBalance ? <Icons.EyeCloseIcon /> : <Icons.EyeOpenIcon />}
        </button>
      </div>
      <div className="col ">
        {loadingCompare ? (
          <h4>Loading</h4>
        ) : (
          <h4>
            {last30Days.now / 100}{" "}
            <b className={last30Days.percent > 0 ? "success" : "failure"}>
              ({last30Days.percent > 0 ? "+" : "-"}
              {Math.abs(Math.round(last30Days.percent))}%)
            </b>
          </h4>
        )}
      </div>
    </section>
  );
};
