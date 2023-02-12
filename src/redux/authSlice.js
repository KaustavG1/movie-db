import { createSlice } from '@reduxjs/toolkit'

const initialState = [{}]

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.push(action.payload)
    }
  }
})

export const { userLogin } = authSlice.actions

export default authSlice.reducer
