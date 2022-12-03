import React from "react";
import PropTypes from "prop-types";

const Comments = ({ comment, users }) => {
    console.log("users", users);
    const { userId, created_at: createAt } = comment;

    const getUserNameById = () => {
        const user = users && users.filter((user) => user._id === userId);
        console.log("user", user);
        return user[0].name;
    };
    const getCreatedDate = () => {
        const date = new Date();
        const createdDate = new Date();
        const diffDate = date - Number(createAt);
        const minut = diffDate / 1000 / 60;
        createdDate.setTime(1633573058520);
        console.log(createdDate);
        console.log(createdDate.getDate());

        if (minut < 5) {
            return "1 минуту назад";
        }
        if (minut < 10 && minut > 5) {
            return "5 минуту назад";
        }
        if (minut > 10 && minut < 30) {
            return "10 минуту назад";
        }
        if (minut > 30 && minut < 60) {
            return "30 минут назад";
        }
        if (createdDate.getHours() && !createdDate.getDay()) {
            return `${createdDate.getHours()}.${createdDate.getMinutes()}`;
        }
        if (createdDate.getDay() && !createdDate.getFullYear()) {
            return `${createdDate.getDay()}.${createdDate.getMonth()}`;
        }
        if (createdDate.getFullYear()) {
            return `${createdDate.getDay()}.${createdDate.getMonth()}.${createdDate.getFullYear()}`;
        }
    };
    return (
        <div className="bg-light card-body  mb-3">
            {users && (
                <div className="row">
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
                                            {getUserNameById()}
                                            <span className="small">
                                                {" "}
                                                {getCreatedDate()}
                                            </span>
                                        </p>
                                        <button className="btn btn-sm text-primary d-flex align-items-center">
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                    <p className="small mb-0">
                                        {comment.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
Comments.propTypes = {
    comment: PropTypes.array,
    users: PropTypes.array
};
export default Comments;
