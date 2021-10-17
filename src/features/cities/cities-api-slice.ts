import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { WEATHER_API_UNITS } from "../../constants";
import { TempApiResponse } from "../../models/interfaces";

const addAppId = () => `&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/2.5",
  }),
  keepUnusedDataFor: 10,
  endpoints(builder) {
    return {
      fetchTempearature: builder.query<TempApiResponse, string>({
        query(city) {
          return `/find?q=${city}&units=${WEATHER_API_UNITS}${addAppId()}`;
        },
      }),
    };
  },
});

export const { useFetchTempearatureQuery } = apiSlice;
