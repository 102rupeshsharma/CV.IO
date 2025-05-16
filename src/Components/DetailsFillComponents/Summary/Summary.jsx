import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSummary, updateErrorMessages } from '../../../ReduxManager/dataStoreSlice';
import { useNavigate } from 'react-router-dom';
import TextArea from '../../InputComponents/TextArea/TextArea';
import BottomNavigation from '../BottomNavigation/BottomNavigation';

import './Summary.css';

const Summary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const objective = useSelector(state => state.dataStore.summary.objective);
  const errorMessages = useSelector(state => state.dataStore.errorMessages);

  const handleChange = (value) => {
    dispatch(updateSummary({ key: 'objective', value }));
    if (!value.trim()) {
      dispatch(updateErrorMessages({ key: 'objective', value: 'This field is required' }));
    } else {
      dispatch(updateErrorMessages({ key: 'objective', value: '' }));
    }
  };

  const isFormValid = () => {
    return (objective || "").trim().length > 0 && !errorMessages?.objective;
  };

  const goBack = () => {
    navigate('/progress/personalInfo');
  };

  // ✅ Handle Next navigation manually
  const handleNext = () => {
    navigate('/progress/resume');
  };

  return (
    <div className="summary-container">
      <div className="summary-left">
        <button onClick={goBack} className="back">
          <span><i className="bi bi-arrow-left"></i></span> Go Back
        </button>

        <p className="h1">Tell us about yourself</p>
        <p className="h2">Write a short summary to describe who you are and what you're looking for.</p>

        <div className="summary-input-area">
          <label className="summary-label">ABOUT YOU </label>
          <TextArea
            elementId="objective"
            rows={6}
            value={objective}
            validation={{ required: true }}
            onChange={handleChange}
          />
        </div>

        <BottomNavigation
          isFormValid={isFormValid()}
          onNext={handleNext}
        />
      </div>
      {/* <div className="summary-right">
      </div> */}
    </div>
  );
};

export default Summary;
