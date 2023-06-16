import React from "react";
import { BrowserRouter as Router, Link, NavLink, useNavigate, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import BookCard from "../BookCard/BookCard";
import { RootState } from "../redux/store";
import "./wishlistPage.css"

const WishList: React.FC = () => {
    const wishlistBooks = useSelector((state: RootState) => state.wishlist.books);
    return (
        <div>
            <li>
                <NavLink to="/">Search Page</NavLink>
            </li>
            <li>
                <NavLink to="/wishlist">wishlist Page</NavLink>
            </li>
            <h1 className="heading">Wishlist</h1>
            <div className="book-card-container">
                {wishlistBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </div>)
}

export default WishList;