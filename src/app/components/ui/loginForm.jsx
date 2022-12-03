import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .email("Не электронная почта")
        .required("Электронная почта обязательное поле"),
    password: Yup.string()
        .required("Пароль обязательное поле")
        .min(8, "Пароль должен cостаять минимум из 8 символом")
        .matches(
            /[A-Z]+/,
            "Пароль должен содержать хотя бы одну заглавную букву"
        )
        .matches(/\d+/, "Пароль должен содержать хотя бы одно число")
});

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
                console.log("values", values);
                setTimeout(() => {
                    setSubmitting(false);
                }, 1000);
            }}
        >
            {({ isSubmitting, errors, values }) => {
                return (
                    <Form>
                        <div>
                            <div className="mb-4">
                                <label>Электронная почта</label>
                                <div className="input-group has-validation">
                                    <Field
                                        type="email"
                                        name="email"
                                        className={
                                            "form-control " +
                                            (errors.email ? "is-invalid" : "")
                                        }
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label>Пароль</label>
                                <div className="input-group has-validation">
                                    <Field
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        className={
                                            "form-control " +
                                            (errors.password
                                                ? "is-invalid"
                                                : "")
                                        }
                                        value={values.password}
                                    />
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        onClick={toggleShowPassword}
                                    >
                                        <i
                                            className={
                                                "bi bi-eye" +
                                                (showPassword ? "-slash" : "")
                                            }
                                        ></i>
                                    </button>
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="invalid-feedback"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Submit
                        </button>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default LoginForm;
