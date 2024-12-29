import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../../app/store";
import { AuthResponse, SignInRequest, SignUpRequest } from "../types";
import { AUTH_ENDPOINTS } from "../constants";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation<AuthResponse, SignInRequest>({
      query: (credentials) => ({
        url: AUTH_ENDPOINTS.SIGN_IN,
        method: "POST",
        body: credentials,
      }),
    }),
    signUp: builder.mutation<AuthResponse, SignUpRequest>({
      query: (userData) => ({
        url: AUTH_ENDPOINTS.SIGN_UP,
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
