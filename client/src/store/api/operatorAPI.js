import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const operatorProfileApi = createApi({
  reducerPath: "operatorProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/operator/profile`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getOperatorProfile: builder.query({
      query: () => "/",
      refetchOnMountOrArgChange: true,
    }),
  }),
});

export const operatorForgetPasswordApi = createApi({
  reducerPath: "operatorForgetPasswordApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/operator`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    sendResetLink: builder.mutation({
      query: (username) => ({
        url: "/forgot-password",
        method: "PUT",
        body: { username },
      }),
    }),
  }),
});

export const operatorImageApi = createApi({
  reducerPath: "operatorImageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/operator`,
    credentials: "include",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }),
  endpoints: (builder) => ({
    addOperatorImage: builder.mutation({
      query: (formData) => ({
        url: "/add-operator-image",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const operatorUpdateProfileApi = createApi({
  reducerPath: "operatorUpdateProfileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/operator`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    updateOperatorProfile: builder.mutation({
      query: ({
        username,
        email,
        mobileNumber,
        address,
        idType,
        idNumber,
        profileImage,
      }) => ({
        url: "/update",
        method: "PUT",
        body: {
          username,
          email,
          mobileNumber,
          address,
          idType,
          idNumber,
          profileImage,
        },
      }),
    }),
  }),
});

export const operatorChangePasswordApi = createApi({
  reducerPath: "operatorChangePasswordApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/operator`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: ({ oldPassword, newPassword, confirmPassword }) => ({
        url: "/change-password",
        method: "PATCH",
        body: { oldPassword, newPassword, confirmPassword },
      }),
    }),
  }),
});

export const operatorLogoutApi = createApi({
  reducerPath: "operatorLogoutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/logout`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    logout: builder.mutation({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});

export const removeClubApi = createApi({
  reducerPath: "removeClubApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/admin`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    removeClub: builder.mutation({
      query: ({ clubId, password }) => ({
        url: `/delete-club/${clubId}`,
        method: "DELETE",
        body: {
          password,
        },
      }),
    }),
  }),
});

export const { useGetOperatorProfileQuery } = operatorProfileApi;
export const { useSendResetLinkMutation } = operatorForgetPasswordApi;
export const { useAddOperatorImageMutation } = operatorImageApi;
export const { useUpdateOperatorProfileMutation } = operatorUpdateProfileApi;
export const { useChangePasswordMutation } = operatorChangePasswordApi;
export const { useLogoutMutation } = operatorLogoutApi;
export const { useRemoveClubMutation } = removeClubApi;
