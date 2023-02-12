import authReducer from './authSlice'
import localeReducer from './localeSlice'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    auth: authReducer,
    locale: localeReducer
  }
})
