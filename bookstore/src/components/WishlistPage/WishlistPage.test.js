import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import WishList from "./wishListPage";
import userEvent from "@testing-library/user-event";
import { RootState } from "../redux/store";
import wishilistReducer from "../redux/wishilistSlice";
import { BrowserRouter as Router } from 'react-router-dom';

const createMockStore = (preloadedState) => {
    return configureStore({
      reducer: {
        wishlist: wishilistReducer,
      },
      preloadedState,
    });
  };

  const mockBook = {
    id: '1',
    volumeInfo: {
      title: 'Test Book',
      authors: ['Test Author'],
      imageLinks: { thumbnail: 'test.jpg' },
      infoLink: 'testlink',
    },
  };

describe("WishList", () => {
    beforeEach(()=>{
        const store = createMockStore({ wishlist:{books: [mockBook]}});

        render (
            <Provider store={store}>
                <Router>
                    <WishList />
                </Router>
            </Provider>
        )
    })

    test('renders book in wishlist', () => {
        const bookTitle = screen.getByText('Test Book');
        expect(bookTitle).toBeInTheDocument();
      });

    test('remove book from wishlist', ()=> {
        const removeBtn = screen.getByText('Remove from Wishlist');
        userEvent.click(removeBtn);

        const bookTitle = screen.queryByTitle('Test Book');
        expect(bookTitle).not.toBeInTheDocument();
    })
})