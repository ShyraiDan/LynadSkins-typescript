import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'
import { TPost } from '../types'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const { data } = await axios.get('/posts')
	return data
})

export const fetchRemovePost = createAsyncThunk(
	'posts/fetchRemovePost',
	async (id: string | number) => {
		await axios.delete(`/posts/${id}`)
	}
)

type TPostState = {
	posts: Array<TPost>
	status: string
}

const initialState: TPostState = {
	posts: [],
	status: 'loading',
}

const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Get all posts
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(
				fetchPosts.fulfilled,
				(state, action: PayloadAction<Array<TPost>>) => {
					state.posts = action.payload
					state.status = 'loaded'
				}
			)
			.addCase(fetchPosts.rejected, (state) => {
				state.status = 'error'
			})
		// Delete post
		builder.addCase(fetchRemovePost.pending, (state, action) => {
			state.posts = state.posts.filter(
				(obj: TPost) => obj._id !== action.meta.arg
			)
		})
	},
})

export const postReducer = postSlice.reducer
