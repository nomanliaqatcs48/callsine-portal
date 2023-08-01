import { combineReducers } from "redux";
import { playbookDataReducer } from "./playbooks/reducer";
import customizationReducer from "./customizationReducer";

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  playbookData: playbookDataReducer,
});

export type AppState = ReturnType<typeof reducer>;

export const selectPlaybookData = (state: AppState) => state.playbookData.data;

export default reducer;
