import { configureStore } from "@reduxjs/toolkit";
import { countriesApi } from "./api/countriesApi";

export const store = configureStore({
    reducer: {
       [countriesApi.reducerPath]: countriesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(countriesApi.middleware)
})