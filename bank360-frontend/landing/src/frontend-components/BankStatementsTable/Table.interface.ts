import { ISelectOption } from "./../Select/Select.interface";
import { IBankProps } from "./../BankList/BankList.interface";
import { IBankStatement } from "./../../pages/BankStatements/BankStatements.interface";

export interface ITableProps {
  header?: string;
  headers: string[];
  data: IBankProps[];
  symbol: string;
  selectedStatements: number[];
  setSelectedStatements: React.Dispatch<React.SetStateAction<number[]>>;
  downloadAll?: (
    type: string,
    accountNumber?: string,
    banks?: ISelectOption[]
  ) => void;
  chosenBanks?: ISelectOption[];
  setChosenBanks: React.Dispatch<React.SetStateAction<ISelectOption[]>>;
  fetchingData: boolean;
  isSuccessful?: boolean;
}
