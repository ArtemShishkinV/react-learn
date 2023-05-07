# Урок-2
## Создание классовых и функциональных компонентов

### Создание функционального компонента

Для повторного использования компонентов и организации чистого кода, целесообразно выносить код, отвечающий за создание конкретного компонента в отдельный jsx файл

#### App.js (до рефакторинга)
```javascript
function App() {
    const [balance, updateBalance] = useState(0);
    const [quantity, updateQuantity] = useState(0);

    function withdraw() {
        let newValue = balance - quantity
        if (newValue < 0) {
            alert("Negative balance!")
            return
        }
        updateBalance(balance - quantity)
    }

    function topUp() {
        updateBalance(balance + quantity)
    }
    
    return (
        <div className="App">
            <div className="container">
                <div className="app-inner">
                    <div className="balance">
                        Your balance: {balance}
                    </div>
                    <div className="operations">
                        <input
                            type="number"
                            value={quantity}
                            min="0"
                            max="1000"
                            onChange={event => updateQuantity(parseInt(event.target.value))}
                        />
                        <div className="operations-button">
                            <button onClick={withdraw}>Снять</button>
                            <button onClick={topUp}>Пополнить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
```
Теперь вынесем компонент, отвечающий за изменение баланса в отдельный файл. Для этого создадим в корне папку **components**, а внутри нее файл с именем **Balance.jsx**

Для быстрого создания функционального компонента используется **rsc -> tab**.

#### components/Balance.jsx
```javascript
import React, {useState} from 'react';
import '../styles/balance.css';

const Balance = () => {
    const [balance, updateBalance] = useState(0);
    const [quantity, updateQuantity] = useState(0);

    function withdraw() {
        let newValue = balance - quantity
        if (newValue < 0) {
            alert("Negative balance!")
            return
        }
        updateBalance(balance - quantity)
    }

    function topUp() {
        updateBalance(balance + quantity)
    }
    return (
        <div className="balance-wrapper">
            <div className="balance">
                Your balance: {balance}
            </div>
            <div className="operations">
                <input
                    type="number"
                    value={quantity}
                    min="0"
                    max="1000"
                    onChange={event => updateQuantity(parseInt(event.target.value))}
                />
                <div className="operations-button">
                    <button onClick={withdraw}>Снять</button>
                    <button onClick={topUp}>Пополнить</button>
                </div>
            </div>
        </div>
    );
};

export default Balance;
```

Теперь в основном файле можно создать два компонента `<Balance>`, предварительно импортировав его.

Созданные компоненты будут независимы друг от друга.

#### App.js
```javascript
import React from "react";
import './styles/index.css';
import Balance from "./components/Balance";

function App() {


    return (
        <div className="App">
            <div className="container">
                <div className="App-inner">
                    <div className="App-inner-item">
                        <h2>Иванов Иван Иванович</h2>
                        <Balance/>
                    </div>
                    <div className="App-inner-item">
                        <h2>Петров Петр Петрович</h2>
                        <Balance/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

```

### Создание классового компонента

Все тоже самое можно сделать с использованием классового компонента. Это устаревший подход, но знать о нем стоит, так как легаси код преследует нас.

#### components/ClassBalance.jsx
```javascript
import React, {Component} from 'react';
import '../styles/balance.css';

class ClassBalance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            balance: 0,
            quantity: 0
        }
        this.topUp = this.topUp.bind(this)
        this.withdraw = this.withdraw.bind(this)
    }

    withdraw() {
        let newValue = this.state.balance - this.state.quantity
        if (newValue < 0) {
            alert("Negative balance!")
            return
        }
        this.setState({balance: newValue})
    }

    topUp() {
        this.setState({balance: this.state.balance + this.state.quantity})
    }

    render() {
        return (
            <div className="balance-wrapper">
                <div className="balance">
                    Your balance: {this.state.balance}
                </div>
                <div className="operations">
                    <input
                        type="number"
                        value={this.state.quantity}
                        min="0"
                        max="1000"
                        onChange={event => this.setState({quantity: parseInt(event.target.value)})}
                    />
                    <div className="operations-button">
                        <button onClick={this.withdraw}>Снять</button>
                        <button onClick={this.topUp}>Пополнить</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ClassBalance;
```

В основном файл нужно сделать небольшое изменение - заменим `<Balance>` на `<ClassBalance>`.

#### App.jsx
```javascript
import React from "react";
import './styles/index.css';
import ClassBalance from "./components/ClassBalance";

function App() {


    return (
        <div className="App">
            <div className="container">
                <div className="App-inner">
                    <div className="App-inner-item">
                        <h2>Иванов Иван Иванович</h2>
                        <ClassBalance/>
                    </div>
                    <div className="App-inner-item">
                        <h2>Петров Петр Петрович</h2>
                        <ClassBalance/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

```


