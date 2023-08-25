import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { decode } from '../../helpers/helpers'
import { TSkin } from '../types'

type TChangeState = {
	marketItems: Array<TSkin>
	yourItems: Array<TSkin>
}

const initialState: TChangeState = {
	marketItems: [],
	yourItems: [],
}

const changeSlice = createSlice({
	name: 'change',
	initialState,
	reducers: {
		addChange: (state, action: PayloadAction<TSkin>) => {
			const indx = state.marketItems.findIndex(
				(item) => item._id === action.payload._id
			)
			const index = state.yourItems.findIndex(
				(item) => item._id === action.payload._id
			)

			if (indx > -1 || index > -1) {
				return
			}

			const token = localStorage.getItem('token')
			if (!token) {
				return
			}
			const userId = decode(token).payload._id
			if (action.payload.user === userId) {
				state.yourItems.push(action.payload)
			} else {
				state.marketItems.push(action.payload)
			}
		},
		removeChange: (state, action: PayloadAction<string>) => {
			state.marketItems = state.marketItems.filter(
				(item) => item._id !== action.payload
			)
			state.yourItems = state.yourItems.filter(
				(item) => item._id !== action.payload
			)
		},
		resetChange: (state) => {
			state.marketItems = []
			state.yourItems = []
		},
	},
})
export const { addChange, removeChange, resetChange } = changeSlice.actions
export const changeReducer = changeSlice.reducer
