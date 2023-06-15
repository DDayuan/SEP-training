import React, { useEffect, useState } from "react";
import { SearchBooks } from "../API";
import { BrowserRouter as Router, Link, NavLink, useNavigate, Routes, Route } from 'react-router-dom';
import BookCard from "../BookCard/BookCard";
import { Book } from "../types";
import "./searchPage.css"
import { Pagination } from "@mui/material";

const SearchPage: React.FC = () => {
    const [query, setQuery] = useState(" ");
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const handleSearch = async () => {
        if (!query.trim()) {
            alert("Please enter a search query");
            return;
        }

        try {
            setIsLoading(true);
            const data = await SearchBooks(query, page);
            console.log(data);
            if (data.items) {
                setBooks(data.items);
                console.log("Total items:", data.totalItems);
                setTotalPages(Math.ceil(data.totalItems / 20));
            } else {
                alert("No books found. Try a different query.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while searching for books");
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    useEffect(() => {
        if (query.trim()) {
            handleSearch();
        }
    }, [page])

    return (
        <div>
            <li>
                <NavLink to="/">Search Page</NavLink>
            </li>
            <li>
                <NavLink to="/wishlist">wishlist Page</NavLink>
            </li>
            <h1 className="heading">Search Page</h1>
            <li>
                <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button onClick={
                    () => {
                        handleSearch();
                        setPage(1);
                }}>Search</button>
            </li>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="book-card-container">
                    {books.map((book) => (
                        <BookCard key={book.id} book={book} />
                    ))}
                </div>
            )}
            <Pagination
                variant="outlined"
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                shape="rounded"
            />
        </div>
    );
}

export default SearchPage;
