import { configureStore } from "@reduxjs/toolkit";

import citiesReducer from "../features/cities/cities-slice";

import { apiSlice } from '../features/cities/cities-api-slice';

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
