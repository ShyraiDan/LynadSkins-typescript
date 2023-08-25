import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type TCurrency = {
	currency: string
}

const initialState: TCurrency = {
	currency: 'usd',
}

const currencySlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {
		setCurrency: (state, action: PayloadAction<string>) => {
			state.currency = action.payload
		},
	},
})

export const { setCurrency } = currencySlice.actions
export const currencyReducer = currencySlice.reducer
