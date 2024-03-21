


import { configureStore } from '@reduxjs/toolkit'
import searchReducer from "./search";
import favReducer from "./favorites";
import userDataReducer from "./userData";
import userLangReducer from "./language";
import apiDataReducer from "./apiData";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        favorites: favReducer,
        userData: userDataReducer,
        userLang: userLangReducer,
        apiData: apiDataReducer
    },
})