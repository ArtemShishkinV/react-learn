import React, {useEffect, useState} from "react";
import './styles/index.css';
import axios from "axios";
import TodoItem from "./components/TodoItem";

function App() {
    const [todos, updateTodos] = useState([]);

    useEffect(() => {
        getTodos()
    }, [])

    async function getTodos() {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
        updateTodos(response.data)
        console.log(todos)
    }


    return (
        <div className="App">
            <div className="container">
                <h1>Список задач</h1>
                {todos.map((todo) =>
                    <TodoItem todo={todo} key={todo.id}/>
                )}
            </div>
        </div>
    );
}

export default App;
