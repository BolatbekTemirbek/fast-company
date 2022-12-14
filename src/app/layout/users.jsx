import React from "react";
import { useParams } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";

const Users = () => {
    const { userId, edit } = useParams();
    return (
        <>
            {userId ? (
                edit ? (
                    <EditUserPage />
                ) : (
                    <UserPage />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
