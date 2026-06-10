import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InputSuggestionState {
  suggestions: string[];
}

const initialState: InputSuggestionState = {
  suggestions: [],
};

const inputSuggestionsSlice = createSlice({
  name: "inputSuggestions",
  initialState,
  reducers: {
    setInputSuggestions: (state, action: PayloadAction<string[]>) => {
      state.suggestions = action.payload;
    },
  },
});
export const { setInputSuggestions } = inputSuggestionsSlice.actions;
export default inputSuggestionsSlice.reducer;
