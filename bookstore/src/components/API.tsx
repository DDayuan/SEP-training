

async function SearchBooks(query: string, page: number) {
    try {
        const startIndex = (page - 1) * 20;
        console.log("startindex is", startIndex);
        console.log("query is",query);
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=20`
        );
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error searching books:", error);
        throw error;
    }
}

export {SearchBooks};