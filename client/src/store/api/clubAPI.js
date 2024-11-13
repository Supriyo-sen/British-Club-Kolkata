import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const clubProfileApi = createApi({
  reducerPath: "clubProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/admin/profile`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getClubProfile: builder.query({
      query: () => "/",
    }),
  }),
});

export const clubTemporaryLogin = createApi({
  reducerPath: `clubTemporaryLogin`,
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/club`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    temporaryLogin: builder.mutation({
      query: ({ username, password }) => {
        return {
          url: "/temporary-login",
          method: "POST",
          body: {
            password,
            username,
          },
        };
      },
    }),
  }),
});

export const changeAdminOperatorPasswordApi = createApi({
  reducerPath: "changeAdminOperatorPasswordApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/admin`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    changeAdminOperatorPassword: builder.mutation({
      query: ({ id, newPassword, confirmPassword }) => {
        return {
          url: `/change-password-all/${id}`,
          method: "PATCH",
          body: {
            id,
            newPassword,
            confirmPassword,
          },
        };
      },
    }),
  }),
});

export const allProfileApi = createApi({
  reducerPath: "allProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/admin/get-all-users`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllProfile: builder.query({
      query: () => "/",
    }),
  }),
});

export const changeAdminPasswordApi = createApi({
  reducerPath: "changeAdminPasswordApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/admin`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    changeAdminPassword: builder.mutation({
      query: ({ oldPassword, newPassword, confirmPassword }) => {
        return {
          url: "/change-password",
          method: "PATCH",
          body: {
            oldPassword,
            newPassword,
            confirmPassword,
          },
        };
      },
    }),
  }),
});

export const { useGetClubProfileQuery } = clubProfileApi;
export const { useTemporaryLoginMutation } = clubTemporaryLogin;
export const { useChangeAdminOperatorPasswordMutation } =
  changeAdminOperatorPasswordApi;
export const { useGetAllProfileQuery } = allProfileApi;
export const { useChangeAdminPasswordMutation } = changeAdminPasswordApi;
