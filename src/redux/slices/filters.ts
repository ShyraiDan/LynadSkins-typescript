import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TFilters } from '../types'

type TFiltersState = {
	updated: boolean
	filters: TFilters
}

const initialState: TFiltersState = {
	updated: false,
	filters: {
		itemName: '',
		skinName: '',
		exterior: [],
		rarity: [],
		type: [],
		statTrak: '',
		souvenir: '',
		price: { min: '', max: '' },
		float: '',
		color: [],
	},
}

const filtersSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setFilters: (state, action: PayloadAction<TFilters>) => {
			state.filters = action.payload
		},
		resetFilters: (state) => {
			state.filters = {
				itemName: '',
				skinName: '',
				exterior: [],
				rarity: [],
				type: [],
				statTrak: '',
				souvenir: '',
				price: { min: '', max: '' },
				float: '',
				color: [],
			}
		},
	},
})
export const { setFilters, resetFilters } = filtersSlice.actions
export const filtersReducer = filtersSlice.reducer
