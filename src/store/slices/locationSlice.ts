import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface LocationSliceData {
  latitude: number | null;
  longitude: number | null;
}

const initialState: LocationSliceData = {
  latitude: null,
  longitude: null,
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
