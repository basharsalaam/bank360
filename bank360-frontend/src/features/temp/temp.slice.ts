import { RootState } from "./../../app/store";
import { createSlice } from "@reduxjs/toolkit";
import { ITempAuthState } from "./temp.interface";
// temporary authentication request data stored in state
// waiting for otp to be passed

const initialState: ITempAuthState = {
    email: "",
    first_name: "",
    last_name: "",
    org_name: "",
    phone_no: "",
    password: "",
};

export const tempAuthSlice = createSlice({
    name: "tempAuth",
    initialState,
    reducers: {
        // add authentication request data to state
        setTempAuth: (state, action: { payload: ITempAuthState }) => {
            state.email = action.payload.email;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.org_name = action.payload.org_name;
            state.phone_no = action.payload.phone_no;
            state.password = action.payload.password;
        },

        // clear authentication request data from state
        clearTempAuth: (state) => {
            state.email = "";
            state.first_name = "";
            state.last_name = "";
            state.org_name = "";
            state.phone_no = "";
            state.password = "";
        },
    },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTempAuth = (state: RootState) => state.tempAuth;

// exports the actions
export const { setTempAuth, clearTempAuth } = tempAuthSlice.actions;

// exports the reducer
export default tempAuthSlice.reducer;
