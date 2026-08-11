import { getBankIcon } from "./../../utils/helpers/display";
import { IBankProps } from "../../frontend-components/BankList/BankList.interface";
import {
  IAccount,
  IPaginatedAccountResponse,
} from "./../../features/services/services.interface";
import { IBank } from "../../features/finData/finData.interface";
export const fetchAccountList = ({
  setAccountList,
  getAccounts,
  access,
  currency,
  bank_name,
  page_size,
  page,
  paginate,
  bankList,
  setCount,
  setLoadingBankList,
}: {
  setAccountList: React.Dispatch<React.SetStateAction<IBankProps[]>>;
  getAccounts: any;
  access: string;
  currency: string;
  bank_name?: string;
  page_size?: number;
  page?: number;
  paginate?: boolean;
  bankList: IBank[];
  setCount?: React.Dispatch<React.SetStateAction<number>>;
  setLoadingBankList?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  getAccounts({
    accessToken: access,
    params: {
      bank_name,
      currency,
      page_size,
      page,
      paginate,
    },
  })
    .unwrap()
    .then((res: IPaginatedAccountResponse) => {
      setCount && setCount(res.count);

      setAccountList((prev) =>
        res.results?.map((item: IAccount) => ({
          bankName: item.bank_name,
          bankIcon: getBankIcon({
            bankList,
            bankName: item.bank_name,
          }),
          accountName: item.name,
          accountNumber: item.account_no,
          balance: item.balance / 100,
          last30DaysAmount: "₦ 1,000,000",
          last30DaysPercentage: "15%",
          asAt: new Date(item?.updated_at as string)?.toLocaleDateString(
            "en-us",
            {
              // weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            }
          ),
          accountId: item.account_id,
        }))
      );
      setLoadingBankList && setLoadingBankList(false);
    })
    .catch((err: any) => {
      console?.log(err);
    });
};
