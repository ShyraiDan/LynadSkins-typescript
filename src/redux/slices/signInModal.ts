import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const signInModalSlice = createSlice({
	name: 'signInModal',
	initialState: {
		state: false,
	},
	reducers: {
		setSignInState: (state, action: PayloadAction<boolean>) => {
			state.state = action.payload
		},
	},
})

export const { setSignInState } = signInModalSlice.actions
export const signInModaReducer = signInModalSlice.reducer
