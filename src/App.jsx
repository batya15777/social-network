import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup/Signup.jsx";
import Login from "./Login/Login.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Profile from "./Dashboard/Profile.jsx";
import Search from "./Search/Search.jsx";
import PostPage from "./Post/PostPage.jsx";
import UserPage from "./Dashboard/UserPage.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path= "/" element={<Login/>} />
                <Route path= "/signup-user" element={<Signup/>} />
                <Route path= "/dashboard"  element={<Dashboard/>} />
                <Route path= "/profile" element={<Profile/>} />
                <Route path= "/search" element={<Search/>} />
                <Route path={"/post-page/:id/"} element={<PostPage/>}/>
                <Route path={"/user-page/:id"} element={<UserPage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
