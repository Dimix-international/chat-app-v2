import React from 'react';
import './App.css';
import {io} from "socket.io-client";
import {StartPage} from "./components/start-page/StartPage";


function App() {
    return (
        <div className="App">
            <StartPage/>
        </div>
    );
}

export default App;
