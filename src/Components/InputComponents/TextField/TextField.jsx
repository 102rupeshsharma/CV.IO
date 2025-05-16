import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './TextField.css'; // Keep using your CSS

function TextField(props) {
  const [value, setValue] = useState(props.value || '');
  const showErrorMessages = useSelector(state => state.dataStore.showErrorMessages);

  const checkValidation = () => {
    let errorMessage = "";
    if (props.validation?.required && value.trim() === "") {
      errorMessage = '*Required!';
    } else if (props.validation?.maxLengthRequired && value.length > props.validation.maxLengthRequired) {
      errorMessage = `Write up to ${props.validation.maxLengthRequired} characters`;
    } else if (props.validation?.checkType === 'email' && !/\S+@\S+\.\S+/.test(value)) {
      errorMessage = "Invalid Email address!";
    } else if (props.validation?.pattern && !props.validation.pattern.test(value)) {
      errorMessage = props.validation.message || "Invalid input format!";
    }
    return errorMessage;
  };

  let errorMessage = checkValidation();

  useEffect(() => {
    if (props.validation?.required && value.trim() === "") {
      props.onChange(value, '*Required!');
    }
  }, []);

  useEffect(() => {
    let timeoutId;
    if (value !== props.value && props.onChange) {
      timeoutId = setTimeout(() => {
        if (props.validation) {
          props.onChange(value, errorMessage);
        } else {
          props.onChange(value, "");
        }
      }, 500);
    }
    return () => clearTimeout(timeoutId);
  }, [value]);

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



// import React,{useState,useEffect} from 'react'
// import { useSelector } from 'react-redux'


// function TextField(props) {
//     const [value, setvalue] = useState(props.value)
//     const showErrorMessages = useSelector(state=> state.dataStore.showErrorMessages)
    

//     const checkValidation =()=>{
//         let errorMessage = "";
//         if(props.validation && props.validation.required &&  value===""){
//                 errorMessage='*required!'
//         }
        
//         else if(props.validation && props.validation.maxLengthRequired && value.length>props.validation.maxLengthRequired){
//                 errorMessage='write upto '+props.validation.maxLengthRequired+' characters'
//         }

//         else if(props.validation &&  props.validation.checkType && props.validation.checkType==='email'){
//             if(!(/\S+@\S+\.\S+/.test(value))){
//                 errorMessage="Invalid Email address!"
//             }
//         }

//         return errorMessage
//     }

//     let errorMessage = checkValidation() 
//     useEffect(() => {
//         if(props.validation && props.validation.required){
//             if(value===""){
//                 props.onChange(value,'*required!')
//             }
//         }
//     }, [])

//     useEffect(() => {

//        let timerOutId;
       
//        if(value !== props.value && props.onChange){
//             timerOutId = setTimeout(()=>{
//                 if(props.validation){
//                     props.onChange(value, errorMessage)
//                 }
//                 else{
//                     props.onChange(value, "")
//                 }
//             },500)
//        }
//         return()=>{
//             clearTimeout(timerOutId)
//         }
//     }, [value])

//   return (
//     <div className='w-100 h-100 position-relative'>
//         <div  style={((value!=="" || showErrorMessages === true)  && errorMessage!=="")?{display:'block',position:'absolute', bottom:-20,color:"rgb(247, 89, 89)",}:{display:'none'}}>{errorMessage}</div>
//         <input
//             className='input-style'
//             id={props.elementId}
//             type={props.type}
//             value={value}
//             placeholder={props.placeholder}
//             onChange ={(e)=>{
//                 setvalue(e.target.value)
//             }}
//         />
//     </div>
//   )
// }

// export default TextField
