import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../services/auth.api";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "../constants";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
}

const loadState = (): AuthState => {
  try {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const user = localStorage.getItem(AUTH_USER_KEY);
    if (token && user) {
      return {
        token,
        isAuthenticated: true,
        user: JSON.parse(user),
      };
    }
  } catch (error) {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  }
  return {
    token: null,
    isAuthenticated: false,
    user: null,
  };
};

const initialState: AuthState = loadState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        authApi.endpoints.signIn.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token;
          state.isAuthenticated = true;
          state.user = payload.user;
          localStorage.setItem(AUTH_TOKEN_KEY, payload.token);
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(payload.user));
        }
      )
      .addMatcher(
        authApi.endpoints.signUp.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token;
          state.isAuthenticated = true;
          state.user = payload.user;
          localStorage.setItem(AUTH_TOKEN_KEY, payload.token);
          localStorage.setItem(AUTH_USER_KEY, JSON.stringify(payload.user));
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
