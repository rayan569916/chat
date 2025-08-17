import React from 'react';
import './styles/App.css';
import Chat from './components/chat.jsx';
function App() {
    return (
        <div className="container-fluid vh-100">
            <div className="row h-100">
                <div className="col-3 bg-light">

                </div>
                <div className="col-9">
                    <Chat />
                </div>
            </div>
        </div>
    );
}

export default App;