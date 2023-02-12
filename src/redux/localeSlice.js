import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    localeArabic: state => !state
  }
})

export const { localeArabic } = localeSlice.actions

export default localeSlice.reducer
