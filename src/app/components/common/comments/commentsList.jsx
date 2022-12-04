import React from "react";
import PropTypes from "prop-types";
import Comment from "./comment";

const CommentsList = ({ comments, onRemoveComment }) => {
    console.log(comments);
    return (
        comments &&
        comments.map((comment) => (
            <Comment
                key={comment._id}
                {...comment}
                onRemoveComment={onRemoveComment}
            />
        ))
    );
};
CommentsList.propTypes = {
    comments: PropTypes.array,
    onRemoveComment: PropTypes.func
};
export default CommentsList;
