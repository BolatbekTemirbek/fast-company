import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "formik";

const CheckBoxField = ({ field, children }) => {
    return (
        <div className="form-check mb-4">
            <input
                className={
                    "form-check-input " + (!field.value ? "is-invalid" : "")
                }
                type="checkbox"
                value=""
                id={field.name}
                onChange={field.onChange}
                checked={field.value}
            />
            <label className="form-check-label" htmlFor={field.name}>
                {children}
            </label>

            <ErrorMessage
                name={field.name}
                className="invalid-feedback"
                component="div"
            />
        </div>
    );
};
CheckBoxField.propTypes = {
    field: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    form: PropTypes.object
};
export default CheckBoxField;
