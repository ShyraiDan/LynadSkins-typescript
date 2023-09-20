import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TSkin } from '../types'
import axios from '../../axios'

export const fetchAllSkins = createAsyncThunk('skins/fetchAllSkins', async ([userId, filters]: Array<string>) => {
  const { data } = await axios.post(`/Nskins${filters && filters}`, {
    user: userId
  })
  return data
})

export const fetchUserSkins = createAsyncThunk('skins/fetchUserSkins', async () => {
  const { data } = await axios.get('/myskins')
  return data
})

export const createSkin = createAsyncThunk('skins/createSkin', async (params: TSkin) => {
  const { data } = await axios.post('/skins', params)
  return data
})

export const updateSkin = createAsyncThunk('skins/updateSkin', async (params: TSkin) => {
  const { data } = await axios.patch(`/skins/${params._id}`, params)
  return data
})

type skinsState = {
  items: Array<TSkin>
  myItems: Array<TSkin>
  status: string
}

const initialState: skinsState = {
  items: [],
  myItems: [],
  status: 'loading'
}

const skinsSlice = createSlice({
  name: 'skins',
  initialState,
  reducers: {
    setSkins: (state, action) => {
      state.items = action.payload
    },
    setMySkins: (state, action) => {
      state.myItems = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSkins.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAllSkins.fulfilled, (state, action: PayloadAction<Array<TSkin>>) => {
        state.status = 'loaded'
        state.items = action.payload
      })
      .addCase(fetchAllSkins.rejected, (state) => {
        state.status = 'error'
      })

    builder
      .addCase(fetchUserSkins.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUserSkins.fulfilled, (state, action: PayloadAction<Array<TSkin>>) => {
        state.status = 'loaded'
        state.myItems = action.payload
      })
      .addCase(fetchUserSkins.rejected, (state) => {
        state.status = 'error'
      })

    builder
      .addCase(createSkin.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(createSkin.fulfilled, (state, action: PayloadAction<Array<TSkin>>) => {
        state.status = 'loaded'
        state.items = action.payload
      })
      .addCase(createSkin.rejected, (state) => {
        state.status = 'error'
      })

    builder
      .addCase(updateSkin.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(
        updateSkin.fulfilled,
        // PayloadAction<Array<TSkin>>
        (state) => {
          state.status = 'loaded'
          // state.items = action.payload
        }
      )
      .addCase(updateSkin.rejected, (state) => {
        state.status = 'error'
      })
  }
})
export const { setSkins, setMySkins } = skinsSlice.actions
export const skinsReducer = skinsSlice.reducer
