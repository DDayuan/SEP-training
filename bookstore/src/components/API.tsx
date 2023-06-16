

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

export const GetTitleSuggestions = async (query: string) => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=10`
        )
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const suggestions = data.items.map((item: any) => item.volumeInfo.title);
        return suggestions;
    } catch (error) {
        console.log("error is ", error)
    };
}