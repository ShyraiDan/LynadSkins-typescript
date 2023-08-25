import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type TMarketItemsState = {
	state: boolean
}

const initialState: TMarketItemsState = {
	state: false,
}

const marketItemsSlice = createSlice({
	name: 'marketItems',
	initialState,
	reducers: {
		setState: (state, action: PayloadAction<boolean>) => {
			state.state = action.payload
		},
	},
})

export const { setState } = marketItemsSlice.actions
export const marketItemsReducer = marketItemsSlice.reducer
