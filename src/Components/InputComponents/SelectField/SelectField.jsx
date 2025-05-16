import React from 'react';
import './SelectField.css';

const SelectField = (props) => {
  const {
    label,
    elementId,
    options,
    value,
    onChange,
    placeholder,
    errorMessage,
    showErrorMessages,
    required,
    size
  } = props;

  return (
    <div className={`selectField-wrapper ${size === 'small' ? 'selectField-wrapper-small' : ''}`}>
      <label htmlFor={elementId} className='selectField-label'>
        {label}
        {required && <span className="required-asterisk">&nbsp;*</span>}
      </label>

      <select
        id={elementId}
        className={`selectField-input ${((value !== "" || showErrorMessages) && errorMessage) ? 'input-error' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>

      {((value !== "" || showErrorMessages) && errorMessage) && (
        <div className='selectField-error'>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default SelectField;
