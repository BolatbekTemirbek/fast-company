import React, { useEffect, useState } from "react";
import API from "../../API";
import { useParams } from "react-router-dom";
import { orderBy } from "lodash";
import CommentsList, { AddCommentForm } from "../common/comments";

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState();
    useEffect(() => {
        API.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);
    const handleRemoveComment = (commentId) => {
        API.comments.remove(commentId).then((id) => {
            setComments(comments.filter((item) => item._id !== id));
        });
    };
    const handleSubmit = (values) => {
        console.log(values);
        API.comments
            .add({ ...values, pageid: userId })
            .then((data) => setComments([...comments, data]));
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments && sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h2>Comments</h2>
                        <hr />
                        <CommentsList
                            comments={sortedComments}
                            onRemoveComment={handleRemoveComment}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
