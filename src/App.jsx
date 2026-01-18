import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup/Signup.jsx";
import Login from "./Login/Login.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/signup-user" element={<Signup/>} />
                <Route path= "/dashboard"  element={<Dashboard/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
