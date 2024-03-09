


import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface FavState {
	favoriteSearch: string;
}

const initialState: FavState = {
	favoriteSearch: "",
}

export const counterSlice = createSlice({

	name: 'favoriteSearch',
	initialState,
	
	reducers: {

		updateFavSearch: (state, action: PayloadAction<string>) => {
			state.favoriteSearch = action.payload;
		}

	},

})

export const {
	updateFavSearch
} = counterSlice.actions;

export default counterSlice.reducer;