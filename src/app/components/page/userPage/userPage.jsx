import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import Qualities from "../../ui/qualities";
import API from "../../../API";
import CommentsList from "../../ui/comments/commentsList";

const UserPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState();
    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, [userId]);

    return (
        <div>
            {user && (
                // <div>
                //     <h1>{user.name}</h1>
                //     <h2>Профессия:{user.profession.name}</h2>
                //     <span>
                //         <Qualities qualities={user.qualities} />
                //     </span>
                //     <span>completedMeetings: {user.completedMeetings}</span>
                //     <h2>Rate: {user.rate}</h2>
                //     <button
                //         onClick={() => navigate(`/users/${userId}/edit`)}
                //         className="btn btn-primary"
                //     >
                //         Изменить
                //     </button>
                // </div>
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <button
                                        className="
                                        position-absolute
                                        top-0
                                        end-0
                                        btn btn-light btn-sm
                                    "
                                        onClick={() =>
                                            navigate(`/users/${userId}/edit`)
                                        }
                                    >
                                        <i className="bi bi-gear"></i>
                                    </button>
                                    <div
                                        className="
                                        d-flex
                                        flex-column
                                        align-items-center
                                        text-center
                                        position-relative
                                    "
                                    >
                                        <img
                                            src="https://avatars.dicebear.com/api/avataaars/qweqwdas.svg"
                                            className="rounded-circle"
                                            width="150"
                                        />
                                        <div className="mt-3">
                                            <h4>{user.name}</h4>
                                            <p className="text-secondary mb-1">
                                                {user.profession.name}
                                            </p>
                                            <div className="text-muted">
                                                <i
                                                    className="
                                                    bi bi-caret-down-fill
                                                    text-primary
                                                "
                                                    role="button"
                                                ></i>
                                                <i
                                                    className="
                                                    bi bi-caret-up
                                                    text-secondary
                                                "
                                                    role="button"
                                                ></i>
                                                <span className="ms-2">
                                                    {user.rate}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card mb-3">
                                <div
                                    className="
                                    card-body
                                    d-flex
                                    flex-column
                                    justify-content-center
                                    text-center
                                "
                                >
                                    <h5 className="card-title">
                                        <span>Qualities</span>
                                    </h5>
                                    <p className="card-text">
                                        <span className="badge bg-primary">
                                            Primary
                                        </span>
                                        <span className="badge bg-secondary">
                                            Secondary
                                        </span>
                                        <span className="badge bg-success">
                                            Success
                                        </span>
                                        <span className="badge bg-danger">
                                            Danger
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="card mb-3">
                                <div className="card mb-3">
                                    <div
                                        className="
                                        card-body
                                        d-flex
                                        flex-column
                                        justify-content-center
                                        text-center
                                    "
                                    >
                                        <h5 className="card-title">
                                            <span>Completed meetings</span>
                                        </h5>

                                        <h1 className="display-1">125</h1>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <CommentsList />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserPage;
