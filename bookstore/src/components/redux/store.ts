import { configureStore } from '@reduxjs/toolkit'
import wishlistReducer from './wishilistSlice'
import searchPageReducer from './searchPageSlice'

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    searchPage: searchPageReducer
  }
});

export type RootState = ReturnType<typeof store.getState>

export default store;