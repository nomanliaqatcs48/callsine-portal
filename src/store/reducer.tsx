import { combineReducers } from "redux";
import { playbookDataReducer } from "./playbooks/reducer";
import customizationReducer from "./customizationReducer";
import showDraftReducer from "./playbooks/showDraftSlice";
import { emailReplyCountReducer } from "./emailReplyCount/reducer";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  playbookData: playbookDataReducer,
  showDraft: showDraftReducer,
  emailReplyCount: emailReplyCountReducer,
});

export type AppState = ReturnType<typeof reducer>;

export const selectPlaybookData = (state: AppState) => state.playbookData.data;

export default reducer;
