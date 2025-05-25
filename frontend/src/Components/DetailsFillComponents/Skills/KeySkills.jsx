import React, { useState, useEffect } from 'react';
import './KeySkills.css';
import { useSelector, useDispatch } from 'react-redux';
import { addArrayElement, removeArrayElement } from '../../../ReduxManager/dataStoreSlice';
import BottomNavigation from '../BottomNavigation/BottomNavigation';
import { useNavigate } from 'react-router-dom';

function KeySkills() {
  const skills = useSelector(state => state.dataStore.skills);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputSkill, setInputSkill] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitted, setSubmitted] = useState(false); // <-- Added

  const goBack = () => {
    navigate('/progress/education');
  };

  const handleAddSkill = () => {
    const trimmedSkill = inputSkill.trim();
    if (
      trimmedSkill !== '' &&
      !skills.some(s => s.skillName.toLowerCase() === trimmedSkill.toLowerCase())
    ) {
      dispatch(
        addArrayElement({
          key: 'skills',
          element: { skillName: trimmedSkill },
        })
      );
      setInputSkill('');
    }
  };

  const handleRemoveSkill = (index) => {
    dispatch(removeArrayElement({ key: 'skills', index }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  useEffect(() => {
    setIsFormValid(skills.length > 0);
  }, [skills]);

  const handleNext = () => {
    setSubmitted(true);
    if (skills.length > 0) {
      navigate('/progress/workex');
    }
  };

  return (
    <div className="keyskills-container">
      <div className="keyskills-header">
        <button onClick={goBack} className="back">
          <span><i className="bi bi-arrow-left"></i></span> Go Back
        </button>
        <h1 className="keyskills-heading">What skills would you like to highlight?</h1>
        <p className="keyskills-subheading">
          Choose from our pre-written examples below or write your own.
        </p>
      </div>

      <div className="keyskills-input-group">
        <input
          type="text"
          placeholder="e.g., React, Python, Communication..."
          className="keyskills-input"
          value={inputSkill}
          validation={{ required: true}}
          onChange={(e) => setInputSkill(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className="keyskills-add-btn" onClick={handleAddSkill}>Add</button>
      </div>

      <div className="keyskills-skill-box">
        {skills.length > 0 ? skills.map((item, index) => (
          <div key={index} className="keyskills-skill-tag">
            {item.skillName}
            <button className="keyskills-skill-delete" onClick={() => handleRemoveSkill(index)}>×</button>
          </div>
        )) : (
          <p className="no-skills">No skills added yet.</p>
        )}
      </div>

      {submitted && skills.length === 0 && (
        <p className="validation-error">Please add at least one skill to continue.</p>
      )}
  <div className='nav-btn'>
      <BottomNavigation
        // prevPagePath="/"
        // nextPagePath="/progress/workex"
        isFormValid={isFormValid}
        onNext={handleNext} 
      />
      </div>
    </div>
  );
}

export default KeySkills;
