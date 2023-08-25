import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth'
import { postReducer } from './slices/posts'
import { currencyReducer } from './slices/currency'
import { skinsReducer } from './slices/skins'
import { cartReducer } from './slices/cart'
import { changeReducer } from './slices/change'
import { marketItemsReducer } from './slices/marketItems'
import { signInModaReducer } from './slices/signInModal'
import { wishListReducer } from './slices/wishlist'
import { filtersReducer } from './slices/filters'

const store = configureStore({
	reducer: {
		posts: postReducer,
		auth: authReducer,
		currency: currencyReducer,
		skins: skinsReducer,
		cart: cartReducer,
		wishList: wishListReducer,
		marketItems: marketItemsReducer,
		signInModal: signInModaReducer,
		filters: filtersReducer,
		change: changeReducer,
	},
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
