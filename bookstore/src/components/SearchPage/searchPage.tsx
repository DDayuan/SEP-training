import React, { useEffect, useState } from "react";
import { SearchBooks, GetTitleSuggestions } from "../API";
import { BrowserRouter as Router, Link, NavLink, useNavigate, Routes, Route } from 'react-router-dom';
import BookCard from "../BookCard/BookCard";
import { useDispatch, useSelector } from "react-redux";
import "./searchPage.css"
import Pagination  from "../Pagination";
//import { Pagination } from "@mui/material";
import { setQuery, setBooks, setIsLoading, setPage, setTotalPages, setSuggestions } from '../redux/searchPageSlice';
import { RootState } from "../redux/store";


const SearchPage: React.FC = () => {
    const dispatch = useDispatch();
    const { query, books, isLoading, page, totalPages, suggestions } = useSelector((state: RootState) => state.searchPage);

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
                dispatch(setBooks(data.items));
                console.log("Total items:", data.totalItems);
                dispatch(setTotalPages(Math.ceil(data.totalItems / 20)));
                console.log("totalpage is", totalPages);
            } else {
                alert("No books found. Try a different query.");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while searching for books");
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        dispatch(setQuery(input));
        if (input.trim()) {
            const newSuggestions = await GetTitleSuggestions(input);
            dispatch(setSuggestions(newSuggestions));
        } else {
            dispatch(setSuggestions([]));
        }
    }

    const handleInputBlur = () => {
        setTimeout(() => dispatch(setSuggestions([])), 100);
    };

    const handleInputFocus = async () => {
        if (query.trim()) {
            const newSuggestions = await GetTitleSuggestions(query);
            dispatch(setSuggestions(newSuggestions));
        }
    }

    const handleSuggestionClick = ( suggestion: string) => {
        console.log("Suggestion clicked:", suggestion);
        dispatch(setQuery(suggestion));
        dispatch(setSuggestions([]));
        handleSearch();
    }

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setPage(value));
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
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                />
                <button onClick={handleSearch}>Search</button>
                {suggestions.length > 0 && (
                    <div className="suggestion-container">
                    {suggestions.map((suggestion, index) => (
                        <div key={index} onMouseDown={() => handleSuggestionClick(suggestion)}>
                            {suggestion}
                        </div>
                    ))}
                </div>
                )}
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
            {/* <Pagination
                variant="outlined"
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                shape="rounded"
            /> */}
            <Pagination />
        </div>
    );
}

export default SearchPage;
