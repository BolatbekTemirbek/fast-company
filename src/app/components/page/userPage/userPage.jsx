import React, { useEffect, useState } from "react";
import API from "../../../API";
import UserCard from "../../ui/userCard";
import { useParams, useNavigate } from "react-router-dom";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetngsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";

const UserPage = () => {
    const [user, setUser] = useState();
    const { userId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, [userId]);
    return (
        <div>
            {user ? (
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <UserCard user={user} />
                            <QualitiesCard qualities={user.qualities} />
                            <MeetngsCard value={user.completedMeetings} />

                            <button
                                className="btn btn-primary"
                                onClick={() => navigate("/users")}
                            >
                                <i className="bi bi-caret-left"></i> Назад
                            </button>
                        </div>

                        <div className="col-md-8">
                            <Comments />
                        </div>
                    </div>
                </div>
            ) : (
                "loading..."
            )}
        </div>
    );
};

export default UserPage;
