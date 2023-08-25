import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TUser } from '../types'
import axios from '../../axios'
import { TfetchAuthparams, TfetchRegisterparams } from '../types'

export const fetchAuth = createAsyncThunk(
	'auth/fetchAuth',
	async (params: TfetchAuthparams) => {
		const { data } = await axios.post('/auth/login', params)
		return data
	}
)

export const fetchAuthMe = createAsyncThunk(
	'auth/fetchAuthMe',
	async (params: string) => {
		const { data } = await axios.get('/auth/me', { data: params })
		return data
	}
)

export const fetchRegister = createAsyncThunk(
	'auth/fetchRegister',
	async (params: TfetchRegisterparams) => {
		const { data } = await axios.post('/auth/register', params)
		return data
	}
)

export const updateUser = createAsyncThunk(
	'auth/updateUser',
	async (params: TUser) => {
		const { data } = await axios.patch('/auth/me', params)
		return data
	}
)

type AuthState = {
	data: TUser | null
	status: string
	updated: boolean
}

const initialState: AuthState = {
	data: null,
	status: 'loading',
	updated: false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.data = null
		},
		setUpdated: (state) => {
			state.updated = !state.updated
		},
		updStateUser: (state, action) => {
			state.data = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAuth.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchAuth.fulfilled, (state, action: PayloadAction<TUser>) => {
				state.status = 'loaded'
				state.data = action.payload
			})
			.addCase(fetchAuth.rejected, (state) => {
				state.status = 'error'
			})
		builder
			.addCase(fetchAuthMe.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchAuthMe.fulfilled, (state, action: PayloadAction<TUser>) => {
				state.status = 'loaded'
				state.data = action.payload
			})
			.addCase(fetchAuthMe.rejected, (state) => {
				state.status = 'error'
			})
		builder
			.addCase(fetchRegister.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(
				fetchRegister.fulfilled,
				(state, action: PayloadAction<TUser>) => {
					state.status = 'loaded'
					state.data = action.payload
				}
			)
			.addCase(fetchRegister.rejected, (state) => {
				state.status = 'error'
			})
		builder
			.addCase(updateUser.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(updateUser.fulfilled, (state) => {
				state.status = 'loaded'
			})
			.addCase(updateUser.rejected, (state) => {
				state.status = 'error'
			})
	},
})
export const selectIsAuth = ({ auth }: any) => Boolean(auth.data)

export const authReducer = authSlice.reducer

export const { logout, setUpdated, updStateUser } = authSlice.actions
