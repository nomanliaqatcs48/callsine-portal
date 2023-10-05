import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShowDraftState {
  value: boolean;
}

const initialState: ShowDraftState = {
  value: false,
};

export const showDraftSlice = createSlice({
  name: "showDraft",
  initialState,
  reducers: {
    setShowDraft: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setShowDraft } = showDraftSlice.actions;

export default showDraftSlice.reducer;
