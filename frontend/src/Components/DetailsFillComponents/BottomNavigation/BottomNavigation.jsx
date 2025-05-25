import React, { useState } from 'react';
import './BottomNavigation.css';
import MyResume from '../../ResumeDisplay/MyResume/MyResume';
import { updateState } from '../../../ReduxManager/dataStoreSlice';
import { useDispatch } from 'react-redux';

function BottomNavigation({ prevPagePath, nextPagePath, isFormValid, onNext }) {
  const dispatch = useDispatch();
  const [showPreview, setShowPreview] = useState(false);

  const handlePreviewClick = () => {
    setShowPreview(true);
  };

  const handleNextClick = () => {
    if (!isFormValid) {
      alert('Please fill all the necessary details correctly!');
      dispatch(updateState({
        key: 'showErrorMessages',
        value: true
      }));
    } else {
      dispatch(updateState({
        key: 'showErrorMessages',
        value: false
      }));
      if (onNext) onNext();
    }
  };

  return (
    <div className="bottom-nav-container">
      <div className="bottom-nav-right">
        <button className="btn btn-preview" onClick={handlePreviewClick}>Preview</button>
        <button className="btn next-btn" onClick={handleNextClick}>Next</button>
      </div>
      <MyResume 
        showModal={showPreview} 
        onClose={() => setShowPreview(false)} 
      />
    </div>
  );
}

export default BottomNavigation;
