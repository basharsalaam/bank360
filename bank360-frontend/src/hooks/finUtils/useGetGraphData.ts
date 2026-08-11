import { useEffect } from "react";
import { useGetTokens } from "./../getDataFromStore/getDataFromState";
import { useGetTransactionsComparedMutation } from "../../features/services";
import { ISelectOption } from "../../components/Select/Select.interface";
import { dateOptionsGraphMeaning } from "../../utils/placeholders";
import { IComparedTransactionResponse } from "../../features/services/services.interface";

export const useGetGraphData = ({
  setGraphData,
  setLoadingGraph,
  selectedDate,
  selectedCurrency,
  selectedBanks,
}: IProps) => {
  const [getCompared] = useGetTransactionsComparedMutation();
  const { access } = useGetTokens();

  const getGraphData = (date?: string, banks?: ISelectOption[]) => {
    setGraphData((prev) => []);
    setLoadingGraph(true);
    getCompared({
      accessToken: access,
      params: {
        date: dateOptionsGraphMeaning()[(date || selectedDate.value) as string]
          .date,
        duration:
          dateOptionsGraphMeaning()[(date || selectedDate.value) as string]
            .duration,
        size: dateOptionsGraphMeaning()[(date || selectedDate.value) as string]
          .size,
        currency: selectedCurrency.value,
        bank_name: (banks || selectedBanks).map((bank) => bank.value).join(","),
      },
    })
      .unwrap()
      .then((res) => {
        const newValue: IComparedTransactionResponse[] = [...res];
        newValue?.reverse();
        setGraphData(newValue);
        setLoadingGraph(false);
      })
      .catch((err) => {
        console.log("errrrror", err);
        // getGraphData();
      })
      .finally(() => {
        setLoadingGraph(false);
      });
  };

  useEffect(() => {
    if (
      selectedCurrency.value &&
      selectedBanks.length > 0 &&
      selectedDate.value
    ) {
      getGraphData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate.value, selectedBanks, selectedCurrency]);
  return { getGraphData };
};

interface IProps {
  setGraphData: (
    value: React.SetStateAction<IComparedTransactionResponse[]>
  ) => void;
  setLoadingGraph: (value: React.SetStateAction<boolean>) => void;
  selectedDate: ISelectOption;
  selectedCurrency: ISelectOption;
  selectedBanks: ISelectOption[];
}
