// reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Person {
  finalEmailPosition: number | null;
  lastEmailPosition: number | null;
  completedGeneration: boolean | null;
}

interface PersonsState {
  persons: Record<number, Person>;
}

const initialState: PersonsState = {
  persons: {},
};

const personsSlice = createSlice({
  name: "persons",
  initialState,
  reducers: {
    addUpdatePerson(
      state,
      action: PayloadAction<{
        personId: number;
        finalEmailPosition: number | null;
        lastEmailPosition: number | null;
        completedGeneration: boolean | null;
      }>
    ) {
      const {
        personId,
        finalEmailPosition,
        lastEmailPosition,
        completedGeneration,
      } = action.payload;
      state.persons[personId] = {
        finalEmailPosition,
        lastEmailPosition,
        completedGeneration,
      };
    },
    removePerson(state, action: PayloadAction<number>) {
      delete state.persons[action.payload];
    },
  },
});

export const selectPersonById = (state: any, personId: number) => {
  return state.persons.persons[personId];
};

export const { addUpdatePerson, removePerson } = personsSlice.actions;
export default personsSlice.reducer;
