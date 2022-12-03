import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import API from "../../../API";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useParams, useNavigate } from "react-router-dom";
const SignupSchema = yup.object().shape({
    email: yup
        .string()
        .email("Не электронная почта")
        .required("Электронная почта обязательное поле"),
    name: yup.string().required("Имя обязательное поле"),
    profession: yup.string().required("Обязательно выберите свою профессию"),
    licence: yup
        .boolean()
        .oneOf(
            [true],
            "Вы не можете использовать наш сервис без подтверждения лицензионного соглашения"
        ),
    qualities: yup.array().min(1, "Обязательно выберите свои качества")
});

const EditUserPage = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [user, setUser] = useState();
    const [qualities, setQualities] = useState({});
    const [professions, setProfessions] = useState();

    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
        API.professions.fetchAll().then((data) => setProfessions(data));
        API.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    const getProfessionById = (professionId) => {
        const newProfessionName = Object.keys(professions).find(
            (professionName) => professions[professionName]._id === professionId
        );
        return professions[newProfessionName];
    };
    const getQualities = (qualitiesArray) => {
        const newArrayQualities = qualitiesArray.map((quality) => {
            for (const qual in qualities) {
                if (qualities[qual]._id === quality.value) {
                    return qualities[qual];
                }
            }
            return null;
        });
        return newArrayQualities;
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!user && !professions ? (
                        <h1>Loading...</h1>
                    ) : (
                        <Formik
                            initialValues={{
                                name: user.name,
                                email: user.email,
                                profession: user.profession._id,
                                sex: user.sex,
                                qualities: user.qualities
                                    ? user.qualities.map((option) => ({
                                          label: option.name,
                                          value: option._id
                                      }))
                                    : ""
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={(
                                values,
                                { setSubmitting, resetForm }
                            ) => {
                                console.log("values", values);
                                const { profession, qualities } = values;
                                const newValues = {
                                    ...user,
                                    ...values,
                                    profession: getProfessionById(profession),
                                    qualities: getQualities(qualities)
                                };
                                console.log("newValues", newValues);
                                API.users
                                    .update(userId, newValues)
                                    .then((data) =>
                                        navigate(`/users/${data._id}`)
                                    );
                                setTimeout(() => {
                                    setSubmitting(false);
                                }, 1000);
                            }}
                        >
                            {({ isSubmitting, errors, values, touched }) => {
                                return (
                                    <Form>
                                        <div className="mb-4">
                                            <label>Имя</label>
                                            <div className="input-group has-validation">
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    className={
                                                        "form-control " +
                                                        (errors.name &&
                                                        touched.name
                                                            ? "is-invalid"
                                                            : "")
                                                    }
                                                    value={values.name}
                                                />
                                                <ErrorMessage
                                                    name="name"
                                                    className="invalid-feedback"
                                                    component="div"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label>Электронная почта</label>
                                            <div className="input-group has-validation">
                                                <Field
                                                    type="email"
                                                    name="email"
                                                    className={
                                                        "form-control " +
                                                        (errors.email &&
                                                        touched.email
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
                                                {
                                                    name: "Female",
                                                    value: "female"
                                                },
                                                {
                                                    name: "Other",
                                                    value: "other"
                                                }
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
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
