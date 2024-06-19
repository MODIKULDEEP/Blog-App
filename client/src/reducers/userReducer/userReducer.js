import { createReducer } from "@reduxjs/toolkit";

const userInitailState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  message: null,
};

export const userReducer = createReducer(userInitailState, (builder) => {
  builder.addCase("LOGIN_REQUEST", (state, action) => {
    state.loading = true;
    state.user = null;
    state.isAuthenticated = false;
  });
  builder.addCase("LOGIN_SUCCESS", (state, action) => {
    state.loading = false;
    state.user = action.payload.user;
    state.isAuthenticated = action.payload.success || true;
  });
  builder.addCase("LOGIN_FAILURE", (state, action) => {
    state.loading = false;
    state.user = null;
    state.isAuthenticated = false;
    state.error = action.payload;
  });

  builder.addCase("LOAD_USER_REQUEST", (state, action) => {
    state.user = null;
    state.loading = true;
    state.isAuthenticated = false;
  });

  builder.addCase("LOAD_USER_SUCCESS", (state, action) => {
    state.user = action.payload.user;
    state.loading = false;
    state.isAuthenticated = action.payload.success || true;
  });

  builder.addCase("LOAD_USER_FAIL", (state, action) => {
    state.user = null;
    state.loading = false;
    state.isAuthenticated = false;
  });

  builder.addCase("LOGOUT_SUCCESS", (state, action) => {
    state.user = null;
    state.loading = false;
    state.isAuthenticated = false;
  });
});
