import React from "react";
import NavBar from "./components/ui/navBar";
import { Routes, Route } from "react-router-dom";
import Login from "./layout/login";
import Users from "./layout/users";
import Main from "./layout/main";
import UserPage from "./components/page/userPage";
import RegisterForm from "./components/ui/registerForm";
import EditUserPage from "./components/page/editUserPage";

function App() {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="login/*" element={<Login />}>
                    <Route path=":type" element={<RegisterForm />} />
                </Route>
                <Route path="users" element={<Users />}>
                    <Route path="/users/:userId" element={<UserPage />}>
                        <Route path=":edit" element={<EditUserPage />} />
                    </Route>
                </Route>
                {/* <Route path="/users/:userId/edit" element={<EditUserPage />} /> */}
            </Routes>
        </div>
    );
}
export default App;
