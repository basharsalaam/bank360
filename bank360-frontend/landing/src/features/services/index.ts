import { ICreditScore } from "./../../pages/Analytics/Analytics.interface";
import { getCookie, setCookie } from "./../../utils/cookies";
import { IUserData, IUserDataOpt } from "./../userData/userData.interface";
import { ITokens } from "./../tokens/tokens.interface";
import {
  IAccount,
  ICategoryInfo,
  IComparedTransactionResponse,
  IPaginatedAccountResponse,
  IPostUser,
  ITransaction,
} from "./services.interface";
import { API_URL } from "./../../utils/constants/index";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IBank, ICurrency } from "../finData/finData.interface";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { updateTokens } from "../tokens/tokens.slice";
import { AppDispatch } from "../../app/store";
import toast from "react-hot-toast";

const baseQuery = fetchBaseQuery({ baseUrl: API_URL });
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // if (result?.meta?.request.url === `${API_URL}token/`) {
  //   return result;
  // }
  if (result.error && result.error.status === 401) {
    const refreshToken: string = getCookie("cfrt") as string;
    if (!refreshToken) {
      window.location.href = "/signin";
      toast.error("Your session has expired. Please sign in again");
    }

    var formdata = new FormData();
    formdata.append("refresh", refreshToken as string);

    var requestOptions: RequestInit = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${API_URL}token/refresh/`, requestOptions);
      const res = await response.json();
      await (api.dispatch as AppDispatch)(
        updateTokens({
          access: res?.access,
          refresh: res?.refresh as string,
        })
      );
      setCookie("cfat", res?.access);
      setCookie("cfrt", res?.refresh);
      result = await baseQuery(
        {
          ...(args as any),
          headers: {
            Authorization: `Bearer ${res?.access}`,
          },
        },
        api,
        extraOptions
      );
    } catch (err) {
      window.location.href = "/signin";
      toast.error("Your session has expired. Please sign in again");
      console.log(err);
    }
  }
  return result;
};

// Define a service using a base URL and expected endpoints
export const cashflowApi = createApi({
  reducerPath: "cashflowApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // !-----------------------------------------------------------------------USER BASED REQUEST
    requestOtp: builder.mutation<any, { email: string }>({
      query(email) {
        return {
          url: `time_pass/`,
          method: "POST",
          body: {
            email: email.email,
          },
        };
      },
    }),
    registerUser: builder.mutation<any, IPostUser>({
      query(data) {
        return {
          url: `user/`,
          method: "POST",
          body: data,
        };
      },
    }),
    loginUser: builder.mutation<ITokens, IPostUser>({
      query(data) {
        return {
          url: `token/`,
          method: "POST",
          body: data,
        };
      },
    }),
    resetPassword: builder.mutation<
      { message: string; details: IUserData },
      { email: string; password: string; time_pass: string }
    >({
      query(data) {
        return {
          url: `user/reset/`,
          method: "POST",
          body: data,
        };
      },
    }),
    getAccessTokenFromRefreshToken: builder.mutation<ITokens, string>({
      query(refreshToken) {
        return {
          url: `token/refresh/`,
          method: "POST",
          body: { refresh: refreshToken },
        };
      },
    }),
    // get user
    getUserData: builder.query<IUserData, { accessToken: string }>({
      query: ({ accessToken }) => ({
        url: `user/`,
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    }),
    // get user
    getUserDataMut: builder.mutation<IUserData, { accessToken: string }>({
      query: ({ accessToken }) => ({
        url: `user/`,
        headers: { Authorization: `Bearer ${accessToken}` },
        method: "GET",
      }),
    }),

    // update user
    updateUserData: builder.mutation<
      IUserData,
      { accessToken: string; userId: string; body: IUserDataOpt }
    >({
      query: ({ accessToken, userId, body }) => ({
        url: `user/${userId}/`,
        headers: { Authorization: `Bearer ${accessToken}` },
        body,
        method: "PATCH",
      }),
    }),
    // update image
    updateProfileImage: builder.mutation<
      any,
      { accessToken: string; userId: string; body: any }
    >({
      query: ({ accessToken, userId, body }) => ({
        url: `user/${userId}/`,
        headers: { Authorization: `Bearer ${accessToken}` },
        body,
        method: "PATCH",
      }),
    }),

    // !-----------------------------------------------------------------------FINANCIAL BASED REQUEST

    // get currency list for a user
    getCurrencyList: builder.query<
      { data: ICurrency[] },
      { accessToken: string }
    >({
      query: ({ accessToken }) => ({
        url: `currency_account/accounts/`,
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    }),
    // get bank list for a user
    getBankList: builder.query<{ data: IBank[] }, { accessToken: string }>({
      query: ({ accessToken }) => ({
        url: `bank_account/accounts/
`,
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    }),
    // get bank list for a user
    getBankList2: builder.mutation<{ data: IBank[] }, { accessToken: string }>({
      query: ({ accessToken }) => ({
        url: `bank_account/accounts/
`,
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    }),

    // get number of banks
    getNumberOfBanks: builder.query<{ data: number }, { accessToken: string }>({
      query: ({ accessToken }) => ({
        url: `number_account/accounts/`,
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    }),

    // Get total balance filtered by bank name and currency
    getTotalBalance: builder.mutation<
      { data: number },
      {
        accessToken: string;
        params: {
          currency: string;
          bank_name: string;
        };
      }
    >({
      query: ({ accessToken, params: { currency, bank_name } }) => ({
        url: `balance_account/accounts/?currency=${currency}${
          bank_name ? "&bank_name=" + bank_name : ""
        }`,
        headers: { Authorization: `Bearer ${accessToken}` },
        method: "GET",
      }),
    }),

    // Get a list of accounts for a user
    getListOfAccounts: builder.mutation<
      IPaginatedAccountResponse,
      {
        accessToken: string;
        params: {
          currency?: string;
          bank_name?: string;
          page_size?: number;
          page?: number;
          paginate?: boolean;
        };
      }
    >({
      query: ({
        accessToken,
        params: { currency, bank_name, page_size, page, paginate },
      }) => ({
        url: `list_account/accounts/?currency=${currency}${
          bank_name ? "&bank_name=" + bank_name : ""
        }${page_size ? "&page_size=" + page_size : ""}${
          page ? "&page=" + page : ""
        }${paginate ? "&paginate=" + paginate : "&paginate=false"}`,
        headers: { Authorization: `Bearer ${accessToken}` },
        method: "GET",
      }),
    }),

    // add a new bank account
    addNewBankAccount: builder.mutation<
      IAccount,
      {
        accessToken: string;
        code: string;
      }
    >({
      query: ({ accessToken, code }) => ({
        url: `new/accounts/`,
        headers: { Authorization: `Bearer ${accessToken}` },
        body: {
          code,
        },
        method: "POST",
      }),
    }),

    // disconnect a bank account
    disconnectBankAccount: builder.mutation<
      any,
      {
        accessToken: string;
        id: string;
      }
    >({
      query: ({ accessToken, id }) => ({
        url: `account/${id}`,
        headers: { Authorization: `Bearer ${accessToken}` },
        method: "DELETE",
      }),
    }),

    // delete a user
    deleteUser: builder.mutation<
      any,
      {
        accessToken: string;
        id: string;
      }
    >({
      query: ({ accessToken, id }) => ({
        url: `user/${id}`,
        headers: { Authorization: `Bearer ${accessToken}` },
        method: "DELETE",
      }),
    }),

    // Get a list of compared transactions for a user
    getTransactionsCompared: builder.mutation<
      IComparedTransactionResponse[],
      {
        accessToken: string;
        params: {
          account_id?: string;
          date?: string;
          duration?: number;
          size?: number;
          currency: string;
          bank_name?: string;
          account_no?: string;
        };
      }
    >({
      query: ({
        accessToken,
        params: {
          currency,
          date,
          duration,
          size,
          account_id,
          bank_name,
          account_no,
        },
      }) => ({
        url: `compare/transactions/?currency=${currency}${
          bank_name ? "&bank_name=" + bank_name : ""
        }${account_id ? "&account_id=" + account_id : ""}${
          account_no ? "&account_no=" + account_no : ""
        }${date ? "&date=" + date : ""}${
          duration ? "&duration=" + duration : ""
        }${size ? "&size=" + size : ""}`,

        headers: { Authorization: `Bearer ${accessToken}` },
        method: "GET",
      }),
    }),

    // Get a list of transactions for a user
    getTransactionsList: builder.mutation<
      any,
      {
        accessToken: string;
        params: {
          date?: string;
          duration?: number;
          size?: number;
          currency: string;
          bank_name?: string;
          page_size?: number;
          page?: number;
          paginate?: boolean | string;
          search?: string;
          categories?: string;
          account_no?: string;
          account_id?: string;
        };
      }
    >({
      query: ({
        accessToken,
        params: {
          currency,
          date,
          duration,
          size,
          bank_name,
          page_size,
          paginate,
          page,
          search,
          categories,
          account_no,
          account_id,
        },
      }) => ({
        url: `list_transaction/transactions/?currency=${currency}${
          bank_name ? "&bank_name=" + bank_name : ""
        }${date ? "&date=" + date : ""}${
          duration ? "&duration=" + duration : ""
        }${size ? "&size=" + size : ""}${
          page_size ? "&page_size=" + page_size : ""
        }${page ? "&page=" + page : ""}${
          paginate ? "&paginate=" + paginate : ""
        }${search ? "&search=" + search : ""}${
          categories ? "&categories=" + categories : ""
        }${account_no ? "&account_no=" + account_no : ""}${
          account_id ? "&account_id=" + account_id : ""
        }`,

        headers: { Authorization: `Bearer ${accessToken}` },
        method: "GET",
      }),
    }),

    // Get a list of transactions for a user
    getTransactionsAmountList: builder.mutation<
      {
        count: string;
        next: string;
        results: ITransaction[];
        previous: string;
      },
      {
        accessToken: string;
        params: {
          date?: string;
          duration?: number;
          size?: number;
          currency: string;
          bank_name?: string;
          page_size?: number;
          page?: number;
          paginate?: boolean;
          search?: string;
          categories?: string;
          tran_type?: string;
        };
      }
    >({
      query: ({
        accessToken,
        params: {
          currency,
          date,
          duration,
          size,
          bank_name,
          page_size,
          paginate,
          page,
          search,
          categories,
          tran_type,
        },
      }) => ({
        url: `list_transaction_amount/transactions/?currency=${currency}${
          bank_name ? "&bank_name=" + bank_name : ""
        }${date ? "&date=" + date : ""}${
          duration ? "&duration=" + duration : ""
        }${size ? "&size=" + size : ""}${
          page_size ? "&page_size=" + page_size : ""
        }${page ? "&page=" + page : ""}${
          paginate ? "&paginate=" + paginate : ""
        }${search ? "&search=" + search : ""}${
          categories ? "&categories=" + categories : ""
        }${tran_type ? "&tran_type=" + tran_type : ""}`,

        headers: { Authorization: `Bearer ${accessToken}` },
        method: "GET",
      }),
    }),

    // Get a list of channels for a user
    getChannelList: builder.mutation<
      {
        data: string[];
      },
      {
        accessToken: string;
      }
    >({
      query: ({ accessToken }) => ({
        url: `channel_transaction/transactions/`,

        headers: { Authorization: `Bearer ${accessToken}` },
        method: "GET",
      }),
    }),

    // Update category of a transaction
    updateCategory: builder.mutation<
      ITransaction,
      {
        accessToken: string;
        transactionId: string;
        newCategoryId: string;
      }
    >({
      query: ({ accessToken, transactionId, newCategoryId }) => ({
        url: `transaction/${transactionId}/`,
        headers: { Authorization: `Bearer ${accessToken}` },
        method: "PATCH",
        body: {
          category: newCategoryId,
        },
      }),
    }),

    // Get a list of compared transactions for a user
    getCategoryGraph: builder.mutation<
      any,
      {
        accessToken: string;
        params: {
          date?: string;
          duration?: number;
          size?: number;
          currency: string;
          tran_type?: "true" | "false";
          channels?: string;
        };
      }
    >({
      query: ({
        accessToken,
        params: { currency, date, duration, size, tran_type, channels },
      }) => ({
        url: `category_graph/transactions/?currency=${currency}${
          date ? "&date=" + date : ""
        }${duration ? "&duration=" + duration : ""}${
          size ? "&size=" + size : ""
        }${tran_type ? "&tran_type=" + tran_type : ""}${
          channels ? "&channels=" + channels : ""
        }`,

        headers: { Authorization: `Bearer ${accessToken}` },
        method: "GET",
      }),
    }),

    // ! categories

    // Get a list of categories for a user
    getCategoryList: builder.mutation<
      ICategoryInfo[],
      {
        accessToken: string;
      }
    >({
      query: ({ accessToken }) => ({
        url: `category/`,

        headers: { Authorization: `Bearer ${accessToken}` },
        method: "GET",
      }),
    }),

    // Get credit scoere
    getCreditScore: builder.query<
      {
        count: number;
        next?: string;
        previous?: string;
        results: ICreditScore[];
      },
      { accessToken: string; page_size: string; page: string }
    >({
      query: ({ accessToken, page_size, page }) => ({
        url: `credit/score/?${page_size ? "page_size=" + page_size : ""}${
          page ? "&page=" + page : ""
        }`,
        headers: { Authorization: `Bearer ${accessToken}` },
      }),
    }),

    // Create new category
    createCategory: builder.mutation<
      ICategoryInfo,
      {
        accessToken: string;
        category: string;
        method: "POST" | "PATCH" | "DELETE";
        id?: string;
      }
    >({
      query({ category, accessToken, id, method }) {
        return {
          url: `category/${id ? id + "/" : ""}`,
          method,
          body: {
            category,
          },
          headers: { Authorization: `Bearer ${accessToken}` },
        };
      },
    }),

    refreshAccounts: builder.mutation<any, any>({
      query: ({ accessToken, accountId }) => ({
        url: `refresh/accounts/`,
        body: {
          code: accountId,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
        method: "POST",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const {
  useRequestOtpMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetAccessTokenFromRefreshTokenMutation,
  useGetUserDataQuery,
  useResetPasswordMutation,
  useGetUserDataMutMutation,
  useUpdateProfileImageMutation,

  // Financial data queries
  useGetCurrencyListQuery,
  useGetBankListQuery,
  useGetBankList2Mutation,
  useGetTotalBalanceMutation,
  useGetNumberOfBanksQuery,
  useGetListOfAccountsMutation,
  useAddNewBankAccountMutation,
  useDisconnectBankAccountMutation,
  useGetTransactionsComparedMutation,
  useGetTransactionsListMutation,
  useGetCategoryListMutation,
  useUpdateCategoryMutation,

  useGetCategoryGraphMutation,
  useGetChannelListMutation,
  useGetTransactionsAmountListMutation,
  useUpdateUserDataMutation,

  // categories
  useCreateCategoryMutation,

  // credit score
  useGetCreditScoreQuery,
  useDeleteUserMutation,
  useRefreshAccountsMutation,
} = cashflowApi;
