import './styles/App.css';
import Chat from './components/chat.jsx';
import Login from './components/login.jsx';
import UserList from './components/user_list.jsx';
import SignUp from './components/signup.jsx';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
function App() {
    return (
        <>
            {/* <nav>
                <Link to="/">Home</Link>
                <Link to ="/chat">Chat</Link>
                <Link to ="/login">Login</Link>
            </nav> */}
            <Routes>
                <Route path="/chat" element={<Chat />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
            {/* <div className="container-fluid vh-100 ">
                <div className="row h-100">
                    <div className="col-3 bg-light">
                        <UserList />
                    </div>
                    <div className="col-9">
                        <Chat />
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default App;