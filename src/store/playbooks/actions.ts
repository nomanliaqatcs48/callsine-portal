export const SET_PLAYBOOK_DATA = "SET_PLAYBOOK_DATA";

interface SetPlaybookDataAction {
  type: typeof SET_PLAYBOOK_DATA;
  payload: any;
}

export const setPlaybookData = (data: any): SetPlaybookDataAction => {
  return {
    type: SET_PLAYBOOK_DATA,
    payload: data,
  };
};

export type PlaybookDataActionTypes = SetPlaybookDataAction;
