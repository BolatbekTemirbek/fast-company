import React, { useEffect, useState } from "react";
import API from "../../../API";
import Comments from "./comments";

const CommentsList = () => {
    const [comments, setComments] = useState();
    const [users, setUsers] = useState();
    useEffect(() => {
        API.comments.fetchAll().then((data) => setComments(data));
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);
    console.log(comments);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <div>
                        <h2>New comment</h2>
                        <div className="mb-4">
                            <select
                                className="form-select"
                                name="userId"
                                value=""
                            >
                                <option disabled value="" selected>
                                    Выберите пользователя
                                </option>

                                <option>Доктор</option>
                                <option>Тусер</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="exampleFormControlTextarea1"
                                className="form-label"
                            >
                                Сообщение
                            </label>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="3"
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {comments &&
                        comments.map((comment) => (
                            <Comments
                                comment={comment}
                                key={comment._id}
                                users={users}
                            />
                        ))}
                </div>
            </div>
        </>
    );
};

export default CommentsList;
