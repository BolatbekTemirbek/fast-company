import React from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "formik";

const SelectField = ({
    field,
    options,
    label,
    defaultValue,
    form: { touched, errors, setFieldTouched }
}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((option) => ({
                  name: options[option].name,
                  _id: options[option]._id
              }))
            : options;
    return (
        <div className="mb-4">
            <label htmlFor={field.name} className="form-label">
                {label}
            </label>
            <select
                className={
                    "form-select " +
                    (touched[field.name] && errors[field.name]
                        ? "is-invalid"
                        : "")
                }
                id={field.name}
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                onBlur={() => setFieldTouched(field.name, true)}
            >
                <option key={field.name} disabled value="">
                    {defaultValue}
                </option>

                {optionsArray &&
                    optionsArray.map((option) => (
                        <option key={option._id} value={option._id}>
                            {option.name}
                        </option>
                    ))}
            </select>
            <ErrorMessage
                name={field.name}
                className="invalid-feedback"
                component="div"
            />
        </div>
    );
};
SelectField.propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    error: PropTypes.string,
    label: PropTypes.string,
    defaultValue: PropTypes.string
};
export default SelectField;
