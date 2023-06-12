export interface Book {
    id: string;
    volumeInfo: {
      title: string;
      authors: string[];
      imageLinks: { thumbnail: string };
      infoLink: string;
    };
  }

export interface WishlistState {
    books: Book[];
}

export interface RootState {
    wishlist: WishlistState;
  }

