import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../types";

interface SearchPageState {
    query: string;
    books: Book[];
    isLoading: boolean;
    page: number;
    totalPages: number;
    suggestions: string[];
}

const initialState: SearchPageState = {
    query: " ",
    books: [],
    isLoading: false,
    page: 1,
    totalPages: 0,
    suggestions: [],
}

export const searchPageSlice = createSlice({
    name: 'searchPage',
    initialState,
    reducers: {
      setQuery: (state, action: PayloadAction<string>) => {
        state.query = action.payload;
      },
      setBooks: (state, action: PayloadAction<Book[]>) => {
        state.books = action.payload;
      },
      setIsLoading: (state, action: PayloadAction<boolean>) => {
        state.isLoading = action.payload;
      },
      setPage: (state, action: PayloadAction<number>) => {
        state.page = action.payload;
      },
      setTotalPages: (state, action: PayloadAction<number>) => {
        state.totalPages = action.payload;
      },
      setSuggestions: (state, action: PayloadAction<string[]>) => {
        state.suggestions = action.payload;
      }
    },
  });
  
  export const { setQuery, setBooks, setIsLoading, setPage, setTotalPages, setSuggestions } = searchPageSlice.actions;
  
  export default searchPageSlice.reducer;