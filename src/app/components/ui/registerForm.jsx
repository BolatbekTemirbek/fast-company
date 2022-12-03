import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import API from "../../API";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
const SignupSchema = yup.object().shape({
    email: yup
        .string()
        .email("Не электронная почта")
        .required("Электронная почта обязательное поле"),
    password: yup
        .string()
        .required("Пароль обязательное поле")

        .matches(
            /(?=.*[A-Z])/,
            "Пароль должен содержать хотя бы одну заглавную букву"
        )
        .matches(/(?=.*[0-9])/, "Пароль должен содержать хотя бы одно число")
        .matches(
            /(?=.*[!@#$%^&*])/,
            "Пароль должен содержать один из специальных символов !@#$%^&*"
        )
        .matches(/(?=.{8,})/, "Пароль должен cостаять минимум из 8 символом"),
    profession: yup.string().required("Обязательно выберите свою профессию"),
    licence: yup
        .boolean()
        .oneOf(
            [true],
            "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
        ),
    qualities: yup.array().min(1, "Обязательно выберите свои качества")
});

const RegisterForm = () => {
    const [qualities, setQualities] = useState({});
    const [professions, setProfessions] = useState();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfessions(data));
        API.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
                profession: "",
                sex: "male",
                qualities: [],
                licence: false
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { setSubmitting }) => {
                console.log("valuesSubmit", values);
                setTimeout(() => {
                    setSubmitting(false);
                }, 1000);
            }}
        >
            {({ isSubmitting, errors, values, touched }) => {
                return (
                    <Form>
                        <div className="mb-4">
                            <label>Электронная почта</label>
                            <div className="input-group has-validation">
                                <Field
                                    type="email"
                                    name="email"
                                    className={
                                        "form-control " +
                                        (errors.email && touched.email
                                            ? "is-invalid"
                                            : "")
                                    }
                                    value={values.email}
                                />
                                <ErrorMessage
                                    name="email"
                                    className="invalid-feedback"
                                    component="div"
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label>Пароль</label>
                            <div className="input-group has-validation">
                                <Field
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className={
                                        "form-control " +
                                        (errors.password && touched.password
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
                                    className="invalid-feedback"
                                    component="div"
                                />
                                {/* {errors.password && (
                                    <div className="invalid-feedback">
                                        {errors.password}
                                    </div>
                                )} */}
                            </div>
                        </div>

                        <Field
                            name="profession"
                            options={professions}
                            label="Выберите вашу профессию"
                            defaultValue="Choose..."
                            value={values.profession}
                            component={SelectField}
                        />
                        <Field
                            name="sex"
                            component={RadioField}
                            options={[
                                { name: "Male", value: "male" },
                                { name: "Female", value: "female" },
                                { name: "Other", value: "other" }
                            ]}
                            value={values.sex}
                            label="Выберите ваш пол"
                        />
                        <Field
                            name="qualities"
                            options={qualities}
                            label="Выберите ваши качества"
                            component={MultiSelectField}
                            value={values.qualities}
                        />
                        <Field
                            name="licence"
                            value={values.licence}
                            component={CheckBoxField}
                        >
                            Подтвердить <a>лицензионное соглашение</a>
                        </Field>

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

export default RegisterForm;
