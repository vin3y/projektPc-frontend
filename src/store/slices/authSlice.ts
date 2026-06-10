import type { AuthState } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

interface AuthSliceState {
  status: AuthState;
}

const initialState: AuthSliceState = {
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.status = "loading";
    },
    setAuthenticated: (state) => {
      state.status = "authenticated";
    },
    setUnauthenticated: (state) => {
      state.status = "unauthenticated";
    },
  },
});

export const { setLoading, setAuthenticated, setUnauthenticated } =
  authSlice.actions;

export default authSlice.reducer;
