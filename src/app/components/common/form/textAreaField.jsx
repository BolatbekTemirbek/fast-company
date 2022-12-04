import React from "react";
import { ErrorMessage } from "formik";
import PropTypes from "prop-types";

const TextAreaField = ({
    field,
    label,
    form: { touched, errors, setFieldTouched }
}) => {
    return (
        <div className="mb-4">
            <label htmlFor={field.name} className="form-label">
                {label}
            </label>
            <div className="input-group has-validation">
                <div className="form-floating">
                    <textarea
                        className={
                            "form-control" +
                            (errors[field.name] && touched[field.name]
                                ? " is-invalid"
                                : "")
                        }
                        id={field.name}
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={() => setFieldTouched(field.name, true)}
                        rows="3"
                    />
                    <ErrorMessage
                        name={field.name}
                        className="invalid-feedback"
                        component="div"
                    />
                </div>
            </div>
        </div>
    );
};
TextAreaField.propTypes = {
    field: PropTypes.object,
    label: PropTypes.string,
    form: PropTypes.object
};
export default TextAreaField;
