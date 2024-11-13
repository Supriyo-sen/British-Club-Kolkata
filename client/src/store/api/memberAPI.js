import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addMemberApi = createApi({
  reducerPath: "addMemberApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/member`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    addMember: builder.mutation({
      query: ({
        firstName,
        lastname,
        name,
        email,
        mobileNumber,
        address,
        expiryDate,
        bloodGroup,
        organization,
        timeStamp,
        idType,
        idNumber,
        url,
        public_id,
      }) => ({
        url: "/add-member",
        method: "POST",
        body: {
          firstName,
          lastname,
          name,
          mobileNumber,
          address,
          expiryDate,
          bloodGroup,
          organization,
          timeStamp,
          idType,
          email,
          idNumber,
          url,
          public_id,
        },
      }),
    }),
  }),
});

export const addMemberImageApi = createApi({
  reducerPath: "addMemberImageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/member`,
    credentials: "include",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }),
  endpoints: (builder) => ({
    addMemberImage: builder.mutation({
      query: ({ file }) => ({
        url: `/add-member-image`,
        method: "POST",
        body: { file },
      }),
    }),
  }),
});

export const deleteMemberApi = createApi({
  reducerPath: "deleteMemberApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/member`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    deleteMember: builder.mutation({
      query: (memberId) => ({
        url: `/delete-member/${memberId}`,
        method: "DELETE",
        body: { memberId },
      }),
    }),
  }),
});

export const updateMemberApi = createApi({
  reducerPath: "updateMemberApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/member`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    updateMember: builder.mutation({
      query: ({
        memberId,
        mobileNumber,
        bloodGroup,
        organization,
        address,
        email,
        expiryDate,
        timeStamp,
        idNumber,
        idType,
        username,
        firstName,
        lastname,
      }) => {
        return {
          url: `/update-member/${memberId}`,
          method: "PUT",
          body: {
            memberId,
            mobileNumber,
            bloodGroup,
            organization,
            address,
            email,
            expiryDate,
            timeStamp,
            idNumber,
            idType,
            username,
            firstName,
            lastname,
          },
        };
      },
    }),
  }),
});

export const getAllMembersApi = createApi({
  reducerPath: "getAllMembersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/member`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getAllMembers: builder.query({
      query: ({ page = 1, limit = 10, search = "" }) =>
        `/get-all-members?page=${page}&limit=${limit}&search=${search}`,
    }),
  }),
});

export const getMemberByIdApi = createApi({
  reducerPath: "getMemberByIdApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/member`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getMemberById: builder.query({
      query: ({ memberId }) => `/get-member/${memberId}`,
    }),
  }),
});

export const gettotalAmountApi = createApi({
  reducerPath: "gettotalAmountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/v1/member`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    gettotalAmount: builder.query({
      query: () => `/get/total/amount`,
    }),
  }),
});

export const { useAddMemberMutation } = addMemberApi;
export const { useDeleteMemberMutation } = deleteMemberApi;
export const { useUpdateMemberMutation } = updateMemberApi;
export const { useGetAllMembersQuery } = getAllMembersApi;
export const { useAddMemberImageMutation } = addMemberImageApi;
export const { useGetMemberByIdQuery } = getMemberByIdApi;
export const { useGettotalAmountQuery } = gettotalAmountApi;
