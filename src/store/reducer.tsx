import { combineReducers } from "redux";
import customizationReducer from "./customizationReducer";
import { emailReplyCountReducer } from "./emailReplyCount/reducer";
import personTrackingReducer from "./personTrackingReducer";
import { playbookDataReducer } from "./playbooks/reducer";
import showDraftReducer from "./playbooks/showDraftSlice";
import personsListReducer from "./persons/actions";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  playbookData: playbookDataReducer,
  showDraft: showDraftReducer,
  emailReplyCount: emailReplyCountReducer,
  persons: personTrackingReducer,
  personsLists: personsListReducer,
});

export type AppState = ReturnType<typeof reducer>;

export const selectPlaybookData = (state: AppState) => state.playbookData.data;

export default reducer;
