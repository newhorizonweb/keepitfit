


import { configureStore } from '@reduxjs/toolkit'
import searchReducer from "./search";
import favReducer from "./favorites";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        favorites: favReducer
    },
})