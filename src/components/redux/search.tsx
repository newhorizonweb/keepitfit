


import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SearchState {
	searchedData: {};
	searchedError: string | null;
}

const initialState: SearchState = {
	searchedData: {},
	searchedError: null,
}

export const counterSlice = createSlice({

	name: 'searchedData',
	initialState,
	
	reducers: {

		updateSearchedData: (state, action: PayloadAction<{ [key: string]: any }>) => {
			state.searchedData = action.payload;
		},

		updateSearchedError: (state, action: PayloadAction<string>) => {
			state.searchedError = action.payload;
		},

		clearSearchedVars: state => {
            state.searchedData = initialState.searchedData;
            state.searchedError = initialState.searchedError;
        },

	},

})

export const {
	updateSearchedData,
	updateSearchedError,
	clearSearchedVars
} = counterSlice.actions;

export default counterSlice.reducer;