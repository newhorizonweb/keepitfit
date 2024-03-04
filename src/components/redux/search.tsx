


import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SearchState {
	searchedData: {};
}

const initialState: SearchState = {
	searchedData: {},
}

export const counterSlice = createSlice({

	name: 'searchedData',
	initialState,
	
	reducers: {

		updateSearchedData: (state, action: PayloadAction<{ [key: string]: any }>) => {
			state.searchedData = action.payload;
		},

		clearSearchedVars: state => {
            state.searchedData = initialState.searchedData;
        },

	},

})

export const {
	updateSearchedData,
	clearSearchedVars
} = counterSlice.actions;

export default counterSlice.reducer;