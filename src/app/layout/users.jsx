import React from "react";
import UsersList from "../components/usersList";
import EditUserPage from "../components/editUserPage";
import { useParams } from "react-router-dom";

const Users = () => {
    const { userId } = useParams();
    return <>{userId ? <EditUserPage /> : <UsersList />}</>;
};

export default Users;
