import React, { FC, useEffect, useState } from "react";
import { Icons } from "../../assets/Icons";
import { IBankProps } from "./BankList.interface";
import { BankListStyle } from "./BankList.style";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ICompare } from "../../features/services/services.interface";
import {
  useDisconnectBankAccountMutation,
  useGetTransactionsComparedMutation,
} from "../../features/services";
import { useGetTokens } from "../../hooks/getDataFromStore/getDataFromState";
import Loader from "../Loader/Loader";
import { Illustrations } from "../../assets/Illustrations";
import { ModalComp } from "../ModalComp/ModalComp";
import { SuccessModal } from "../ModalComp/style";
import toast from "react-hot-toast";
import { useRefresh } from "../../hooks/display/refresh";

const AbridgedBankList: FC<{
  bankList: IBankProps[];
  currency: string;
  loadingBankList?: boolean;
  updateAccounts: () => void;
}> = ({ bankList, currency, loadingBankList, updateAccounts }) => {
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
            <h4>Action</h4>
          </div>
        </section>
        {!loadingBankList ? (
          bankList.length > 0 ? (
            bankList.map((bank, index) => (
              <SingleBank
                {...{ bank, currency, updateAccounts }}
                key={bank.accountName}
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

export default AbridgedBankList;

const SingleBank: FC<{
  bank: IBankProps;
  currency: string;
  updateAccounts: () => void;
}> = ({
  bank: {
    bankIcon,
    bankName,
    accountName,
    accountNumber,
    last30DaysPercentage,
    asAt,
    accountId,
  },
  currency,
  updateAccounts,
}) => {
  const [copied, setCopied] = useState(false);
  const { access } = useGetTokens();

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loadingCompare, setLoadingCompare] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const [openWarningModal, setOpenWarningModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [disconnect] = useDisconnectBankAccountMutation();

  const deleteAccount = () => {
    setDeleting(true);
    disconnect({
      accessToken: access,
      id: accountId,
    })
      .unwrap()
      .then((res) => {
        toast.success("Account disconnected successfully");
        updateAccounts();
        setOpenWarningModal(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setDeleting(false);
      });
  };
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
          {bankName.slice(0, 18) +
            ((bankName.length as number) > 18 ? "..." : "")}
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
        <button
          className="disconnect-btn"
          onClick={() => {
            setOpenWarningModal(true);
          }}
        >
          Disconnect
        </button>
      </div>

      <ModalComp open={openWarningModal} setOpen={setOpenWarningModal}>
        <SuccessModal className="rem-pad">
          <button
            className="close-btn"
            onClick={() => {
              setOpenWarningModal(false);
            }}
          >
            <Icons.CloseIcon />
          </button>
          <section className="top">
            <Illustrations.WarningIllustration />
            <h2>Are you sure you want to disconnect</h2>
            <p>Be sure you want to delete this category before you go ahead.</p>
          </section>

          <section className="bottom">
            <button
              className="outline-btn"
              onClick={() => {
                setOpenWarningModal(false);
              }}
              type="button"
            >
              Cancel
            </button>
            <button
              className="filled-btn"
              disabled={deleting}
              onClick={() => {
                deleteAccount();
              }}
            >
              {deleting ? "Disconnecting" : "Disconnect Account"}
            </button>
          </section>
        </SuccessModal>
      </ModalComp>
    </section>
  );
};
