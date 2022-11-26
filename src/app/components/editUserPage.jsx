import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QualitiesList from "./qualitiesList";
import API from "../API";

const EditUserPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState();
    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, [userId]);

    return (
        <div>
            {user && (
                <div>
                    <h1>{user.name}</h1>
                    <h2>Профессия:{user.profession.name}</h2>
                    <span>
                        <QualitiesList qualities={user.qualities} />
                    </span>
                    <span>completedMeetings: {user.completedMeetings}</span>
                    <h2>Rate: {user.rate}</h2>
                    <button
                        onClick={() => navigate("/users")}
                        className="btn btn-primary"
                    >
                        Все пользователи
                    </button>
                </div>
            )}
        </div>
    );
};

export default EditUserPage;
