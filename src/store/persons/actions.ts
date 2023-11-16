import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PersonTypes } from "src/types/person";

export interface PersonState {
  personsList: PersonTypes[];
}

const initialState: PersonState = {
  personsList: [],
};

export const setPersonList = (personList: PersonTypes[]) => ({
  type: "personsList/setPersonsList",
  payload: personList,
});

const personSlice = createSlice({
  name: "personsList",
  initialState,
  reducers: {
    setPersonsList: (state, action: PayloadAction<PersonTypes[]>) => {
      state.personsList = action.payload;
    },
    addPerson: (state, action: PayloadAction<PersonTypes>) => {
      state.personsList.push(action.payload);
    },
    deletePerson: (state, action: PayloadAction<string | number>) => {
      state.personsList = state.personsList.filter(
        (person) => person.id !== action.payload
      );
    },
  },
});

export const { addPerson, deletePerson } = personSlice.actions;
export default personSlice.reducer;
