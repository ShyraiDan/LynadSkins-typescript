import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TSkin } from '../types'

const wishListSlice = createSlice({
	name: 'wishlist',
	initialState: [] as Array<TSkin>,
	reducers: {
		addWishList: (state, action: PayloadAction<TSkin>) => {
			const index = state.findIndex(
				(item: TSkin) => item._id === action.payload._id
			)
			if (index === -1) {
				state.push(action.payload)
			}
		},
		resetWishList: (state) => {
			state.length = 0
		},
		removeWishItem: (state, action: PayloadAction<string>) => {
			const index = state.findIndex(
				(item: TSkin) => item._id === action.payload
			)
			if (index !== -1) {
				state.splice(index, 1)
			}
		},
	},
})

export const { addWishList, resetWishList, removeWishItem } =
	wishListSlice.actions
export const wishListReducer = wishListSlice.reducer
