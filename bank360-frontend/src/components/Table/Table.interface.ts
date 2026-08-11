import { ISelectOption } from "./../Select/Select.interface";
import { ITransaction } from "../../features/services/services.interface";

export interface ITableProps {
    header?: string;
    headers: string[];
    data: ITransaction[];
    symbol: string;
    setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>;
    totalCount?: number;
    className?: string;
    setNewPage: React.Dispatch<React.SetStateAction<number>>;
    currPage: number;
    balance?: boolean;

    // infinite scroll
    more: boolean;
    loadingMore: boolean;
    loadMoreTransactions: () => void;
    setElement: any;
    rootElement: any;
    getListOfTransactions?: (
        append?: boolean | undefined,
        newPage?: number | undefined,
        date?: string | undefined,
        banks?: ISelectOption[] | undefined,
        currency?: string | undefined,
        search?: string | undefined
    ) => void;
    categories?: string;
}
