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