


import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface typeState{
	userAMR: string;
	userBMI: string;
}

const initialState: typeState = {
	userAMR: localStorage.getItem("user-amr") ?? "2000", // default 2000 kcal
	userBMI: localStorage.getItem("user-bmi") ?? "",
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