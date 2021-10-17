import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { selectRandomCities } from "../../helpers/citiesHelper";
import { Guess, Result } from "../../models/interfaces";

interface CitiesState {
  index: number;
  guesses: Guess[];
  results: Result[];
  cities: string[];
}

const initialState: CitiesState = {
  index: 0,
  guesses: [],
  results: [],
  cities: selectRandomCities(),
};

const citySlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    resetGame() {
      return {
        ...initialState,
        cities: selectRandomCities(),
      };
    },
    addGuess(state, action: PayloadAction<Guess>) {
      state.index++;
      state.guesses.push(action.payload);
    },
    addResult(state, action: PayloadAction<Result>) {
      state.results.push(action.payload)
    }
  },
});

export const { resetGame, addGuess, addResult } = citySlice.actions;
export default citySlice.reducer;
