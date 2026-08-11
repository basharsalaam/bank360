import { RootState } from "./../../app/store";
import { ILayoutState } from "./layout.interface";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ILayoutState = {
    // Specifies if the menu is collapsed or not
    collapsedMenu: false,
};

export const layoutSlice = createSlice({
    name: "layout",
    initialState,
    reducers: {
        // Sets the collapsedMenu state to the value of the payload
        setCollapsedMenu: (state, action) => {
            state.collapsedMenu = action.payload;
        },
    },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const selectCollapsedMenu = (state: RootState) =>
    state.layout.collapsedMenu;

// exports the actions
export const { setCollapsedMenu } = layoutSlice.actions;

// exports the reducer
export default layoutSlice.reducer;
