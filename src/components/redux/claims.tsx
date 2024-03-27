


import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Types{
	visClaims: boolean;
}

const initialState: Types = {
	visClaims: false,
}

export const counterSlice = createSlice({

	name: 'visClaims',
	initialState,
	
	reducers: {

		updateVisClaims: (state, action: PayloadAction<boolean>) => {
			state.visClaims = action.payload;
		}

	},

})

export const {
	updateVisClaims
} = counterSlice.actions;

export default counterSlice.reducer;