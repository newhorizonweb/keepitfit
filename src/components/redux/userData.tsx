


import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface typeState{
	userAMR: string;
	userBMI: string;
}

const initialState: typeState = {
	userAMR: "",
	userBMI: "",
}

export const counterSlice = createSlice({

	name: 'userAMR',
	initialState,
	
	reducers: {

		updateUserAMR: (state, action: PayloadAction<string>) => {
			state.userAMR = action.payload;
		},

		updateUserBMI: (state, action: PayloadAction<string>) => {
			state.userBMI = action.payload;
		}

	},

})

export const {
	updateUserAMR,
	updateUserBMI
} = counterSlice.actions;

export default counterSlice.reducer;