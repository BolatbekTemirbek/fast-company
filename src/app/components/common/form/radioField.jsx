import React from "react";
import PropTypes from "prop-types";
const RadioField = ({ options, field, label }) => {
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <div>
                {options.map((option) => (
                    <div
                        key={option.name + "_" + option.value}
                        className="form-check form-check-inline"
                    >
                        <input
                            className="form-check-input"
                            type="radio"
                            name={field.name}
                            id={option.name + "_" + option.value}
                            value={option.value}
                            onChange={field.onChange}
                            checked={option.value === field.value}
                        />
                        <label
                            className="form-check-label"
                            htmlFor={option.name + "_" + option.value}
                        >
                            {option.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

RadioField.propTypes = {
    field: PropTypes.object,
    options: PropTypes.array,
    name: PropTypes.string,
    label: PropTypes.string
};
export default RadioField;
