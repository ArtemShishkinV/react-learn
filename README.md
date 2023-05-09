# Урок-3
## Получение данных с сервера и отображение их на странице.
### Axios, useEffect и жизненный цикл компонента.

Для примера с помощью запроса получим список todos с сайта: https://jsonplaceholder.typicode.com/

<hr>

#### Axios

Библиотека для отправки запросов на сервер. Предварительно необходимо установить с помощью `npm i install`

#### Получение списка задач с сервера

```javascript
function App() {
    const [todos, updateTodos] = useState([]);

    async function getTodos() {
        const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
        console.log(response.data)
    }


    return (
        <div className="App">
            <div className="container">
                <h1>Список задач</h1>
                <button onClick={getTodos}>Загрузить задачи</button>
            </div>
        </div>
    );
}
```

Для того чтобы прогружать список задач сразу, а не по нажатию на кнопку, необходимо воспользоваться хуком `useEffect(callback, deps)`.
Его работу можно настроить гибко, за счет второго параметра `deps`. Есть три возможных варианта, когда срабатывает этот хук, что связано с жизненным циклом компонента.
##### deps = []

Срабатывает при [монтировании](#mount) компонента.

```javascript
useEffect(() => {
    function()
}, [])
```

##### deps = [filter]

`filter` - какой-то компонент, который обновляется. В данном случае, `useEffect()` срабатывает при каждом [обновлении компонента](#update) `filter`.

```javascript
const [filter, updateFilter] = useState({sort: ''});

useEffect(() => {
    function()
}, [filter])
```

##### deps = [] + return()

Срабатывает на этапе [размонтирования](#unmount).

```javascript
useEffect(() => {
    function()
    
    return () => {
        clear() //Что-то очищаем
    }
}, [])
```
<hr>

#### Жизненный цикл компонента

Каждый компонент проходит следующий жизненный цикл:
* **Монтирование(mount)** - выполняется один раз при вставке в DOM-дерево. В этот момент подгружаются необходимые данные, вешаются слушатели событий и т.д.<a id="mount"></a>
* **Обновление(update)** - выполняется каждый раз, когда мы совершаем какие-либо изменения компонента(фильтрация, сортировка, удаление элемента из списка, изменение значение компонента и т.д.)<a id="update"></a>
* **Размонтирование(unmount)** - выполняется один раз при удалении из компонента из DOM-дерева. На данном этапе отписываемся от слушателей событий, очищаем хранилища и т.д.<a id="unmount"></a>

<hr>

#### Использования useEffect для загрузки задач

##### App.js
```javascript
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
```

##### TodoItem.jsx
```javascript
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
```
