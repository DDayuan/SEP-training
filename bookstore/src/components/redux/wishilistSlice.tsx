import { Book, WishlistState } from "../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: WishlistState = {
    books: []
  };

const wishlistSlice = createSlice ({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter(book => book.id !== action.payload)
    }
  }
});

export const {addToWishlist, removeFromWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;