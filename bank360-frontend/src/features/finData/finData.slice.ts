import { ICategoryInfo } from "./../services/services.interface";
import { RootState } from "../../app/store";
import { createSlice } from "@reduxjs/toolkit";
import { IBank, ICurrency, IFinData } from "./finData.interface";
import { getUniqueArrayOfObjects } from "../../utils/helpers";
const initialState: IFinData = {
    currencies: [
        {
            symbol: "₦",
            name: "Nigerian Naira",
            symbol_native: "₦",
            decimal_digits: 2,
            rounding: 0,
            code: "NGN",
            name_plural: "Nigerian nairas",
        },
    ],
    bankList: null,
    categories: null,
};

const finDataSlice = createSlice({
    name: "finData",
    initialState,
    reducers: {
        updateCurrencies: (state, action: { payload: ICurrency[] }) => {
            state.currencies = action.payload;
        },
        updateBankList: (state, action: { payload: IBank[] }) => {
            state.bankList = getUniqueArrayOfObjects(
                action.payload,
                "name"
            ) as IBank[];
        },
        updateCategories: (
            state,
            action: {
                payload: ICategoryInfo[];
            }
        ) => {
            state.categories = getUniqueArrayOfObjects(
                action.payload,
                "category"
            );
        },
    },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectFinData = (state: RootState) => state.finData;

// exports the actions
export const { updateCurrencies, updateBankList, updateCategories } =
    finDataSlice.actions;

export default finDataSlice.reducer;
