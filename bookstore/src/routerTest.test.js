import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import wishilistReducer from "./components/redux/wishilistSlice";
import WishList from "./components/WishlistPage/wishListPage";
import store from "./components/redux/store";
import { MemoryRouter } from "react-router-dom";


const tore = configureStore({
      reducer: {
        Wishlist: wishilistReducer,
      },
      preloadedState: {},
    });

describe("APP router ", () => {
    test("navigates between SearchPage and WishList", async() => {
        render (
            <Provider store={store}>
                <MemoryRouter>
                    <App/>
                </MemoryRouter>
            </Provider>
        )

        const searchPageLink = screen.getByRole('link', { name: /Search Page/i });

        expect(searchPageLink).toBeInTheDocument();

        const wishlistLink = screen.getByRole('link', { name: /wishlist/i });
        userEvent.click(wishlistLink);

        expect(await screen.findByText("wishlist Page")).toBeInTheDocument();
    })
})