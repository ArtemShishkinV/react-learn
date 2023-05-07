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