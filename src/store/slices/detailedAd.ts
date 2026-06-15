import type { DetailedAd } from "@/lib/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface DetailedAdState {
  adDetails: DetailedAd | null;
}

const initialState: DetailedAdState = {
  adDetails: null,
};

const detailedAdSlice = createSlice({
  name: "getDetailedAd",
  initialState,
  reducers: {
    setDetailedAdListings: (state, action: PayloadAction<DetailedAd>) => {
      state.adDetails = action.payload;
    },
  },
});

export const { setDetailedAdListings } = detailedAdSlice.actions;
export default detailedAdSlice.reducer;
