


import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface FavState {
	servWght: number | null;
}

const initialState: FavState = {
	servWght: 0,
}

export const counterSlice = createSlice({

	name: 'apiData',
	initialState,
	
	reducers: {

		updateServWght: (state, action: PayloadAction<number | null>) => {
			state.servWght = action.payload;
		}

	},

})

export const {
	updateServWght
} = counterSlice.actions;

export default counterSlice.reducer;