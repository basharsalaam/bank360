import { useEffect } from "react";
import { IBankProps } from "../../components/BankList/BankList.interface";
import { ISelectOption } from "../../components/Select/Select.interface";
import { IBank, IFinData } from "../../features/finData/finData.interface";
import { useGetListOfAccountsMutation } from "../../features/services";
import { fetchAccountList } from "../../views/Home/Home.utils";

export const useGetListOfAccounts = ({
  finData,
  selectedBanks,
  setAccountList,
  access,
  selectedCurrency,
  page,
  setCount,
  setLoadingBankList,
  bounds,
}: IUseGetListOfAccounts) => {
  const [getAccountsList] = useGetListOfAccountsMutation();

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

  return {};
};

interface IUseGetListOfAccounts {
  setAccountList: React.Dispatch<React.SetStateAction<IBankProps[]>>;
  finData: IFinData;
  bounds: number[];
  selectedBanks: ISelectOption[];
  access: string;
  selectedCurrency: any;
  page?: number | undefined;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setLoadingBankList?: any;
}
