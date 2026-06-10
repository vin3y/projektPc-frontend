import type { Listing } from "@/services/listings/listing";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface NearbyListingState {
  results: Listing[];
}

const initialState: NearbyListingState = {
  results: [],
};

const nearbyListingsSlice = createSlice({
  name: "nearbyListings",
  initialState,
  reducers: {
    setNearbyListings: (state, action: PayloadAction<Listing[]>) => {
      state.results = action.payload;
    },
  },
});

export const { setNearbyListings } = nearbyListingsSlice.actions;
export default nearbyListingsSlice.reducer;
