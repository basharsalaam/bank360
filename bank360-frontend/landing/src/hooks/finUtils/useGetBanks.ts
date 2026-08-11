import { useAppDispatch } from "./../../app/hooks";
import { useEffect } from "react";
import { useGetBankList2Mutation } from "../../features/services";
import { useGetFinData } from "./../getDataFromStore/getDataFromState";
import { useGetTokens } from "../getDataFromStore/getDataFromState";
import { updateBankList } from "../../features/finData/finData.slice";
import { ISelectOption } from "../../frontend-components/Select/Select.interface";

export const useGetBanks = ({ selectedBanks, setSelectedBanks }: IProps) => {
  const finData = useGetFinData();
  const { access } = useGetTokens();
  const dispatch = useAppDispatch();
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
        console.log("fetch banks error", err);
        updateListOfBanks();
      });
  };
  useEffect(() => {
    updateListOfBanks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

interface IProps {
  selectedBanks: ISelectOption[];
  setSelectedBanks: React.Dispatch<React.SetStateAction<ISelectOption[]>>;
}
