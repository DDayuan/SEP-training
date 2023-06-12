

async function SearchBooks(query: string) {
    try {
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=20`
        );
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error("Error searching books:", error);
        throw error;
    }
}

export {SearchBooks};