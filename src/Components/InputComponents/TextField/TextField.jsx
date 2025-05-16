import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './TextField.css';

function TextField(props) {
  const [value, setValue] = useState(props.value || '');
  const showErrorMessages = useSelector(state => state.dataStore.showErrorMessages);

  const checkValidation = (val) => {
    let errorMessage = "";
    if (props.validation?.required && val.trim() === "") {
      errorMessage = '*Required!';
    } else if (props.validation?.maxLengthRequired && val.length > props.validation.maxLengthRequired) {
      errorMessage = `Write up to ${props.validation.maxLengthRequired} characters`;
    } else if (props.validation?.checkType === 'email' && !/\S+@\S+\.\S+/.test(val)) {
      errorMessage = "Invalid Email address!";
    } else if (props.validation?.pattern && !props.validation.pattern.test(val)) {
      errorMessage = props.validation.message || "Invalid input format!";
    }
    return errorMessage;
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const errorMessage = checkValidation(value);
      if (props.onChange) {
        props.onChange(value, errorMessage);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [value]);

  const errorMessage = checkValidation(value);

  return (
    <>
      <div className={`textfield-wrapper ${props.size === 'small' ? 'textfield-wrapper-small' : ''}`}>
        <label htmlFor={props.elementId} className='textfield-label'>
          {props.label}
          {props.validation?.required && <span className="required-asterisk">&nbsp;*</span>}
        </label>
        <input
          id={props.elementId}
          className={`textfield-input 
            ${((value !== "" || showErrorMessages) && errorMessage !== "") ? 'input-error' : ''} 
            ${props.size === 'small' ? 'textfield-small' : ''}`}
          type={props.type || "text"}
          value={value}
          placeholder={props.placeholder}
          onChange={(e) => setValue(e.target.value)}
        />
        {((value !== "" || showErrorMessages) && errorMessage !== "") && (
          <div className='textfield-error'>
            {errorMessage}
          </div>
        )}
      </div>
    </>
  );
}

export default TextField;
