import { FormProps, FormValues } from "./../auth/signup";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGenericResponse, IUser, IUserValues } from "./types";
import { BASE_URL, userApi } from "./userApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}user/`,
  }),
  // entityTypes: ["IUserValues"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<FormValues, Partial<FormValues>>({
      query(body) {
        return {
          url: "signup",
          method: "POST",
          body,
        };
      },
    }),

    loginUser: builder.mutation<
      { access_token: string; status: string },
      FormProps
    >({
      query(body) {
        return {
          url: "login",
          method: "POST",
          body,
          credentials: "include",
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {}
      },
    }),

    verifyEmail: builder.mutation<
      IGenericResponse,
      { verificationCode: string }
    >({
      query({ verificationCode }) {
        return {
          url: `verifyemail/${verificationCode}`,
          method: "GET",
        };
      },
    }),

    logoutUser: builder.mutation<void, void>({
      query() {
        return {
          url: "logout",
          credentials: "include",
        };
      },
    }),
  }),
});

export const {
  endpoints,
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useVerifyEmailMutation,
} = authApi;
