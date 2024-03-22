


import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface typeState{
	userLang: string;
}

const initialState: typeState = {
	userLang: localStorage.getItem("i18nextLng") ?? "",
}

export const counterSlice = createSlice({

	name: 'userLang',
	initialState,
	
	reducers: {

		updateLang: (state, action: PayloadAction<string>) => {
			state.userLang = action.payload;
		}

	},

})

export const {
	updateLang
} = counterSlice.actions;

export default counterSlice.reducer;