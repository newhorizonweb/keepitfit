


import { configureStore } from '@reduxjs/toolkit'
import searchReducer from "./search";
import favReducer from "./favorites";
import userDataReducer from "./userData";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        favorites: favReducer,
        userData: userDataReducer
    },
})