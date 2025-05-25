import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileUpload from '../ProfileUpload/ProfileUpload';
import { useNavigate } from 'react-router';
import TextField from '../../InputComponents/TextField/TextField';
import BottomNavigation from '../BottomNavigation/BottomNavigation';
import { updatePersonalInfo, updateErrorMessages } from '../../../ReduxManager/dataStoreSlice';
import './PersonalInfo.css';

const PersonalInfo = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const personalHeads = useSelector((state) => state.dataStore.personalInfo);
  const errorMessages = useSelector((state) => state.dataStore.errorMessages);
  const dispatch = useDispatch();

  const onChangeHandler = (key, value, errorMessage = undefined) => {
    dispatch(updatePersonalInfo({ key, value }));
    if (submitted && errorMessage !== undefined) {
      dispatch(updateErrorMessages({ key, value: errorMessage }));
    }
  };

  const goBack = () => {
    navigate('/templates');
  };

  const isFormValid = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'country', 'pinCode', 'phone'];
    const isEmpty = requiredFields.some((key) => !personalHeads[key]?.trim());
    const hasErrors = Object.values(errorMessages).some((msg) => msg && msg.length > 0);
    return !isEmpty && !hasErrors;
  };

  const handleNext = () => {
    setSubmitted(true);
    if (isFormValid()) {
      navigate('/progress/education');
    }
  };

  return (
    <div className="personalinfo-container">
      <div className="personalinfo-left">
        <button onClick={goBack} className="back">
          <span><i className="bi bi-arrow-left"></i></span> Go Back
        </button>

        <p className="h1">What’s the best way for employers to contact you?</p>
        <p className="h2">We suggest including an email and phone number.</p>
        <p style={{marginBottom:'15px'}}><span style={{color:'red', margin:'0px 5px'}}>*</span>indicates a required field</p>

        <div className="upload-image-block">
          <ProfileUpload />
        </div>

        <div className="personalinfo-input-container">
          {/* Input fields */}
          <div className="personalInfo-inputs">
            <TextField
              label="FIRST NAME"
              elementId="firstName"
              placeholder="e.g. John"
              type="text"
              value={personalHeads.firstName || ""}
              validation={{ required: true }}
              onChange={(val, error) => onChangeHandler('firstName', val, error)}
            />
          </div>

          <div className="personalInfo-inputs">
            <TextField
              label="SURNAME"
              elementId="lastName"
              placeholder="e.g. Doe"
              type="text"
              value={personalHeads.lastName || ""}
              validation={{ required: true }}
              onChange={(val, error) => onChangeHandler('lastName', val, error)}
            />
          </div>

          <div className="personalInfo-inputs">
            <TextField
              label="STATE"
              elementId="state"
              placeholder="e.g. New Delhi"
              type="text"
              value={personalHeads.state || ""}
              onChange={(val, error) => onChangeHandler('state', val, error)}
            />
          </div>

          <div className="personalinfo-shortInput-container">
            <div className="personalInfo-short-inputs">
              <TextField
                size="small"
                label="COUNTRY"
                elementId="country"
                placeholder="e.g. India"
                type="text"
                value={personalHeads.country || ""}
                validation={{ required: true, message: "Country is required" }}
                onChange={(val, error) => onChangeHandler('country', val, error)}
              />
            </div>
            <div className="personalInfo-short-inputs">
              <TextField
                size="small"
                label="PIN CODE"
                elementId="pinCode"
                placeholder="e.g. 110034"
                type="text"
                value={personalHeads.pinCode || ""}
                validation={{
                  required: true,
                  pattern: /^[1-9][0-9]{5}$/,
                  message: "PIN must be exactly 6 digits"
                }}
                onChange={(val, error) => onChangeHandler('pinCode', val, error)}
              />
            </div>
          </div>

          <div className="personalInfo-inputs">
            <TextField
              label="EMAIL"
              elementId="email"
              placeholder="e.g. spatel@sample.in"
              type="email"
              value={personalHeads.email || ""}
              validation={{ required: true, checkType: "email" }}
              onChange={(val, error) => onChangeHandler('email', val, error)}
            />
          </div>

          <div className="personalInfo-inputs">
            <TextField
              label="PHONE"
              elementId="phone"
              placeholder="e.g. +91 74 1234 5677"
              type="text"
              value={personalHeads.phone || ""}
              validation={{
                required: true,
                pattern: /^[0-9]{10,15}$/,
                message: "Phone must be at least 10 digits"
              }}
              onChange={(val, error) => onChangeHandler('phone', val, error)}
            />
          </div>
        </div>

        <BottomNavigation
          prevPagePath="/"
          nextPagePath="/ProgressStatus/education"
          isFormValid={isFormValid()}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default PersonalInfo;
