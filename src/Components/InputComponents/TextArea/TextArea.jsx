import React, { useState, useEffect } from 'react';
import './TextArea.css'; // Import your new CSS file

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



// import React,{useState,useEffect} from 'react'


// function TextArea(props) {
//     const [value, setvalue] = useState(props.value)

//     useEffect(() => {
//        let timerOutId;
       
//        if(value !== props.value && props.onChange){
//             timerOutId = setTimeout(()=>{
//                     props.onChange(value, "")
                
//             },500)
//        }
//         return()=>{
//             clearTimeout(timerOutId)
//         }
//     }, [value])

//   return (
//     <div className='w-100 h-100 position-relative'>
//         <textarea
//             className={'input-style'} 
//             id={props.elementId}
//             rows={props.rows}
//             value={value}
           
//             onChange ={(e)=>{
//                 setvalue(e.target.value)
//             }}
            
//         ></textarea>
//     </div>
//   )
// }

// export default TextArea
