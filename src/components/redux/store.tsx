


import { configureStore } from '@reduxjs/toolkit'
import searchReducer from "./search";
import favReducer from "./favorites";
import userDataReducer from "./userData";
import apiDataReducer from "./apiData";
import claimsReducer from "./claims";
import claimsPdfPrint from "./pdfPrint";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        favorites: favReducer,
        userData: userDataReducer,
        apiData: apiDataReducer,
        claims: claimsReducer,
        pdfPrint: claimsPdfPrint
    },
})