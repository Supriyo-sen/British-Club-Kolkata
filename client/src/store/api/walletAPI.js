import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getWalletApi = createApi({
  reducerPath: "getWalletAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/wallet`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getWallet: builder.query({
      query: (memberId) => `/get/${memberId}`,
    }),
  }),
});

export const addTransactionApi = createApi({
  reducerPath: "addTransactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/wallet`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    addTransaction: builder.mutation({
      query: ({ memberId, type, payableAmount, couponAmount, mode }) => {
        return {
          url: "/addTransaction",
          method: "POST",
          body: { memberId, type, payableAmount, couponAmount, mode },
        };
      },
    }),
  }),
});

export const fetchTransactionsApi = createApi({
         reducerPath: "fetchTransactionsApi",
         baseQuery: fetchBaseQuery({
           baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/wallet`,
           credentials: "include",
         }),
         endpoints: (builder) => ({
           fetchTransactions: builder.query({
             query: ({search}) => `/fetchTransactions?search=${search}`,
           }),
         }),
});

export const getAllTransactionsApi = createApi({
  reducerPath: "getAllTransactionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/wallet`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllTransactions: builder.query({
      query: ({ startDate = "", endDate = "", search = "" }) =>
        `/get-transactions?startDate=${startDate}&endDate=${endDate}&search=${search}`,
    }),
  }),
});

export const updateTransactionApi = createApi({
  reducerPath: "updateTransactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/wallet`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    updateTransaction: builder.mutation({
      query: ({ transactionId, type, payableAmount, couponAmount }) => {
        return {
          url: `/update-transaction/${transactionId}`,
          method: "PUT",
          body: { type, payableAmount, couponAmount },
        };
      },
    }),
  }),
});

export const updateCouponExpiresApi = createApi({
  reducerPath: "updateCouponExpiresApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/wallet`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    updateCouponExpires: builder.mutation({
      query: ({ couponId, expiresAt }) => {
        return {
          url: `/update-coupon/${couponId}`,
          method: "PUT",
          body: { expiresAt, couponId },
        };
      },
    }),
  }),
});

export const { useGetWalletQuery } = getWalletApi;
export const { useAddTransactionMutation } = addTransactionApi;
export const { useFetchTransactionsQuery } = fetchTransactionsApi;
export const { useUpdateTransactionMutation } = updateTransactionApi;
export const { useUpdateCouponExpiresMutation } = updateCouponExpiresApi;
export const { useGetAllTransactionsQuery } = getAllTransactionsApi;
