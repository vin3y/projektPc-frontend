import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import locationReducer from "./slices/locationSlice";
import inputSuggestionsReducer from "./slices/inputSuggesionSlice";
import nearbyListingsReducer from "./slices/nearbyListing";
import detailedAdReducer from "./slices/detailedAd";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    location: locationReducer,
    nearbyListings: nearbyListingsReducer,
    inputSuggestions: inputSuggestionsReducer,
    detailedAdDetails: detailedAdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
