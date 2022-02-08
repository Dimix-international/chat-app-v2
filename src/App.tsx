import React from 'react';
import './App.css';
import {StartPage} from "./components/start-page/StartPage";
import {ChatProvider} from "./providers/ChatProvider";


function App() {
    return (
        <div className="App">
            <ChatProvider>
                <StartPage/>
            </ChatProvider>
        </div>
    );
}

export default App;
