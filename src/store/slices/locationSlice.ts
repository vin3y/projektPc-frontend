import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LocationSliceData {
  latitude: number;
  longitude: number;
}

const initialState: LocationSliceData = {
  latitude: 28.6139,
  longitude: 77.2088,
};

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (
      state,
      action: PayloadAction<{
        latitude: number;
        longitude: number;
      }>,
    ) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});

export const { setLocation } = locationSlice.actions;
export default locationSlice.reducer;
