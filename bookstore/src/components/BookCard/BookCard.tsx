import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import wishilistSlice, { addToWishlist, removeFromWishlist } from "../redux/wishilistSlice";
import { Book, RootState } from "../types";
import "./BookCard.css";

interface BookCardProps {
    book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
    const dispatch = useDispatch();
    const wishlistBooks = useSelector((state: RootState) => state.wishlist.books);
    const isBookInWishlist = wishlistBooks.some((wishlistBook) => wishlistBook.id === book.id);

    const handleAddToWishlist = () => {
        dispatch(addToWishlist(book));
    }

    const handleRemoveFromWishlist = () => {
        dispatch(removeFromWishlist(book.id));
    }
    return (
    <div className="BookCard">
        {book.volumeInfo.imageLinks ?
            <img className="book-img" src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
            : <p>No Image Available</p>
        }
        {/* <h2>{book.volumeInfo.title}</h2> */}
        <h2><a href={book.volumeInfo.infoLink} target="_blank" rel="noopener noreferrer">{book.volumeInfo.title}</a></h2>
        <p>{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Authors'}</p>
        {isBookInWishlist ? (
        <button  className="remove-button" onClick={handleRemoveFromWishlist}>Remove from Wishlist</button>
      ) : (
        <button className="add-button" onClick={handleAddToWishlist}>Add to Wishlist</button>
      )}
    </div>
    )
}

    export default BookCard;