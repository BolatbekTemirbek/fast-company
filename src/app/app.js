import React from "react";
import NavBar from "./components/navBar";
import { Routes, Route } from "react-router-dom";
import Login from "./layout/login";
import Users from "./layout/users";
import Main from "./layout/main";
import EditUserPage from "./components/editUserPage";

function App() {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="login/*" element={<Login />} />
                <Route path="users" element={<Users />}>
                    <Route path=":userId" element={<EditUserPage />} />
                </Route>
            </Routes>
        </div>
    );
}
export default App;
