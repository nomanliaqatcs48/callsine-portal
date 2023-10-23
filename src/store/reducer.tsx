import { combineReducers } from "redux";
import customizationReducer from "./customizationReducer";
import { emailReplyCountReducer } from "./emailReplyCount/reducer";
import personTrackingReducer from "./personTrackingReducer";
import { playbookDataReducer } from "./playbooks/reducer";
import showDraftReducer from "./playbooks/showDraftSlice";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  playbookData: playbookDataReducer,
  showDraft: showDraftReducer,
  emailReplyCount: emailReplyCountReducer,
  persons: personTrackingReducer,
});

export type AppState = ReturnType<typeof reducer>;

export const selectPlaybookData = (state: AppState) => state.playbookData.data;

export default reducer;
