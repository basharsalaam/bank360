import { RootState } from "./../../app/store";
import { createSlice } from "@reduxjs/toolkit";
import { ITokens } from "./tokens.interface";
const initialState: ITokens = {
    access: "",
    refresh: "",
};

const tokenSlice = createSlice({
    name: "tokens",
    initialState,
    reducers: {
        updateTokens: (state, action: { payload: ITokens }) => {
            state.access = action.payload.access;
            state.refresh = action.payload.refresh;
        },
    },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTokens = (state: RootState) => state.tokens;

// exports the actions
export const { updateTokens } = tokenSlice.actions;

export default tokenSlice.reducer;
