import { RootState } from "../../app/store";
import { createSlice } from "@reduxjs/toolkit";
import { IUserData } from "./userData.interface";
const initialState: IUserData = {
    uuid: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_no: "",
    org_name: "",
    avatar: null,
};

const userDataSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        updateUserData: (state, action: { payload: IUserData }) => {
            state.uuid = action.payload.uuid;
            state.email = action.payload.email;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.phone_no = action.payload.phone_no;
            state.org_name = action.payload.org_name;
            state.avatar = action.payload.avatar;
        },
    },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserData = (state: RootState) => state.userData;

// exports the actions
export const { updateUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
