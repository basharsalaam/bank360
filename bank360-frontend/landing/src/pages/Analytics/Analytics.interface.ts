import { ISinkAndSourceProps } from "./modules/SinkAndSource";

export interface IAnalyticsProps {}

export interface ISSProps extends ISinkAndSourceProps {
  label: string;
  // selectedBanks: ISelectOption[];
  // setSelectedBanks: React.Dispatch<React.SetStateAction<ISelectOption[]>>;
  tran_type: "true" | "false";
}

export interface ICreditScore {
  credit_score: number;
  eligible: string;
  month: string;
}
