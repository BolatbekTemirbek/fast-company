import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import * as yup from "yup";
import API from "../../../API";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";

const validation = yup.object().shape({
    userId: yup.string().required("Выберите пользователя"),
    content: yup.string().required("Коментарии обязательно")
});
const AddCommentForm = ({ onSubmit }) => {
    const [users, setUsers] = useState();
    useEffect(() => {
        API.users.fetchAll().then(setUsers);
    }, []);

    return (
        <div>
            <h2>New comment</h2>

            <Formik
                initialValues={{ userId: "", content: "" }}
                validationSchema={validation}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    console.log("values", values);
                    // const newComment = {
                    //     userId: values.userId,
                    //     content: values.comment
                    // };

                    onSubmit(values);

                    setTimeout(() => {
                        setSubmitting(false);
                        resetForm();
                    }, 1000);
                }}
            >
                {({
                    isSubmitting,
                    values,
                    errors,
                    touched,
                    isValid,
                    dirty
                }) => {
                    return (
                        <Form>
                            <Field
                                name="userId"
                                options={users}
                                label="Выберите пользователя"
                                defaultValue="Choose..."
                                value={values.userId}
                                component={SelectField}
                            />
                            <Field
                                name="content"
                                label="Сообщение"
                                component={TextAreaField}
                            />
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button
                                    type="submit"
                                    disabled={
                                        !isValid || !dirty || isSubmitting
                                    }
                                    className="btn btn-primary"
                                >
                                    Опубликовать
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
};

export default AddCommentForm;
