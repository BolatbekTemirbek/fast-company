import React, { useEffect, useState } from "react";
import API from "../../../API";
import UserCard from "../../ui/userCard";
import { useParams } from "react-router-dom";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetngsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";

const UserPage = () => {
    const [user, setUser] = useState();
    const { userId } = useParams();

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
