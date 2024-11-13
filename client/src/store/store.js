import { configureStore } from "@reduxjs/toolkit";
import {
  operatorForgetPasswordApi,
  operatorProfileApi,
  operatorImageApi,
  operatorUpdateProfileApi,
  operatorChangePasswordApi,
  operatorLogoutApi,
  removeClubApi,
} from "./api/operatorAPI";

import {
  changeAdminOperatorPasswordApi,
  allProfileApi,
  clubProfileApi,
  clubTemporaryLogin,
  changeAdminPasswordApi,
} from "./api/clubAPI";

import {
  addMemberApi,
  addMemberImageApi,
  getAllMembersApi,
  getMemberByIdApi,
  updateMemberApi,
  deleteMemberApi,
  gettotalAmountApi,
} from "./api/memberAPI";

import {
  getWalletApi,
  addTransactionApi,
  fetchTransactionsApi,
  updateTransactionApi,
  updateCouponExpiresApi,
  getAllTransactionsApi,
} from "./api/walletAPI";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [clubProfileApi.reducerPath]: clubProfileApi.reducer,
    [clubTemporaryLogin.reducerPath]: clubTemporaryLogin.reducer,
    [changeAdminPasswordApi.reducerPath]: changeAdminPasswordApi.reducer,
    [operatorProfileApi.reducerPath]: operatorProfileApi.reducer,
    [allProfileApi.reducerPath]: allProfileApi.reducer,
    [operatorForgetPasswordApi.reducerPath]: operatorForgetPasswordApi.reducer,
    [operatorUpdateProfileApi.reducerPath]: operatorUpdateProfileApi.reducer,
    [operatorImageApi.reducerPath]: operatorImageApi.reducer,
    [operatorChangePasswordApi.reducerPath]: operatorChangePasswordApi.reducer,
    [operatorLogoutApi.reducerPath]: operatorLogoutApi.reducer,
    [addMemberApi.reducerPath]: addMemberApi.reducer,
    [addMemberImageApi.reducerPath]: addMemberImageApi.reducer,
    [getAllMembersApi.reducerPath]: getAllMembersApi.reducer,
    [getMemberByIdApi.reducerPath]: getMemberByIdApi.reducer,
    [updateMemberApi.reducerPath]: updateMemberApi.reducer,
    [deleteMemberApi.reducerPath]: deleteMemberApi.reducer,
    [changeAdminOperatorPasswordApi.reducerPath]:
      changeAdminOperatorPasswordApi.reducer,
    [getWalletApi.reducerPath]: getWalletApi.reducer,
    [addTransactionApi.reducerPath]: addTransactionApi.reducer,
    [fetchTransactionsApi.reducerPath]: fetchTransactionsApi.reducer,
    [updateTransactionApi.reducerPath]: updateTransactionApi.reducer,
    [updateCouponExpiresApi.reducerPath]: updateCouponExpiresApi.reducer,
    [getAllTransactionsApi.reducerPath]: getAllTransactionsApi.reducer,
    [gettotalAmountApi.reducerPath]: gettotalAmountApi.reducer,
    [removeClubApi]: removeClubApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(clubProfileApi.middleware)
      .concat(clubTemporaryLogin.middleware)
      .concat(changeAdminPasswordApi.middleware)
      .concat(operatorProfileApi.middleware)
      .concat(allProfileApi.middleware)
      .concat(operatorForgetPasswordApi.middleware)
      .concat(operatorImageApi.middleware)
      .concat(operatorUpdateProfileApi.middleware)
      .concat(operatorChangePasswordApi.middleware)
      .concat(operatorLogoutApi.middleware)
      .concat(addMemberApi.middleware)
      .concat(addMemberImageApi.middleware)
      .concat(getAllMembersApi.middleware)
      .concat(getMemberByIdApi.middleware)
      .concat(updateMemberApi.middleware)
      .concat(deleteMemberApi.middleware)
      .concat(changeAdminOperatorPasswordApi.middleware)
      .concat(getWalletApi.middleware)
      .concat(addTransactionApi.middleware)
      .concat(fetchTransactionsApi.middleware)
      .concat(updateTransactionApi.middleware)
      .concat(updateCouponExpiresApi.middleware)
      .concat(getAllTransactionsApi.middleware)
      .concat(gettotalAmountApi.middleware)
      .concat(removeClubApi.middleware),
});

setupListeners(store.dispatch);
