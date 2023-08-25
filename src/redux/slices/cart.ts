import { createSlice } from '@reduxjs/toolkit'
import { TSkin } from '../types'

const cartSlice = createSlice({
	name: 'cart',
	initialState: [] as Array<TSkin>,
	reducers: {
		addCart: (state, action) => {
			const index = state.findIndex(
				(item: TSkin) => item._id === action.payload._id
			)
			if (index === -1) {
				state.push(action.payload)
			}
		},
		resetCart: (state) => {
			state.length = 0
		},
		removeItem: (state, action) => {
			const index = state.findIndex((item) => item._id === action.payload)
			if (index !== -1) {
				state.splice(index, 1)
			}
		},
	},
})

export const { addCart, resetCart, removeItem } = cartSlice.actions
export const cartReducer = cartSlice.reducer
