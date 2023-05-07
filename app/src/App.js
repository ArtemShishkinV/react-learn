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
