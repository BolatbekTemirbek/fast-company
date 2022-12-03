import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { ErrorMessage } from "formik";

const MultiSelectField = ({
    field,
    options,
    label,
    form: { setFieldValue, setFieldTouched, touched, errors }
}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((option) => ({
                  label: options[option].name,
                  value: options[option]._id
              }))
            : options;

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                styles={{
                    control: (baseStyles) => ({
                        ...baseStyles,
                        borderColor:
                            errors.qualities && touched.qualities
                                ? "red"
                                : "hsl(0, 0%, 80%)"
                    })
                }}
                isMulti
                name={field.name}
                options={optionsArray}
                className={
                    "basic-multi-select " +
                    (errors.qualities && touched.qualities ? "is-invalid" : "")
                }
                classNamePrefix="select"
                closeMenuOnSelect={false}
                onChange={(option) => {
                    setFieldValue(field.name, option);
                }}
                defaultValue={field.value}
                onBlur={() => setFieldTouched("qualities", true)}
            />
            <ErrorMessage
                name={field.name}
                className="invalid-feedback"
                component="div"
            />
        </div>
    );
};
MultiSelectField.propTypes = {
    field: PropTypes.object,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    label: PropTypes.string,
    form: PropTypes.object
};
export default MultiSelectField;
