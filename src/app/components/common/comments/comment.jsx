import React, { useEffect, useState } from "react";
import API from "../../../API";
import PropTypes from "prop-types";
import { displayDate } from "../../../utils/displayDate";

const Comment = ({
    content,
    _id: id,
    userId,
    created_at: createdAt,
    onRemoveComment
}) => {
    const [user, setUser] = useState();
    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);

    return (
        <div className="bg-light card-body  mb-3">
            <div className="row">
                {!user ? (
                    "loading..."
                ) : (
                    <div className="col">
                        <div className="d-flex flex-start ">
                            <img
                                src={`https://avatars.dicebear.com/api/avataaars/${(
                                    Math.random() + 1
                                )
                                    .toString(36)
                                    .substring(7)}.svg`}
                                className="rounded-circle shadow-1-strong me-3"
                                alt="avatar"
                                width="65"
                                height="65"
                            />
                            <div className="flex-grow-1 flex-shrink-1">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <p className="mb-1 ">
                                            {user.name}
                                            <span className="small">
                                                - {displayDate(createdAt)}
                                            </span>
                                        </p>
                                        <button
                                            className="btn btn-sm text-primary d-flex align-items-center"
                                            onClick={() => onRemoveComment(id)}
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                    <p className="small mb-0">{content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
Comment.propTypes = {
    content: PropTypes.string,
    _id: PropTypes.string,
    userId: PropTypes.string,
    onRemoveComment: PropTypes.func,
    created_at: PropTypes.string
};
export default Comment;
