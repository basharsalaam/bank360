export interface IBankProps {
  bankName: string;
  bankIcon?: string;
  accountName: string;
  accountNumber: string;
  balance: number;
  last30DaysAmount: string;
  last30DaysPercentage: string;
  asAt: string;
  accountId: string;
}
