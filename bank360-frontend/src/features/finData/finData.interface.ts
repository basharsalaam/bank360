import { ICategoryInfo } from "./../services/services.interface";
export interface IFinData {
    currencies: ICurrency[] | null;
    bankList: IBank[] | null;
    categories: ICategoryInfo[] | null;
}

export interface ICurrency {
    code: string;
    decimal_digits: number;
    name: string;
    name_plural: string;
    rounding: number;
    symbol: string;
    symbol_native: string;
}

export interface IBank {
    logo: string;
    name: string;
}
