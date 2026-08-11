import { useEffect } from "react";
import { useGetTokens } from "../getDataFromStore/getDataFromState";
import { useGetCategoryGraphMutation } from "../../features/services";
import { ISelectOption } from "../../frontend-components/Select/Select.interface";
import { dateOptionsGraphMeaning } from "../../utils/placeholders";

export const useGetCategoryGraph = ({
  setGraphData,
  setLoadingGraph,
  selectedDate,
  selectedCurrency,
  tran_type,
  channels,
}: IProps) => {
  const [getCategoryGraph] = useGetCategoryGraphMutation();
  const { access } = useGetTokens();

  const getGraphData = (date?: string, banks?: ISelectOption[]) => {
    setGraphData((prev: any) => {});
    setLoadingGraph(true);
    getCategoryGraph({
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
        tran_type,
        channels,
      },
    })
      .unwrap()
      .then((res) => {
        // const newValue: IComparedTransactionResponse[] = [...res];
        // newValue.reverse();
        setGraphData(res);
        setLoadingGraph(false);
      })
      .catch((err) => {
        console.log("errrrror", err);
        // getGraphData();
      })
      .finally(() => {});
  };

  useEffect(() => {
    if (selectedCurrency.value && selectedDate.value && tran_type) {
      getGraphData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate.value, selectedCurrency, tran_type, channels]);
  return { getGraphData };
};

interface IProps {
  setGraphData: (value: React.SetStateAction<any>) => void;
  setLoadingGraph: (value: React.SetStateAction<boolean>) => void;
  selectedDate: ISelectOption;
  selectedCurrency: ISelectOption;
  tran_type?: "true" | "false";
  channels?: string;
}
