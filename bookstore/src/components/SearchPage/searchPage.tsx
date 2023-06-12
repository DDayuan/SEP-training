import React, { useEffect, useState } from "react";
import { SearchBooks } from "../API";
import { BrowserRouter as Router, Link, NavLink, useNavigate, Routes, Route } from 'react-router-dom';
import BookCard from "../BookCard/BookCard";
import { Book } from "../types";
import "./searchPage.css"

const SearchPage: React.FC = () => {
    const [query, setQuery] = useState("");
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        try {
            setIsLoading(true);
            console.log(query)
            const data = await SearchBooks(query);
            setBooks(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
        setQuery("");
    }
    useEffect(() => {
        console.log(books);
        console.log(books[0]);
    }, [books]);

    return (<div>
        <li>
            <NavLink to="/">Search Page</NavLink>
        </li>
        <li>
            <NavLink to="/wishlist">wishlist Page</NavLink>
        </li>
        <h1 className="heading">Search Page</h1>
        <li>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
        </li>

        { isLoading ? (
            <p>is Loading</p>
        ) : (
            <div className="book-card-container">
                {books.map((book) => (
                    // <li key={book.id}>{book.volumeInfo.title}</li>
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        )}
    </div >)
}

export default SearchPage;