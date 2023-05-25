const API = (() => {
    const URL = "http://localhost:8000/todos"

    
    const  getTodos = () => {
        return fetch(URL).then(data => data.json());
    }

    const deleteTodos = (id) => {
        return fetch(URL + "/" + id,{
            method: "DELETE"
        }).then(data => data.json())
    }

    const postTodos = (todo, id) => {
        return fetch(URL, {
            method: "POST",
            body: JSON.stringify(todo),
            headers: {
                "Content-Type": "application/json",
            }
        }).then(data => data.json());
    }
    return {
        getTodos,
        deleteTodos,
        postTodos
    }
})();

export default API;