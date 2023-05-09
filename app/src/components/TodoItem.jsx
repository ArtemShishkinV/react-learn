import React from 'react';
import "../styles/todo.css"

const TodoItem = (props) => {
    function showCompleted(isComplete) {
        if (isComplete) {
            return <span style={{color: "green"}}>Выполнено!</span>
        }
        return <span style={{color: "red"}}>Ожидает выполнения!</span>
    }

    return (
        <div className="todo">
            <div className="todo-title">{props.todo.title}</div>
            <div className="todo-completed">{showCompleted(props.todo.completed)}</div>
        </div>
    );
};

export default TodoItem;