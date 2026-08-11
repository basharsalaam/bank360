import { useGetTokens } from "../getDataFromStore/getDataFromState";
import { useEffect } from "react";
import { ISelectOption } from "../../frontend-components/Select/Select.interface";
import { useGetFinData } from "../getDataFromStore/getDataFromState";
export const useGetCurrencySymbol = ({
    setCurrencySymbol,
    selectedCurrency,
}: {
    setCurrencySymbol: (value: React.SetStateAction<string>) => void;
    selectedCurrency: ISelectOption;
}) => {
    const finData = useGetFinData();

    useEffect(() => {
        setCurrencySymbol(
            finData?.currencies?.filter(
                (curr) => curr?.code === selectedCurrency.value
            )[0]?.symbol as string
        );
    }, [selectedCurrency, finData?.currencies]);
};
