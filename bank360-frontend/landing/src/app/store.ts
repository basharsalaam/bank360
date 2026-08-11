import { cashflowApi } from "./../features/services/index";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import layoutReducer from "../features/layout/layout.slice";
import tempAuthReducer from "../features/temp/temp.slice";
import { setupListeners } from "@reduxjs/toolkit/query"; // Corrected import
import tokensReducer from "./../features/tokens/tokens.slice";
import userDataReducer from "./../features/userData/userData.slice";
import finDataReducer from "./../features/finData/finData.slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    layout: layoutReducer,
    tempAuth: tempAuthReducer,
    tokens: tokensReducer,
    userData: userDataReducer,
    finData: finDataReducer,
    [cashflowApi.reducerPath]: cashflowApi.reducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cashflowApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
