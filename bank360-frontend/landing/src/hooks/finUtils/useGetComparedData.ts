import { IComparedTransactionResponse } from "./../../features/services/services.interface";
import { dateOptionsMeaning } from "./../../utils/placeholders";
import { useGetTransactionsComparedMutation } from "../../features/services";
import { useGetTokens } from "./../getDataFromStore/getDataFromState";
import { ISelectOption } from "../../frontend-components/Select/Select.interface";
import { useEffect } from "react";
export const useGetComparedAmount = ({
  setLoadingCompare,
  selectedDate,
  selectedCurrency,
  selectedBanks,
  setComparedData,
  returnPromise,
  accountId,
}: IProps) => {
  const { access } = useGetTokens();
  const [getCompared] = useGetTransactionsComparedMutation();

  const getComparedAmount = (
    date?: string,
    banks?: ISelectOption[],
    callback?: any
  ) => {
    setLoadingCompare(true);
    const getCompare = () =>
      getCompared({
        accessToken: access,
        params: {
          date: dateOptionsMeaning()[(date || selectedDate.value) as string]
            .date,
          duration:
            dateOptionsMeaning()[(date || selectedDate.value) as string]
              .duration,
          size: dateOptionsMeaning()[(date || selectedDate.value) as string]
            .size,
          currency: selectedCurrency.value,
          bank_name: selectedBanks
            ? (banks || selectedBanks).map((bank) => bank.value).join(",")
            : undefined,
          account_id: accountId,
        },
      })
        .unwrap()
        .then((res) => {
          callback && callback();
          setLoadingCompare(false);
          setComparedData(res[0]);

          return res[0];
        })
        .catch((err) => {
          throw Error(err.message);
          // getComparedAmount();
        })
        .finally(() => {
          setLoadingCompare(false);
        });

    if (returnPromise) return getCompare();
    getCompare()
      .then((data) => {})
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (
      selectedBanks &&
      selectedCurrency.value &&
      selectedBanks.length > 0 &&
      selectedDate.value
    ) {
      getComparedAmount();
    }
    if (!selectedBanks && selectedCurrency.value && selectedDate.value) {
      getComparedAmount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrency, selectedBanks, selectedDate]);

  return { getComparedAmount };
};

interface IProps {
  setLoadingCompare: (value: React.SetStateAction<boolean>) => void;
  selectedDate: ISelectOption;
  selectedCurrency: ISelectOption;
  selectedBanks?: ISelectOption[];
  setComparedData: (
    value: React.SetStateAction<IComparedTransactionResponse>
  ) => void;
  returnPromise?: boolean;
  accountId?: string;
}
