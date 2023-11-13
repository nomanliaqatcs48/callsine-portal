import { PlaybookDataActionTypes, SET_PLAYBOOK_DATA } from "./actions";

interface PlaybookDataState {
  data: any;
}

const initialState: PlaybookDataState = {
  data: [],
};

export const playbookDataReducer = (
  state = initialState,
  action: PlaybookDataActionTypes
): PlaybookDataState => {
  switch (action.type) {
    case SET_PLAYBOOK_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
