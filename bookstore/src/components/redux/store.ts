import { configureStore } from '@reduxjs/toolkit';
import wishilistSlice from './wishilistSlice';
import wishlistReducer from './wishilistSlice';

export const store = configureStore({
    reducer: {
        wishlist: wishlistReducer,
    }
})

