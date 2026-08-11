import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/Icons";
import { Illustrations } from "../../../assets/Illustrations";
import Button from "../../../components/Button/Button";
import { EmptyGraph } from "../../../components/EmptyGraph/EmptyGraph";
import Loader from "../../../components/Loader/Loader";
import { ISelectOption } from "../../../components/Select/Select.interface";
import {
  useAddNewBankAccountMutation,
  useGetCreditScoreQuery,
} from "../../../features/services";
import { useGetTokens } from "../../../hooks/getDataFromStore/getDataFromState";
import { MONO_PUBLIC_KEY } from "../../../utils/constants";
import { formatCreditScoreDate } from "../../../utils/helpers/display";
import { getRecommendedLimits } from "../../../utils/helpers/get-recommended-limits";
import { monoImport } from "../../Home/mono-import";
import { AnalyticsHeader } from "./AnalyticsHeader";

export const CreditScore: FC<ICreditScoreProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const navigate = useNavigate();
  const { access } = useGetTokens();
  const [connecting, setConnecting] = useState(false);
  const [adding, setAdding] = useState(false);
  const [addAccount] = useAddNewBankAccountMutation();
  const addNewAccount = (code: string) => {
    addAccount({ accessToken: access, code })
      .unwrap()
      .then((res) => {
        toast.success("Account successfully added.");
        navigate("/settings?tab=2");
        // updateListOfBanks();
        // updateAccounts();
      })
      .catch((err) => {
        toast.error("An error occured while adding account.");
      })
      .finally(() => {
        setAdding(false);
      });
  };
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading, error, isError } = useGetCreditScoreQuery({
    accessToken: access,
    page_size: "13",
    page: "1",
  });

  let recommendations: IRecommendedLimits = {
    three: "",
    six: "",
    twelve: "",
    comments: [],
  };
  const [selectedMonths, setSelectedMonths] = useState<
    "three" | "six" | "twelve"
  >("three");
  if (data && !isLoading) {
    const recommendedLimits = getRecommendedLimits(
      data.results[0]?.credit_score
    );

    recommendations = recommendedLimits;
  }

  const buttonClick = () => {
    if (access) {
      setConnecting(true);
      monoConnect.open();
    } else {
      navigate("/signin");
    }
  };

  return (
    <>
      <AnalyticsHeader
        header="Credit Score"
        buttonLabel="Download Credit Report"
        noButton={true}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <section className="overview">
          {data?.results?.length! > 0 ? (
            <div className="overview__flex">
              <section className="overview__flex-left">
                <div className="cards-closing">
                  <Illustrations.ConesIllustration className="cone" />
                  <p>Current Credit Score</p>
                  <h2>{data?.results[0]?.credit_score.toFixed(0)}</h2>
                  <small>
                    As at{" "}
                    <b>
                      {formatCreditScoreDate(data?.results[0]?.month!, "full")}
                    </b>{" "}
                  </small>
                </div>
                <div className="months">
                  <aside className="months__nav">
                    <button
                      className={selectedMonths === "three" ? "selected" : ""}
                      onClick={() => setSelectedMonths("three")}
                    >
                      3 Months
                    </button>
                    <button
                      className={selectedMonths === "six" ? "selected" : ""}
                      onClick={() => setSelectedMonths("six")}
                    >
                      6 Months
                    </button>
                    <button
                      className={selectedMonths === "twelve" ? "selected" : ""}
                      onClick={() => setSelectedMonths("twelve")}
                    >
                      12 Months
                    </button>
                  </aside>
                  <aside className="months__display">
                    <p>Recommended Credit Limit</p>
                    <h2>{recommendations[selectedMonths]}</h2>
                  </aside>
                </div>
                <div className="recommendations">
                  <aside>
                    <p>{recommendations.comments[0]}</p>
                  </aside>
                  <aside>
                    <p>{recommendations.comments[1]}</p>
                  </aside>
                </div>
              </section>

              <section className="overview__flex-right">
                <div className="credit-score-history">
                  <header>
                    <h6>Credit Score History</h6>
                  </header>
                  <ul className="credit-score-history__list">
                    {data?.results?.slice(1)?.map((result, index) => (
                      <li
                        className="credit-score-history__list-item"
                        key={result?.month}
                      >
                        <div>
                          <p>Credit Score: </p>
                          <span>{result?.credit_score?.toFixed(0)}</span>
                          {result?.credit_score <
                          data.results[index + 2]?.credit_score ? (
                            <Icons.RedDownIcon />
                          ) : (
                            <Icons.GreenUpIcon />
                          )}
                        </div>
                        <p>{formatCreditScoreDate(result?.month!, "")}</p>
                      </li>
                    ))}
                    {/* <li className="credit-score-history__list-item">
                    <div>
                      <p>Credit Score: </p>
                      <span>8.3</span>
                      <Icons.RedDownIcon />
                    </div>
                    <p>June, 2021</p>
                  </li> */}
                  </ul>
                </div>
              </section>
            </div>
          ) : (
            <>
              <EmptyGraph>
                <p>
                  You don't have a credit score because you have not connected
                  any account.
                </p>
                <Button
                  onClick={() => {
                    buttonClick && buttonClick();
                  }}
                  disabled={connecting || adding}
                  className="show-1400 export-btn"
                  style={{ marginTop: "24px" }}
                >
                  {connecting
                    ? "Connecting to bank"
                    : adding
                    ? "Adding account"
                    : "Add New Bank"}
                </Button>
              </EmptyGraph>
            </>
          )}
        </section>
      )}
    </>
  );
};

interface ICreditScoreProps {
  selectedDate: ISelectOption;
  setSelectedDate: React.Dispatch<React.SetStateAction<ISelectOption>>;
}

export interface IRecommendedLimits {
  three: string;
  six: string;
  twelve: string;
  comments: string[];
}
