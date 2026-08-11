import { IBank } from "../../features/finData/finData.interface";

interface IShowBankIconProps {
  bankList: IBank[];
  bankName: string;
}

// Get an image of the bank icon from the bank list
export const getBankIcon = ({ bankList, bankName }: IShowBankIconProps) => {
  return bankList?.filter((bank) => bank?.name === bankName)[0]?.logo;
};

export const formatDate = (date: string, weekday?: boolean) => {
  return weekday
    ? new Date(date as string)?.toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : new Date(date as string)?.toLocaleDateString("en-us", {
        // weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
};

export const getMonthAndDate = (date: any) => {
  return new Date(date as string)?.toLocaleDateString("en-us", {
    // weekday: "long",
    // year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getMonth = (date: any) => {
  return new Date(date as string)?.toLocaleDateString("en-us", {
    // weekday: "long",
    // year: "numeric",
    month: "short",
    // day: "numeric",
  });
};

// convert date to "hh:mm pm"
export const getTime = (date: any) => {
  return new Date(date as string)?.toLocaleTimeString("en-us", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

// converts date string of form "dd"
export const formatCreditScoreDate = (dateStr: string, type: string) => {
  return new Date(`${dateStr}-${new Date().getDate()}`).toLocaleDateString(
    "en-us",
    type === "full"
      ? {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      : { year: "numeric", month: "long" }
  );
};
