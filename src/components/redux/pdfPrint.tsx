


import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Types{
	isPrinting: boolean;
}

const initialState: Types = {
	isPrinting: false,
}

export const counterSlice = createSlice({

	name: 'pdfPrint',
	initialState,
	
	reducers: {

		updateIsPrinting: (state, action: PayloadAction<boolean>) => {
			state.isPrinting = action.payload;
		}

	},

})

export const {
	updateIsPrinting
} = counterSlice.actions;

export default counterSlice.reducer;