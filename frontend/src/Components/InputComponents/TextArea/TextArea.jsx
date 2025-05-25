import React, { useState, useEffect } from 'react';
import './TextArea.css';

function TextArea(props) {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    let timerOutId;

    if (value !== props.value && props.onChange) {
      timerOutId = setTimeout(() => {
        props.onChange(value, "");
      }, 500);
    }
    return () => {
      clearTimeout(timerOutId);
    };
  }, [value]);

  return (
    <div className='textarea-container'>
      <textarea
        className='custom-textarea'
        id={props.elementId}
        rows={props.rows}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default TextArea;